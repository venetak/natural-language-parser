import Rule from './Rule'
import { Token } from '../../token'
import VerbPhraseRule from './VerbPhraseRule'
import Adverb from './Adverb'

/**
 * @class Predicate
 * These are the production rules for Predicate.
 */
class Predicate extends Rule {
    verbPhrase: VerbPhraseRule
    adverb: Adverb

    constructor (tokens: Token[]) {
        super()
        this.type = 'Predicate'
        
        for (const token of tokens) {
            if (VerbPhraseRule.isVerbPhraseInstance(token)) this.verbPhrase = <VerbPhraseRule>token
            if (Adverb.isAdverbInstance(token)) this.adverb = <Adverb>token
        }
    }

    /**
     * Checks if an array of tokens is a Predicate.
     * @param token The token that will be checked.
     */
    static isPredicate (tokens: Token[]) {
        const tokensLen = tokens.length

        if (!this.isCorrectLength(tokensLen, 1, 2)) return false
        const [tokenA, tokenB] = tokens

        if (tokensLen === 1) return VerbPhraseRule.isVerbPhraseInstance(tokenA)
        return VerbPhraseRule.isVerbPhraseInstance(tokenA) && Adverb.isAdverbInstance(tokenB) ||
               Predicate.isPredicateInstance(tokenA) && Adverb.isAdverbInstance(tokenB)
    }

    static isPredicateInstance (token: Token) {
        return token instanceof Predicate
    }
}

export default Predicate
