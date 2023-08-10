"use client";

export default function Loading({ word }: { word: string }) {
  return (
    <div>
      {Array.from(word).map((chr, index) => (
        <span
          key={index}
          className="animate-ping text-white font-bold text-3xl my-2"
          style={{
            animationDelay: `${index / word.length - 1}s`,
            animationDuration: "1s",
          }}
        >
          {chr}
        </span>
      ))}
    </div>
  );
}
