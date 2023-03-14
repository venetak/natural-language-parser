import NounPhraseRule from './NounPhraseRule'
import { prepositions } from '../dictionary/dictionary'
import Rule from './Rule'
import { Token } from '../../token'

const prepositionsLength = prepositions.length

class Preposition extends Rule {
    value: Token

    constructor (token: Token) {
        super()
        this.type = 'Preposition'
        // TODO: include noun phrase?
        this.value = <PrepositionValue>token
    }

    static isPreposition (token: Token): boolean {
        return prepositions.indexOf(<PrepositionValue>token) > -1
    }

    static isPrepositionInstance (token: Token): boolean {
        return token instanceof Preposition
    }
}

export default Preposition
