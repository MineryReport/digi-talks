import Link from "next/link";

export default function Page() {
  const examples = ["basics"];
  return (
    <ul className="text-white">
      {examples.map((url) => (
        <li key={url}>
          <Link href={url}>{url}</Link>
        </li>
      ))}
    </ul>
  );
}
