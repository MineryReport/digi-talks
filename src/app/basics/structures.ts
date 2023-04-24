/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { type Specie, list } from "~/data/species";

const dataStructures = () => {
  /**
   * Array vs Objeto vs Map
   * 
   * https://www.zhenghao.io/posts/object-vs-map
   */
  console.clear()
  console.log(`
    Array vs Objeto vs Map
    
    Array -> lentos de encontrar un elemento, mantienen el orden de insección

    Objetos -> rapidos de encontrar un elemnto, 
              baratos en memoria, 
              ideal para una cantidad finita de propiedades conocidas de ante mano (objetos de configuración)
              ideal para cualquier cosa de un único uso
              no mantienen el orden de insercción
    
    Map -> muy rapido de encontrar un elemento,
          permite un mayor numero de keys y de tipos más variados
          consume menos memoria que un objeto del mismo tamaño
          mantienen el orden de insercción, 
          no funcionan en todas las situaciones de front
  `)

  // Array -> lentos de encontrar un elemento, mantienen el orden de insección
  const key = "87560"
  const arr = new Array(100000).fill(0).map((_, indx) => ({key: indx.toString(), val: indx}) )
  // si queremos encontrar b:
  performance.mark("arr-started")
  const bArr = arr.find((it) => it.key === key)
  performance.mark("arr-end")
  
  // Objetos -> rapidos de encontrar un elemnto, 
  // baratos en memoria, 
  // ideal para una cantidad finita de propiedades conocidas de ante mano (objetos de configuración)
  // ideal para cualquier cosa de un único uso
  // no mantienen el orden de insercción
  const obj = arr.reduce((acc, item) => ({...acc, [item.key]: item.val}),{} as {[key:string]: number})
  performance.mark("obj-started")
  const bObj = obj[key]
  performance.mark("obj-end")

  // Map -> muy rapido de encontrar un elemento,
  // permite un mayor numero de keys y de tipos más variados
  // consume menos memoria que un objeto del mismo tamaño
  // mantienen el orden de insercción, 
  // no funcionan en todas las situaciones de front
  const mapEl = arr.reduce((acc, item) => {
    acc.set(item.key, item.val)
    return acc
  },new Map<string, number>())
  performance.mark("map-started")
  const bMap = mapEl.get(key)
  performance.mark("map-end")

  const arrPerf = performance.measure("array", "arr-started", "arr-end")
  const objPerf = performance.measure("obj", "obj-started", "obj-end")
  const mapPerf = performance.measure("map", "map-started", "map-end")
  console.log("arr.find((it) => it.key === key)", bArr, arrPerf.duration.toPrecision(21));
  console.log("obj[key]", bObj, objPerf.duration.toPrecision(21));
  console.log("mapEl.get(key)", bMap, mapPerf.duration.toPrecision(21));
}

const flowStructures = () => {
  /**
   * If/Else vs Switch vs Object
   */
  console.clear()
  console.log(`
    If/Else vs Switch vs Object

    Switch case:
      - Evalua cada caso hasta que encuentra el correcto
      - Dificil de mantener
      - Obligado a añadir break al final de cada statement (si no se hace return)
      - Nested errors
      - Restricciones, como no permitir usar la misma constante para dos casos diferentes
      - En js todo esta basado en { } menos switch

    if-else:
      - Evalua cada caso hasta que encuentra el correcto a menos que salgas explicitamente
      - Dificil de testear
      - Dificil de comprender cuando hay logica compleja
      - Dificil de mantener

    Objetos:
      - No estas forzado a hacer nada
      - Puedes usar funciones dentro de los objetos
      - El rendimiento es constante y no empeora con el numero de casos
      - Mas legible
  `)
  const getValue = () => "2"
  const obj = getValue()

  if (obj === "1") {

  } else if (obj === "2") {

  } else if (obj === "3") {

  } else {

  }

  switch(obj) {
  	case "1":
  		break;
  	case "2":
  		break;
  	case "3":
  		break;
  	default:
  		break;
  }

  const options: {[key: string]: () => void} = {
  	"1": () => { console.log("1") },
  	"2": () => { console.log("2") },
  	"3": () => { console.log("3") },
  }
  options[obj]?.() ?? 2
}

