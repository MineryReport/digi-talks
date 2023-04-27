"use client";
import { list } from "~/data/species";
import { useMemo, useState, ChangeEventHandler } from "react";

const TestComponent = () => {
  type Idea = {
    id: number;
    name: string;
    date: string;
  };
  const ideas: Idea[] = [
    { id: 1, name: "a", date: "hoy" },
    { id: 2, name: "b", date: "ayer" },
    { id: 3, name: "c", date: "mañana" },
    { id: 4, name: "c1", date: "mañana" },
    { id: 5, name: "c2", date: "mañana" },
  ];
  const ideasDeHoy = ideas.filter((idea) => idea.date === "hoy");
  const ideasDeMñn = ideas.filter((idea) => idea.date === "mañana");
  const ideasDeAyer = ideas.filter((idea) => idea.date === "ayer");
  const clasificadas = {
    presentes: ideasDeHoy,
    futuras: ideasDeMñn,
    pasadas: ideasDeAyer,
  };

  const reduceClasificadas = ideas.reduce(
    (acc, idea) => {
      return {
        pasadas: [...acc.pasadas, ...(idea.date === "ayer" ? [idea] : [])],
        presentes: [...acc.presentes, ...(idea.date === "hoy" ? [idea] : [])],
        futuras: [...acc.futuras, ...(idea.date === "mañana" ? [idea] : [])],
      };
    },
    { presentes: [] as Idea[], futuras: [] as Idea[], pasadas: [] as Idea[] }
  );

  const cache: string[] = [];
  const dirtyFilter = list.filter((specie) => {
    if (cache.includes(specie.classification)) return false;
    cache.push(specie.classification);
    return true;
  });

  return <></>;
};

export default function Page() {
  const [clasificacion, setClasificacion] = useState<string>("");

  const listita = useMemo(
    () =>
      list.reduce((acumulador, especie) => {
        return [
          ...acumulador,
          ...(acumulador.includes(especie.classification)
            ? []
            : [especie.classification]),
        ];
      }, [] as string[]),
    []
  );

  
  const changeSpecie: ChangeEventHandler<HTMLSelectElement> = (ev) => {
    setClasificacion(ev.target.value);
  };

  const filteredList = useMemo(
    () =>
      list.filter(
        (specie) =>
          specie.classification === clasificacion || clasificacion === ""
      ),
    [clasificacion]
  );

  return (
    <>
      <div>
        <select value={clasificacion} onChange={changeSpecie}>
          <option value="">filtrar por clasificacion</option>
          {listita.map((classification) => {
            return (
              <option value={classification} key={classification}>
                {classification}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex flex-row gap-3">
        {filteredList.map((species) => (
          <div className="m-5 border border-cyan-300 px-3" key={species.name}>
            {species.name}
          </div>
        ))}
      </div>
    </>
  );
}
