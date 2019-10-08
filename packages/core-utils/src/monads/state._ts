import { S, B, A } from "ts-toolbelt"




type State<S,A> = {

    readonly kind: 'State'

    readonly run: (initialState: S) => readonly [S,A]

    readonly runA: (initialState: S) => A

    readonly map: <B>(f: (_:A) => B) => State<S,B>

    readonly fmap: <B>(f: (_:A) => State<S,B>) => State<S,B>

}

const State = <S,A>(nextState: (_:S) => readonly [S, A]): State<S,A> => {


    const run: State<S,A>['run'] = initialState => {
        return nextState(initialState)
    }

    const runA: State<S,A>['runA'] = initialState => {
        return nextState(initialState)[1]
    }

    const map: State<S,A>['map'] = fn => {

        return State( (s0:S) => {
            const [sa, a] = run(s0)
            return [sa, fn(a)]
        } )

    }

    const fmap: State<S,A>['fmap'] = fn =>  {
        
        const f = (s0:S) => {
            const [sa, a] = run(s0)
            const stateB = fn(a)
            const [sb, b] = stateB.run(sa)
            return [sb, b] as const
        }

        return State(f)    

    }


    return {
        kind: 'State',
        run,
        runA,
        map,
        fmap,
    }

}

// --- informal test ---


// static evoluation
const Test1 = () => {

    type CStateKind = 0 | 1 | 2 | 3 | 4 | 5

    type CState = {
        readonly current: CStateKind
    }

    const s0:CState = { current: 0 } 


    const transition1: State<CState, string> = State( s => {
        return [ {current: 1}, 'Primeira transicao feita' ]
    })

    const doSomething = (length: number):State<CState, number> => State( s => {
        
        return [(s.current===1 && length>2) ? {current: 2} : {current: 5}, 0]

    })

    const a = transition1
        .map(   msg => msg.length )
        .fmap(  doSomething )
        .map(   len => len+10)
        .fmap(  max_len => State( s => {
            
            const isSpecialCase = (max_len <= 11) && (s.current === 1) 
            const newState:CState = isSpecialCase ? {current: 5} : {current: 2}
            return [ newState, 'Oi denovo'] as const

        }))

}

const Test2 = () => {

    type Phases = 
        | 'Nao iniciado' | 'Primeiro Esc Detectado' | 'StartByte Detectado' | 'Aguardando segundo esc' | 'Aguardando Etx' | 'Esc_duplicado' | 'Aguardando checksum' | 'concluido com exito' | 'erro'

    type PState = {
        readonly rejected: readonly number[]
        readonly currentPhase: Phases
        readonly processing: readonly number[]
        readonly accepted: readonly number[] | undefined
    }

    const initialState: PState = {
        rejected: [],
        currentPhase: 'Nao iniciado',
        processing: [],
        accepted: undefined
    }

    type MState = State<PState, PState['accepted']> 

    const ProcessNext = (byte: number) => State( (s: PState) => {

        // tslint:disable-next-line: no-let
        let newState: PState

        switch(s.currentPhase) {

            case 'Nao iniciado': {
                
            }

        }

    })


    const
    
    
        








}

// tslint:disable-next-line: no-expression-statement
//Test1()
