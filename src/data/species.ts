export type Specie = {
	name: string
	classification: string
	homeworld: {
		name: string
	} | null
}

export const list: Specie[] = [
    {
      name: "Human",
      classification: "mammal",
      homeworld: {
        name: "Coruscant",
      },
    },
    {
      name: "Droid",
      classification: "artificial",
      homeworld: null,
    },
    {
      name: "Wookie",
      classification: "mammal",
      homeworld: {
        name: "Kashyyyk",
      },
    },
    {
      name: "Rodian",
      classification: "sentient",
      homeworld: {
        name: "Rodia",
      },
    },
    {
      name: "Trandoshan",
      classification: "reptile",
      homeworld: {
        name: "Trandosha",
      },
    },
    {
      name: "Yoda's species",
      classification: "mammal",
      homeworld: {
        name: "unknown",
      },
    },
    {
      name: "Mon Calamari",
      classification: "amphibian",
      homeworld: {
        name: "Mon Cala",
      },
    },
    {
      name: "Ewok",
      classification: "mammal",
      homeworld: {
        name: "Endor",
      },
    },
    {
      name: "Sullustan",
      classification: "mammal",
      homeworld: {
        name: "Sullust",
      },
    },
    {
      name: "Twi'lek",
      classification: "mammal",
      homeworld: {
        name: "Ryloth",
      },
    },
    {
      name: "Hutt",
      classification: "gastropod",
      homeworld: {
        name: "Nal Hutta",
      },
    },
  ];