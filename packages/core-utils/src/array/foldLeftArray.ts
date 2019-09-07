// todo: What if there exists a foldLeftArray that permit early abortion of the iteration on elements of array ? Some time we just found what we want in the reduction process and return early is more efficient

export type FoldLeftCallback<Acc,Cur> = (acc: Acc, cur: Cur) => Acc

export type FoldLeftArray = <Acc, Cur>(arr: readonly Cur[], initialValue: Acc, fn: FoldLeftCallback<Acc,Cur>) => Acc

export const foldLeftArray: FoldLeftArray = <Acc, T>(arr: readonly T[], initialValue: Acc, fn: FoldLeftCallback<Acc,T> ): Acc => {

    // tslint:disable-next-line: no-let
    let acc: Acc = initialValue

    for (const cur of arr) {
        const newAcc = fn(acc, cur)
        // tslint:disable-next-line: no-expression-statement
        acc = newAcc
    }

    const r = acc
    return r

}


// informal test

const Test = () => {
    const a = foldLeftArray( [1,'xxxxx',[3,'ha'],4,5], '', (acc,cur) => acc.concat(`oi->${cur} `))
    console.log(a)
}

// tslint:disable-next-line: no-expression-statement
//Test()
