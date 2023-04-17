import NounPhraseRule from './NounPhraseRule'
import { prepositions } from '../dictionary/dictionary'
import Rule from './Rule'
import { Token } from '../../token'

/**
 * @class Preposition
 * These are the production rules for a Preposition.
 */
class Preposition extends Rule {
    value: Token

    constructor (token: Token) {
        super()
        this.type = 'Preposition'
        this.value = <string>token
    }

    /**
     * Determines if a token is a preposition by checking if it exists in the dictionary.
     * @param token A string token that will be checked.
     */
    static isPreposition (token: Token): boolean {
        return prepositions.indexOf(<string>token) > -1
    }

    static isPrepositionInstance (token: Token): boolean {
        return token instanceof Preposition
    }
}

export default Preposition
