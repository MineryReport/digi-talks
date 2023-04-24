/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/ban-types */
import { type Specie, list } from "~/data/species";


const onlyMammals = (specie: Specie) => specie.classification === "mammal";
const concatenateSpecie = (specie: Specie) =>
  `${specie.name}${specie.homeworld ? " from " : ""}${
    specie.homeworld?.name ?? ""
  }`;

const concatenateSpecieWithTrace = (tracer: (val:any) => any) => (specie: Specie) => {
	tracer(specie)
	return concatenateSpecie(specie)
}

const trace = (label: string) => (value: any) => {
	console.log(`${ label }:`, value);
	return value;
};
const pipe = (...fns: Function[]) => (x: any) => fns.reduce((y, f) => f(y), x)
const fnFilter = (condition: (a:any) =>boolean) => (list: any[]) => list.filter(condition)
const fnMap = (fn: (value: any, index: number, array: any[]) => any) => (list: any[]) => list.map(fn)


const functionComposition = () => {
	// composition
	console.log(`
	Componiendo funciones

	const res = list.filter(onlyMammals).map(concatenateSpecie);
	`)
	const res = list.filter(onlyMammals).map(concatenateSpecie);
	console.log(res);
}

const curry = () => {
	// curry
	console.log(`
	Con curry

	const resWithTrace = list.filter(onlyMammals).map(concatenateSpecieWithTrace(trace("specie")))
	`)
	const resWithTrace = list.filter(onlyMammals).map(concatenateSpecieWithTrace(trace("specie")))
	console.log({resWithTrace});
}

const pipeExample = () => {
	// curry
	console.log(`
	Con pipe

	const h = pipe(
		fnFilter(onlyMammals),
		trace("postFilter"),
		fnMap(concatenateSpecie),
		trace("postMap")
	)
	const resWithPipe = h(list)
	`)
	const h = pipe(
		fnFilter(onlyMammals),
		trace("postFilter"),
		fnMap(concatenateSpecie),
		trace("postMap")
	)
	const resWithPipe = h(list)
	console.log({resWithPipe});
}

type CompositionExample = 'composition' | 'curry' | 'pipe'

const composition = (example: CompositionExample = 'composition', log?:(...msg: any[]) => void) => {
	if (log) {
		console.log = log
	}
	console.clear()
	console.log(`
	Composicion
	
	const onlyMammals = (specie: Specie) => specie.classification === "mammal";
	const concatenateSpecie = (specie: Specie) =>
	\`\${specie.name}\${specie.homeworld ? " from " : ""}\${
		specie.homeworld?.name ?? ""
	}\`;

	const concatenateSpecieWithTrace = (tracer: (val:any) => any) => (specie: Specie) => {
		tracer(specie)
		return concatenateSpecie(specie)
	}

	const trace = (label: string) => (value: any) => {
		console.log(\`\${ label }:\`, value);
		return value;
	};
	const pipe = (...fns: Function[]) => (x: any) => fns.reduce((y, f) => f(y), x)
	const fnFilter = (condition: (a:any) =>boolean) => (list: any[]) => list.filter(condition)
	const fnMap = (fn: (value: any, index: number, array: any[]) => any) => (list: any[]) => list.map(fn)
	
	`)
	const examples = {
		'composition': functionComposition,
		'curry': curry,
		'pipe': pipeExample
	}
	examples[example]?.()
};

export default composition