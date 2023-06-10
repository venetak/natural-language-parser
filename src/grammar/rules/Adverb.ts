import dictionary from '../dictionary/dictionary'
import { Token } from '../../token'
import Rule from './Rule'

const adverb = dictionary.adverbs

/**
 * @class Adverb
 * These are the production rules for adverb.
 */
class Adverb extends Rule {
    value: string

    constructor (value: string) {
        super()
        this.type = 'Adverb'
        this.value = value
    }

    /**
     * Determines if a token is an adverb by checking if it exists in the dictionary.
     * @param token A string token.
     */
    static isAdverb (token: Token): boolean {
        return adverb.indexOf(<string>token) > -1
    }

    static isAdverbInstance (token: Token): boolean {
        return token instanceof Adverb
    }
}

export default Adverb
