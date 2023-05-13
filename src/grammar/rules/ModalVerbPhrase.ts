import Rule from './Rule'
import ModalVerb from './ModalVerb'
import { Token } from '../../token'
import VerbPhraseRule from './VerbPhraseRule'

/**
 * @class Verb
 * These are the production rules for Verb.
 */
class ModalVerbPhrase extends Rule {
    modalVerb: Token
    verbPhrase: Token

    constructor (tokens: Token[]) {
        super()
        this.type = 'ModalVerbPhrase'

        // set preposition, verb and noun members
        for (const token of tokens) {
            if (ModalVerb.isModalVerbInstance(token)) this.modalVerb = token
            if (VerbPhraseRule.isVerbPhraseInstance(token)) this.verbPhrase = token

        }
    }

    /**
     * Determines if a token is a Verb by checking if it exists in the dictionary.
     * @param token The token that will be checked.
     */
    static isModalVerbPhrase (tokens: Token[]) {
        if (!this.isCorrectLength(tokens.length, 0, 2)) return false

        const [ tokenA, tokenB ] = tokens
        return (ModalVerb.isModalVerbInstance(tokenA) && VerbPhraseRule.isVerbPhraseInstance(tokenB))

    }

    static isModalVerbPhraseInstance (token: Token) {
        return token instanceof ModalVerbPhrase
    }
}

export default ModalVerbPhrase
