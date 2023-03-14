import Rule from './Rule'
import { verbs } from '../dictionary/dictionary'
import { Token } from '../../token'

class Verb extends Rule {
    value: string

    constructor (value: string) {
        super()
        this.type = 'Verb'
        this.value = value
    }

    static isVerb (token: Token) {
        return verbs.indexOf(<VerbValue>token) > -1
    }

    static isVerbInstance (token: Token) {
        return token instanceof Verb
    }
}

export default Verb
