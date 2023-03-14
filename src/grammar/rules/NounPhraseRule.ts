import Rule from './Rule'
import { Token } from '../../token'
import Noun from './Noun'
import Determiner from './Determiner'

class NounPhraseRule extends Rule {
    noun: Token
    determiner: Token

    constructor (tokens: Token[]) {
        super()
        this.type = 'NounPhrase'

        for (const token of tokens) {
            if (NounPhraseRule.isNounPhraseInstance(token) || Noun.isNounInstance(token)) this.noun = token
            if (Determiner.isDeterminerInstance(token)) this.determiner = token
        }
    }

    static isNounPhraseInstance (token: Token): boolean {
        return token instanceof NounPhraseRule
    }

    static isNounPhrase (tokens: Token[]): boolean {
        const tokensLen = tokens.length
        if (!this.isCorrectLength(tokensLen, 0, 2)) return

        const [tokenA, tokenB] = tokens
        if (tokensLen === 1) return Noun.isNounInstance(tokenA)
        return Determiner.isDeterminerInstance(tokenA) && this.isNounPhraseInstance(tokenB) ||
               Determiner.isDeterminerInstance(tokenA) && this.isNounPhraseInstance(tokenB)
    }
}

export default NounPhraseRule
