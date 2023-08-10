import { ComponentPropsWithoutRef } from "react";

export default function Placeholder({
  className,
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={`animate-pulse bg-gray-400 w-full h-full ${className}`}
    ></div>
  );
}
