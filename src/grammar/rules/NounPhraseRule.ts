import Rule from './Rule'
import { Token } from '../../token'
import Noun from './Noun'
import Determiner from './Determiner'

/**
 * @class NounPhraseRule
 * These are the production rules for a Noun Phrase.
 * A NounPhrase can have a <Noun>, <Determiner><Noun|NounPhrase> structure.
 */
class NounPhraseRule extends Rule {
    noun: Token
    determiner: Token

    constructor (tokens: Token[]) {
        super()
        this.type = 'NounPhrase'

        // TODO: validate if tokens actually create noun phrase
        // Set the noun and determiner members
        for (const token of tokens) {
            if (NounPhraseRule.isNounPhraseInstance(token) || Noun.isNounInstance(token)) this.noun = token
            if (Determiner.isDeterminerInstance(token)) this.determiner = token
        }
    }

    static isNounPhraseInstance (token: Token): boolean {
        return token instanceof NounPhraseRule
    }

    /**
     * Checks if an array of tokens can form a Noun Phrase.
     * If there is only one item in the tokens array - according to the grammar -
     * it can be a Noun instance, nothing else.
     * @param tokens The array of tokens that will be checked.
     */
    static isNounPhrase (tokens: Token[]): boolean {
        const tokensLen = tokens.length
        if (!this.isCorrectLength(tokensLen, 0, 2)) return false

        const [tokenA, tokenB] = tokens
        if (tokensLen === 1) return Noun.isNounInstance(tokenA)
        return Determiner.isDeterminerInstance(tokenA) && this.isNounPhraseInstance(tokenB) ||
               Determiner.isDeterminerInstance(tokenA) && Noun.isNounInstance(tokenB)
    }
}

export default NounPhraseRule
