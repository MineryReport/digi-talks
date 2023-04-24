const toBool = () => {
  /**
   * !!
   * El operador ! evalua la variable como booleano, aplicado 2 veces te permite convertir cualquier valor en
   * un booleano que representa si existe valor o no, por lo que:
   */
  console.clear()
  console.log(`
  !!
  
  El operador ! evalua la variable como booleano, aplicado 2 veces te permite convertir cualquier valor en
  un booleano que representa si existe valor o no, por lo que:

  const a = "2";
  `)
  const a = "2";
  console.log("!a", !a) // false
  console.log("!!a", !!a) // true
  /**
   * La diferencia entre a y !!a es que !!a es true o false, y a puede llevar cualquier valor, de cara a condiciones
   * de if else, son intercambiables, de cara a condiciones en el return de React difieren.
   */
}
const nullish = () => {
/**
   * ?? - Nullish coalescing operator
   * El operador ?? es un shortcut de un ternario en el que si en valor de la izquierda esta definido y tiene valor
   * es el valor devuelto, sino, se devuelve el valor de la derecha.
   * Se usa para dar valores por defecto a valores opcionales.
   */
  console.clear()
  console.log(`
  ?? - Nullish coalescing operator
  
  El operador ?? es un shortcut de un ternario en el que si en valor de la izquierda esta definido y tiene valor
  es el valor devuelto, sino, se devuelve el valor de la derecha.
  Se usa para dar valores por defecto a valores opcionales.
  `)
  const valueDefined = 2
  console.log("valueDefined = 2:", valueDefined ?? "never") // 2
  const valueUndefined = undefined
  console.log("valueUndefined = undefined:", valueUndefined ?? "this") // "this"
}
const nullishAssignment = () => {
 /**
   * ??= - Nullish coalescing assignment
   * El operador ??= permite asignar un valor a x si y solo si x es nullish (null o undefined)
   */
  console.clear()
  console.log(`
  ??= - Nullish coalescing assignment
  
  El operador ??= permite asignar un valor a x si y solo si x es nullish (null o undefined)
  
  const nullishAssign: {duration: number, speed?: number} = { duration: 50 }
  `)
  const nullishAssign: {duration: number, speed?: number} = { duration: 50 }
  nullishAssign.duration ??= 10
  console.log("nullishAssign.duration ??= 10", nullishAssign.duration) // 50
  console.log("nullishAssign.speed", nullishAssign.speed) // undefined
  nullishAssign.speed ??= 25
  console.log("nullishAssign.speed ??= 25", nullishAssign.speed) // 25
}

const optionalChain = () => {
  /**
   * ?. - Optional chaining
   * El operador ?., optional chaining, permite acceder a una propiedad de un objeto o llamar a una funcion. En
   * caso de que el objeto al que se accede o la funcion sean null o undefined, la expresion se evalua a undefined
   * en lugar de lanzar error.
   */
  console.clear()
  console.log(`
  ?. - Optional chaining

  El operador ?., optional chaining, permite acceder a una propiedad de un objeto o llamar a una funcion. En
  caso de que el objeto al que se accede o la funcion sean null o undefined, la expresion se evalua a undefined
  en lugar de lanzar error.

  const adventurer: {
    name: string;
    cat: { name: string };
    dog?: { name: string };
    unexistingMethod?: () => void
   } = { name: "Alice", cat: { name: "Dinah" } };
  `)
  const adventurer: {
   name: string;
   cat: { name: string };
   dog?: { name: string };
   unexistingMethod?: () => void
  } = { name: "Alice", cat: { name: "Dinah" } };
  const dogName = adventurer.dog?.name;

  console.log("adventurer.dog?.name", dogName, "should return undefined"); // undefined
  console.log("adventurer.unexistingMethod?.()", adventurer.unexistingMethod?.(), "should return undefined"); // undefined
}

const spread = () => {
  /**
   * ... - el "spread operator"
   * 
   * Este operador permite convertir un iterable, como un array o un string, ser expandido
   * en sitios donde cero o más argumentos (como llamadas de funciones) o elementos (para arrays) sean experados.
   * En un objeto, la sintaxis (...) enumera las propiedades de un objeto y añade los pares
   * clave-valor al objeto que se esta creando
   */
  console.clear()

  console.log(`
  ... - el "spread operator"
  
  Este operador permite convertir un iterable, como un array o un string, ser expandido
  en sitios donde cero o más argumentos (como llamadas de funciones) o elementos (para arrays) sean experados.
  En un objeto, la sintaxis (...) enumera las propiedades de un objeto y añade los pares
  clave-valor al objeto que se esta creando
  `)
  function add(a: number,b: number,c: number) {
    return a + b + c
  }
  const obj1 = {
    a: 2,
    b: 3
  }
  console.log(`
  function add(a: number,b: number,c: number) {
    return a + b + c
  }
  add(...[1,2,3]) // ${add(...[1,2,3])}

  [1,2, ...[1, 2, 3]] // ${[1,2, ...[1, 2, 3]]}

  const obj1 = {
    a: 2,
    b: 3
  }
  const newObj = {...obj1, c: 4}
  `)
  const newObj = {...obj1, c: 4}
  console.log(newObj)

}

type OperatorExample = 'toBool' | 'nullish' | 'nullishAssign' | 'optionalChain' | 'spread'

const operators = (example: OperatorExample = 'toBool', log?:(...msg: any[]) => void) => {
  if (log){
    console.log = log
  }
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators
  const examples = {
    'toBool': toBool,
    'nullish': nullish,
    'nullishAssign': nullishAssignment,
    'optionalChain': optionalChain,
    'spread': spread
  }

  examples[example]?.()
};

export default operators;
