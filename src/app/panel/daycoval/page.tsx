import { Suspense } from "react";
import View from "./view";

export default function Page() {
  return (
    <Suspense fallback={<Fallback />}>
      <View />
    </Suspense>
  );
}

function Fallback() {
  return (
    <div className="h-dvh flex items-center justify-center text-gray-900">
      <h1 className="text-blue-800 text-center">carregando</h1>
    </div>
  );
}
