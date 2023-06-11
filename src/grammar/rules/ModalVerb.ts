import Rule from './Rule'
import dictionary from '../dictionary/dictionary'
import { Token } from '../../token'

const modalVerbs = dictionary.modalVerbs.map(word => word.toLowerCase())

/**
 * @class Verb
 * These are the production rules for Verb.
 */
class ModalVerb extends Rule {
    value: string

    constructor (value: string) {
        super()
        this.type = 'ModalVerb'
        this.value = value
    }

    /**
     * Determines if a token is a Verb by checking if it exists in the dictionary.
     * @param token The token that will be checked.
     */
    static isModalVerb (token: Token) {
        return modalVerbs.indexOf((<string>token).toLowerCase()) > -1
    }

    static isModalVerbInstance (token: Token) {
        return token instanceof ModalVerb
    }
}

export default ModalVerb
