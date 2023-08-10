import LoadingAnimation from "@/components/loading";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <LoadingAnimation word="Loading" />
    </div>
  );
}
