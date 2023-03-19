import Rule from './Rule'
import { verbs } from '../dictionary/dictionary'
import { Token } from '../../token'

/**
 * @class Verb
 * These are the production rules for Verb.
 */
class Verb extends Rule {
    value: string

    constructor (value: string) {
        super()
        this.type = 'Verb'
        this.value = value
    }

    /**
     * Determines if a token is a Verb by checking if it exists in the dictionary.
     * @param token The token that will be checked.
     */
    static isVerb (token: Token) {
        return verbs.indexOf(<VerbValue>token) > -1
    }

    static isVerbInstance (token: Token) {
        return token instanceof Verb
    }
}

export default Verb
