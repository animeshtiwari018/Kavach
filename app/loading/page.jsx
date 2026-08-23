"use client";

import Preloader from "@/componants/preloader";

export default function LoadingPage() {
  return (
    <div className="flex-1 w-full bg-black min-h-screen">
      <Preloader />
    </div>
  );
}
