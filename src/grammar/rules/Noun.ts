import Rule from './Rule'
import { nouns } from '../dictionary/dictionary'
import { Token } from '../../token'

class Noun extends Rule {
    value: string

    constructor (value: string) {
        super()
        this.type = 'Noun'
        this.value = value
    }

    static isNoun (token: Token) {
        return nouns.indexOf(<NounValue>token) > -1
    }

    static isNounInstance (token: Token) {
        return token instanceof Noun
    }
}

export default Noun
