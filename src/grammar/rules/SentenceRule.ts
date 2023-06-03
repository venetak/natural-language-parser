import Rule from './Rule'
import { Token } from '../../token'
import VerbPhraseRule from './VerbPhraseRule'
import Conjunction from './Conjunction'

class SentenceRule extends Rule {
    verbPhraseA: Token
    verbPhraseC: Token
    conjunction: Token

    constructor (tokens: Token[]) {
        super()
        this.type = 'Sentence'
        const [tokenA, tokenB, tokenC] = tokens

        if (VerbPhraseRule.isVerbPhraseInstance(tokenA)) this.verbPhraseA = tokenA
        if (VerbPhraseRule.isVerbPhraseInstance(tokenC)) this.verbPhraseC = tokenC
        this.conjunction = tokenB
    }

    static isSentenceRuleInstance (token: Token) {
        return token instanceof SentenceRule
    }

    /**
     * Checks if an array of tokens can form a Sentence.
     * @param tokens The array of tokens that will be checked.
     */
    static isSentence (tokens: Token[]) {
        const tokensLen = tokens.length
        if (!this.isCorrectLength(tokensLen, 2, 3)) return false

        const [tokenA, tokenB, tokenC] = tokens

        return VerbPhraseRule.isVerbPhraseInstance(tokenA) && Conjunction.isConjunctionInstance(tokenB) && VerbPhraseRule.isVerbPhraseInstance(tokenC)
    }

    toHumanReadableJSON (): string {
        return JSON.stringify({
            conjunction: (<Conjunction>(this.conjunction)).value,
            verbPhraseA: (<VerbPhraseRule>(this.verbPhraseA)).toHumanReadableObject(),
            verbPhraseC: (<VerbPhraseRule>(this.verbPhraseC)).toHumanReadableObject(),
        })
    }
}

export default SentenceRule
