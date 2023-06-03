import Rule from './Rule'
import { Token } from '../../token'
import VerbPhraseRule from './VerbPhraseRule'
import Conjunction from './Conjunction'

class SentenceRule extends Rule {
    verbPhraseA: Token
    verbPhraseB: Token
    conjunction: Token

    constructor (tokens: Token[]) {
        super()
        this.type = 'Sentence'
        const [verbPhraseA, conjunction, verbPhraseB] = tokens

        if (VerbPhraseRule.isVerbPhraseInstance(verbPhraseA)) this.verbPhraseA = verbPhraseA
        if (VerbPhraseRule.isVerbPhraseInstance(verbPhraseB)) this.verbPhraseB = verbPhraseB
        this.conjunction = conjunction
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
            verbPhraseB: (<VerbPhraseRule>(this.verbPhraseB)).toHumanReadableObject(),
        })
    }
}

export default SentenceRule
