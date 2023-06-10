import Rule from './Rule'
import { Token } from '../../token'
import Predicate from './Predicate'
import Conjunction from './Conjunction'

class SentenceRule extends Rule {
    predicateA: Token
    predicateB: Token
    conjunction: Token

    constructor (tokens: Token[]) {
        super()
        this.type = 'Sentence'
        const [predicateA, conjunction, predicateB] = tokens

        if (Predicate.isPredicateInstance(predicateA)) this.predicateA = predicateA
        if (Predicate.isPredicateInstance(predicateB)) this.predicateB = predicateB
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

        return Predicate.isPredicateInstance(tokenA) && Conjunction.isConjunctionInstance(tokenB) && Predicate.isPredicateInstance(tokenC)
    }

    toHumanReadableJSON (): string {
        return JSON.stringify({
            conjunction: (<Conjunction>(this.conjunction)).value,
            predicateA: (<Predicate>(this.predicateA)).toHumanReadableObject(),
            predicateB: (<Predicate>(this.predicateB)).toHumanReadableObject(),
        })
    }
}

export default SentenceRule
