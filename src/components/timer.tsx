import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

type Props = {
  dateInit: Date;
};

const TYPES: Array<"year" | "month" | "hour" | "minute" | "second"> = [
  "year",
  "month",
  "hour",
  "minute",
  "second",
];

export function GetDateFromActually({ dateInit }: Props) {
  const [now, setNow] = useState(new Date());
  const [typeIndex, setTypeIndex] = useState(0);
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const rotate = setInterval(
      () => setTypeIndex((prev) => (prev + 1) % TYPES.length),
      10000
    );
    return () => clearInterval(rotate);
  }, []);

  useEffect(() => {
    if (blockRef.current) {
      gsap.fromTo(
        blockRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 2, ease: "power1.out" }
      );
    }
  }, [typeIndex]);

  const type = TYPES[typeIndex];
  const diff = now.getTime() - dateInit.getTime();
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor(diff / 1000);

  return (
    <div ref={blockRef} className="flex flex-row">
      <p>Tiempo aproximadamente conociéndonos:</p>
      <div>
        {type === "year" && (
          <p>
            {years} {years === 1 ? "año" : "años"}
          </p>
        )}
        {type === "month" && (
          <p>
            {months} {months === 1 ? "mes" : "meses"}
          </p>
        )}
        {type === "hour" && (
          <p>
            {hours} {hours === 1 ? "hora" : "horas"}
          </p>
        )}
        {type === "minute" && (
          <p>
            {minutes} {minutes === 1 ? "minuto" : "minutos"}
          </p>
        )}
        {type === "second" && (
          <p>
            {seconds} {seconds === 1 ? "segundo" : "segundos"}
          </p>
        )}
      </div>
    </div>
  );
}
