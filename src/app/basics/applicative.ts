/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
Array.prototype.ap = function (wrappedVal: string[]) {
	return this.flatMap(f => wrappedVal.map(x => (...args:any[]) => f(x, ...args)))
}

declare global {
	interface Array<T> {
	  ap: (wrapped: string[]) => ((...args: any[]) => any)[];
	}
  }

const concat = (...args: string[]) => {
	return args.join("")
}

const applicative = () => {
	console.clear();
	console.log(`
		Applicative Functor

		const passwordList = [concat]
			.ap(["p","P"])
			.ap(["a","4"])
			.ap(["s","2","$"])
			.ap(["s", "2", "$"])
			.ap(["w"])
			.ap(["0", "o"])
			.ap(["rd"])
			.ap(["", "!"])
			.map(f => f())
	`)
	const passwordList = [concat]
		.ap(["p","P"])
		.ap(["a","4"])
		.ap(["s","2","$"])
		.ap(["s", "2", "$"])
		.ap(["w"])
		.ap(["0", "o"])
		.ap(["rd"])
		.ap(["", "!"])
		.map(f => f())

	
	console.log({passwordList})
} 

export default applicative