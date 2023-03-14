import { determiners } from '../dictionary/dictionary'
import { Token } from '../../token'
import Rule from './Rule'


class Determiner extends Rule {
    value: string

    constructor (value: string) {
        super()
        this.type = 'Determiner'
        this.value = value
    }

    static isDeterminer (token: Token) {
        return determiners.indexOf(<DeterminerValue>token) > -1
    }

    static isDeterminerInstance (token: Token) {
        return token instanceof Determiner
    }
}

export default Determiner
