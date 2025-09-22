import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-dvh">
      <div className="min-w-lg">
        <div className="center bg-indigo-600 hover:bg-indigo-700 pointer flex flex-col p-6 rounded-lg gap-4">
          <Link target="_blank" href="/consorcio" className="text-white">
            Guia consórcio
          </Link>
        </div>
      </div>
    </div>
  );
}
