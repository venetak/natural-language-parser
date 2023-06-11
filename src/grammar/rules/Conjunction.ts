import dictionary from '../dictionary/dictionary'
import { Token } from '../../token'
import Rule from './Rule'

const conjunction = dictionary.conjunctions.map(word => word.toLowerCase())

/**
 * @class Conjunction
 * These are the production rules for conjunction.
 */
class Conjunction extends Rule {
    value: string

    constructor (value: string) {
        super()
        this.type = 'Conjunction'
        this.value = value
    }

    /**
     * Determines if a token is a conjunction by checking if it exists in the dictionary.
     * @param token A string token.
     */
    static isConjunction (token: Token): boolean {
        return conjunction.indexOf((<string>token).toLowerCase()) > -1
    }

    static isConjunctionInstance (token: Token): boolean {
        return token instanceof Conjunction
    }
}

export default Conjunction
