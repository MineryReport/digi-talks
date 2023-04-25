'use client'
import { list } from "~/data/species";
import { useMemo, useState, ChangeEventHandler} from "react";


export default function Page() {

    const [clasificacion, setClasificacion] = useState<string>("")
    
    const listita = useMemo(() => list.reduce((acumulador, especie) => {
        return [
            ...acumulador,
            ...(acumulador.includes(especie.classification)
            ? []
            : [especie.classification]),
        ];
        }, [] as string[]),
        []
    )

    const changeSpecie: ChangeEventHandler<HTMLSelectElement> = (ev) => {
        setClasificacion(ev.target.value)
    }

    const filteredList = useMemo(() => list.filter((specie) => specie.classification === clasificacion || clasificacion === '' ), [clasificacion])

  return (
    <>
      <div>
        <select value={clasificacion} onChange={changeSpecie}>
            <option value="">filtrar por clasificacion</option>
          {listita.map((classification) => {
            return (
              <option value={classification} key={classification}>{classification}</option>
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
