function getHeartCoords(
  steps: number,
  centerX: number,
  centerY: number,
  size: number
) {
  // Fórmula paramétrica corazón
  return Array(steps)
    .fill(0)
    .map((_, i) => {
      const t = Math.PI * 2 * (i / steps);
      const x = centerX + (size * 16 * Math.pow(Math.sin(t), 3)) / 24;
      const y =
        centerY -
        (size *
          (13 * Math.cos(t) -
            5 * Math.cos(2 * t) -
            2 * Math.cos(3 * t) -
            Math.cos(4 * t))) /
          24;
      return { x, y };
    });
}

export function BunnyHeart({
  dateInit,
  phrase,
}: {
  dateInit: Date;
  phrase: string;
}) {
  // Use SVG viewBox 0 0 700 700 — coordinates are relative to that box
  const centerX = 350;
  const centerY = 350;

  const points = getHeartCoords(15, centerX, centerY, 300); // coordinates inside viewBox
  const now = new Date();
  const diff = now.getTime() - dateInit.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return (
    <div className="relative mx-auto w-full max-w-xl md:max-w-3xl">
      <div className="w-full aspect-square">
        <svg viewBox="0 0 700 700" className="w-full h-full absolute left-0 top-0">
          {points.map((pt, idx) => (
            <image
              key={idx}
              href="/images/bunny.png"
              x={pt.x - 28}
              y={pt.y - 28}
              width={56}
              height={56}
              style={{ opacity: idx % 2 ? 0.97 : 0.81 }}
            />
          ))}
        </svg>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 md:w-[360px] text-center text-gray-700 font-serif">
          <h2 className="m-0 font-light text-2xl">{phrase}</h2>
          <div className="mt-3 text-lg italic text-purple-600">Tiempo juntos desde:</div>
          <div className="mt-3 text-base">
            {days} días {hours} horas {minutes} minutos {seconds} segundos
          </div>
        </div>
      </div>
    </div>
  );
}
