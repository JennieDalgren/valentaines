import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full mt-0  pt-7 pb-7 sm:px-4 px-2 bg-red-100 ">
      <Link href="/" className="flex space-x-3">
        <h1 className="sm:text-4xl text-2xl font-bold ml-2 tracking-tight">
          <span>❤️ </span>
          Valent<span style={{ color: "red" }}>AI</span>nes.day
        </h1>
      </Link>
      <h1 className="sm:text-4xl text-2xl font-bold ml-2 tracking-tight">
        <span>❤️ </span>
      </h1>
    </header>
  );
}
