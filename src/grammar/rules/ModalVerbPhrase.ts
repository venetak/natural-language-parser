import Rule from './Rule'
import ModalVerb from './ModalVerb'
import Conjunction from './Conjunction'
import { Token } from '../../token'
import VerbPhraseRule from './VerbPhraseRule'

/**
 * @class Verb
 * These are the production rules for Verb.
 */
class ModalVerbPhrase extends Rule {
    modalVerb: Token
    verbPhrase: Token
    conjunction: Token

    constructor (tokens: Token[]) {
        super()
        this.type = 'ModalVerbPhrase'

        // set preposition, verb and noun members
        for (const token of tokens) {
            if (ModalVerb.isModalVerbInstance(token)) this.modalVerb = token
            if (VerbPhraseRule.isVerbPhraseInstance(token)) this.verbPhrase = token
            if (Conjunction.isConjunctionInstance(token)) this.conjunction = token
        }
    }

    /**
     * Determines if a token is a Verb by checking if it exists in the dictionary.
     * @param token The token that will be checked.
     */
    static isModalVerbPhrase (tokens: Token[]) {
        if (!this.isCorrectLength(tokens.length, 0, 3)) return false

        const [ tokenA, tokenB, tokenC ] = tokens

        if (tokens.length === 2) return (ModalVerb.isModalVerbInstance(tokenA) && VerbPhraseRule.isVerbPhraseInstance(tokenB))
        return (ModalVerb.isModalVerbInstance(tokenA) && Conjunction.isConjunctionInstance(tokenB) && VerbPhraseRule.isVerbPhraseInstance(tokenC))
    }

    static isModalVerbPhraseInstance (token: Token) {
        return token instanceof ModalVerbPhrase
    }
}

export default ModalVerbPhrase
