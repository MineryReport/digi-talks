import Link from "next/link";
import { type ReactNode } from "react";
import "~/styles/globals.css"
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
	<html>
	<head></head>
    <body className="min-h-screen bg-gradient-to-b">
      <header className="py-5 shadow-md bg-slate-400 ">
        <ul className="flex gap-5 text-white pl-10">
          <li><Link href={"/basics"}>Basics</Link></li>
          <li><Link href={"/react"}>React</Link></li>
        </ul>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-center ">
        {children}
      </main>
    </body>
	</html>
  );
}
