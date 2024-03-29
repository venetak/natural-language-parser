import Rule from './Rule'
import dictionary from '../dictionary/dictionary'
import { Token } from '../../token'

const nouns = dictionary.nouns.map(word => word.toLowerCase())

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
        return nouns.indexOf((<string>token).toLowerCase()) > -1
    }

    static isNounInstance (token: Token): boolean {
        return token instanceof Noun
    }
}

export default Noun
