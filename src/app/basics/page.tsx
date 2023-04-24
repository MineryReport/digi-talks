'use client'
import Button from "~/components/Button";
import applicative from "./applicative";
import composition from "./composition";
import operators from "./operadores";
import structures from "./structures";



interface SectionItem {
  onClick: () => void,
  title: string
}
const SectionItem = ({title, onClick}:SectionItem) => {
  return <div className="flex flex-col gap-2">
  <h3 className="text-lg text-center">{title}</h3>
  <Button onClick={() => onClick()} label={"launch"}/>
</div>
}

interface Section {
  title: string,
  items: {act: () => void, title: string}[]
}
const Section = ({title, items}: Section) => {
  return <section className="bg-slate-300 p-5 py-10 rounded">
  <h2 className="text-xl mb-5 text-center w-full">{title}</h2>
  <div className="flex gap-5 justify-center">
    {items.map(({act, title: sectionTitle}) => {
      return <SectionItem onClick={act} title={sectionTitle} key={sectionTitle}/>
    })}
  </div>
</section>
}

export default function Page() {
  return (
    <div className="py-10">
      <h1 className="text-3xl mb-10 underline-offset-8 underline">Basics</h1>
      <div className="flex flex-col 2xl:flex-row gap-10">
      <Section title="Structures" items={[
        {title: "Data structures", act: () => structures('data')},
        {title: "Flow structures", act: () => structures('flow')},
        {title: "Function structures", act: () => structures('function')},
        {title: "Array Methods", act: () => structures('array')},
      ]} />
      <Section title="Operators" items={[
        {title: "!!", act: () => operators("toBool")},
        {title: "??", act: () => operators("nullish")},
        {title: "??=", act: () => operators("nullishAssign")},
        {title: "?.", act: () => operators("optionalChain")},
        {title: "...", act: () => operators("spread")},
      ]}/>
      <Section title="Composition" items={[
        {title: "Composition", act: () => composition('composition')},
        {title: "Curry", act: () => composition('curry')},
        {title: "Pipe", act: () => composition('pipe')}
      ]} />
      <Section title="Functores" items={[
        {title: "Applicative", act: () => applicative()},
      ]} />
      </div>
    </div>
  );
}
