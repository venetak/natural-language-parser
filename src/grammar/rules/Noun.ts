import Rule from './Rule'
import dictionary from '../dictionary/dictionary'
import { Token } from '../../token'

console.log('----------------------------------------------------------------------------')
console.log(dictionary)
console.log('----------------------------------------------------------------------------')
const nouns = dictionary.nouns

/**
 * @class Noun
 * These are the production rules for Noun.
 */
class Noun extends Rule {
    value: string

    constructor (value: string) {
        super()
        this.type = 'Noun'
        this.value = value
    }

    /**
     * Determines if a token is a Noun by checking if it exists in the dictionary.
     * @param token A string token.
     */
    static isNoun (token: Token): boolean {
        return nouns.indexOf(<string>token) > -1
    }

    static isNounInstance (token: Token): boolean {
        return token instanceof Noun
    }
}

export default Noun