const functionStructures = () => {
  /**
   * Arrow function vs Function
   */
  console.clear()

  function myFunction() {
    console.log(this)
  }
  const myObject = {
    method() {
      console.log(this)
    }
  }

   const myObject2 = {
    myMethod(items: number[]) {
      console.log(this)
      const callback = () => {
        console.log(this)
      }
      items.forEach(callback)
    }
   }

  console.log(`
    Arrow function vs Function

    this: 
      -Funcion: dentro de una función normal de js el valor de this (el contexto de ejecucion) es dinamico,
          esto significa que el valor de this depende de como se invoca la funcion. 
          
          - Durante la invocación directa this es el objeto global o undefined si estas en strict mode
  `)
  myFunction()
  console.log(`
          - Durante la invocación de un metodo el valor de this es el objeto dueño del metodo
  `)
  myObject.method()
  console.log(`
          - Durante una invocación indirecta usando myFunc.call(thisVal1, arg1, ...m argN) o myFunc.apply(thisVal, [arg1, ..., argN]) this es el primer argumento
  `)
  const myContext = { value: 'A'}
  myFunction.call(myContext)
  myFunction.apply(myContext)

  console.log(`
          - Durante la invocacion del constructor usando "new" this es la instancia recien creada
  `)
  new myFunction()
  console.log(`
      -Arrow: La función flecha no define su propio contexto de ejecución sino que resuelve al de la funcion externa. 
            Da igual como se invoque la funcion, siempre hace referencia al de la funcion externa.
  `)
  myObject2.myMethod([1, 2, 3])

  function Car(color: string) {
    this.color = color
  }

  console.log(`
    Constructors:
      - Funcion: como se vió antes, una función normal puede crear facilmente nuevos objetos
  `)
  const redCar = new Car('red')
  console.log(`
          const redCar = new Car('red')
          redCar instanceOf Car: ${redCar instanceof Car}
  `)
  console.log(`
      - Arrow: como consecuencia de resolver lexicamente this las funciones Arrow no pueden usarse como constructor
          const Car = (color:string ) => {
            this.color = color
          }
          const redCar = new Car('red') // TypeError: Car is not a constructor
  `)
  

  console.log(`
    Arguments:
      - Funcion: dentro de una funcion normal "arguments" es un objeto tipo array especial que contiene la lista de argumentos
                con los que se ha invocado la funcion
      - Arrow: las funciones arrow no tienen definida la variable especial "arguments"
    
    Implicit return:
      - Funcion: requieren el uso de return para devolver un valor
      - Arrow: en caso de no abrir {} automaticamente se devuelve la expresión

    Metodos:
      - Funcion: cuando se definen metodos en una clase usando una funcion normal hay que hacer bind del objeto this a la clase
      - Arrow: como resuelve lexicamente this al objeto superior, si se definen metodos como arrow functions automaticamente this hace referencia a la clase
  `)
}

const arrayMethods = () => {
 /**
   * Map, reduce, filter
   */
  
  console.clear()
  
  console.log(`
    Map, reduce, filter

    filter
    const mammals = list.filter((specie) => specie.classification === "mammal");
  `)
  const mammals = list.filter((specie) => specie.classification === "mammal");
  console.log(mammals)
  console.log(`
    const other = list.filter((specie) => specie.classification !== "mammal");
  `)
  const other = list.filter((specie) => specie.classification !== "mammal");
  console.log(other);


	// reduce
  console.log(`
    reduce
    const groupedByClassifications = list.reduce((acc, specie) => {
      return {...acc, [specie.classification]: [...(acc[specie.classification] ?? []), specie] }
    }, {} as {[key: string]: Specie[] })
  `)
	const groupedByClassifications = list.reduce((acc, specie) => {
		return {...acc, [specie.classification]: [...(acc[specie.classification] ?? []), specie] }
	}, {} as {[key: string]: Specie[] })
	console.log(groupedByClassifications)

	// map
  console.log(`
    map
    const transformed = list.map((specie) => \`\${specie.name}\${specie.homeworld ? ' from ':''}\${specie.homeworld?.name ?? ""}\`)
  `)
	const transformed = list.map((specie) => `${specie.name}${specie.homeworld ? ' from ':''}${specie.homeworld?.name ?? ""}`)
	console.log(transformed)

}

export type ExampleIndex = 'data' | 'flow' | 'function' | 'array'

const structures = (example: ExampleIndex = 'data', log?:(...msg: any[]) => void) => {
  if (log) {
    console.log = log
  }
  const options: {[key: string]: () => void} = {
    'data': dataStructures,
    'flow': flowStructures,
    'function': functionStructures,
    'array': arrayMethods
  }
  options[example]?.()
};

export default structures;
