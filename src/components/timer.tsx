import React, { useEffect, useState } from "react";

const TYPES: Array<"year" | "month" | "hour" | "second"> = [
  "year",
  "month",
  "hour",
  "second",
];

type Props = {
  dateInit: Date;
};

export function GetDateFromActually({ dateInit }: Props) {
  const [now, setNow] = useState(new Date());
  const [typeIndex, setTypeIndex] = useState(0);

  // Actualiza el tiempo cada segundo
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Cambia el tipo cada 10 segundos
  useEffect(() => {
    const rotate = setInterval(() => {
      setTypeIndex((prev) => (prev + 1) % TYPES.length);
    }, 10000);
    return () => clearInterval(rotate);
  }, []);

  const type = TYPES[typeIndex];

  const diff = now.getTime() - dateInit.getTime();
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const seconds = Math.floor(diff / 1000);

  return (
    <>
      <p>Tiempo aproximadamente conociendonos:ㅤ</p>
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
      {type === "second" && (
        <p>
          {seconds} {seconds === 1 ? "segundo" : "segundos"}
        </p>
      )}
    </>
  );
}
