import { Maybe} from '../maybe'
import { _Just, _Nothing, isJust, isNothing, Just, Nothing } from '../maybe'


describe('Test if Just and Nothing Class constructors works', () => { 

    //Helpers
    const Nothing = _Nothing.of<unknown>(undefined)
    const Just = <T>(x:T):_Just<T> => new _Just(x)

    it('_Just class constructor', () => {        
        const result = [
            Just(10),
            Just(20)
        ].map(x=>x.value)

        const expected = [10,20]
        expect(result).toEqual(expected)
    })

    it('_Nothing class constructor', () => {        
        const result = [
            Nothing,
            _Nothing.of<undefined>(undefined)
        ].map(x=>x.value)

        const expected = [undefined, undefined]
        expect(result).toEqual(expected)
    })

    it('TypeGuards', () => {        
        const result = [
            Just(10),
            Nothing
        ].map( x => [isJust(x), isNothing(x)])
            
        const expected = [[true,false],[false,true]]
        expect(result).toEqual(expected)
    })

})


describe('Test Maybe class Monad', () => { 

    //helper
    const _nothing = _Nothing.of<unknown>(undefined)
    const _just = <T>(x:T):_Just<T> => new _Just(x)

    it('Constructors', () => {        
        const result = [
            new Maybe(_just(10)),
            new Maybe(_nothing),
            //
            Maybe.of(_just(20)),
            Maybe.of(_nothing),
            //
            Maybe.Just(30),
            Maybe.Nothing(undefined),
            //
            Just(40),
            Nothing(),

        ].map( _ => _.value.value )
        
        const expected = [10, undefined, 20, undefined, 30, undefined, 40, undefined]
        expect(result).toEqual(expected)
    })

    it('type guards', () => {        
        const a = Maybe.of(_just(20))
        const result = [
            a.isNothing,
            a.isJust,
        ]
        const expected = [false, true]
        expect(result).toEqual(expected)
    })

    it('map / fmap / join (indirectly)', () => {        
        
        const a = Maybe.of(_just(20))
        const b = Maybe.of(_just('hello'))
        const result = [
            //map
            a.map(x => x + 10),
            b.map(x => x.concat(' world')),
            //fmap
            a.fmap( x => Maybe.Just(x + 100)),
            a.fmap( x => Maybe.Nothing(undefined)),
        ].map( x => x.value.value)
        const expected = [30, 'hello world', 120, undefined]
        expect(result).toEqual(expected)
    })

    it('fromJust', () => {        
        const result1 = Maybe.Just(20)._fromJust()
        const expected1 = 20
        expect(result1).toEqual(expected1)

        const result2 = () => Maybe.Nothing<unknown>()._fromJust()
        expect(result2).toThrow(TypeError)
    })


    it('Miscelaneous', () => {        
        const a = Maybe.Just(20)
        const b = Maybe.Nothing<any>()
        const result = [
            // from Maybe
            a.fromMaybe(10),
            b.fromMaybe(50),
            // from list
            Maybe.listToMaybe([3])._fromJust(),
            // maybe to list
            Maybe.maybeToList(Maybe.Just(7)),
            Maybe.catMaybes([a,b,a,b])
        ]
        const expected = [20, 50, 3, [7], [20,20]]
        expect(result).toEqual(expected)
    })


}) 

