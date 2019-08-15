import { Observed } from '../core-types'




export const map = async function* <A,B>(o: Observed<A>, fn: (_:A) => B): Observed<B> {

    for await (const each of o)
        yield fn(each)

}

// informal test

/*

const o = range(10)
const a = map(o, x => console.log(`oi numero: ${x}`))

const show =  (): void  => {
    const b = a.next()
    const c = a.next()
}

show()

*/