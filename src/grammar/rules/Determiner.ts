import dictionary from '../dictionary/dictionary'
import { Token } from '../../token'
import Rule from './Rule'

const determiners = dictionary.determiners.map(word => word.toLowerCase())
/**
 * @class Determiner
 * These are the production rules for determiner.
 */
class Determiner extends Rule {
    value: string

    constructor (value: string) {
        super()
        this.type = 'Determiner'
        this.value = value
    }

    /**
     * Determines if a token is a determiner by checking if it exists in the dictionary.
     * @param token A string token.
     */
    static isDeterminer (token: Token): boolean {
        return determiners.indexOf((<string>token).toLowerCase()) > -1
    }

    static isDeterminerInstance (token: Token): boolean {
        return token instanceof Determiner
    }
}

export default Determiner
