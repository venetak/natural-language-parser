import Rule from './Rule'
import NounPhraseRule from './NounPhraseRule'
import Preposition from './PrepositionRule'
import { verbs } from '../dictionary/dictionary'
import { Token } from '../../token'
import Verb from './Verb'
import Noun from './Noun'

class VerbPhraseRule extends Rule {
    preposition: Token
    verb: Token
    noun: Token

    constructor (tokens: Token[]) {
        super()
        this.type = 'VerbPhrase'

        for (const token of tokens) {
            if (Preposition.isPrepositionInstance(token)) this.preposition = token
            if (Verb.isVerbInstance(token) || VerbPhraseRule.isVerbPhraseInstance(token)) this.verb = token
            if (Noun.isNounInstance(token) || NounPhraseRule.isNounPhraseInstance(token)) this.noun = token
        }
    }

    static isVerbPhraseInstance (token: Token): boolean {
        return token instanceof VerbPhraseRule
    }

    static isVerbPhrase (tokens: Token[]): boolean {
        const tokensLen = tokens.length
        if (!this.isCorrectLength(tokensLen, 0, 3)) return false
        const [tokenA, tokenB, tokenC] = tokens

        if (tokensLen === 1) return Verb.isVerbInstance(tokenA)

        if (tokensLen === 2) {
            return (Verb.isVerbInstance(tokenA))       && NounPhraseRule.isNounPhraseInstance(tokenB)        ||
                   (Verb.isVerbInstance(tokenB))       && NounPhraseRule.isNounPhraseInstance(tokenA)        ||
                   (this.isVerbPhraseInstance(tokenA)) && NounPhraseRule.isNounPhraseInstance(tokenB)        ||
                   (this.isVerbPhraseInstance(tokenB)) && NounPhraseRule.isNounPhraseInstance(tokenA)
        }

        return (Verb.isVerbInstance(tokenA)       && NounPhraseRule.isNounPhraseInstance(tokenB) && Preposition.isPrepositionInstance(tokenC)) ||
               (this.isVerbPhraseInstance(tokenA) && NounPhraseRule.isNounPhraseInstance(tokenB) && Preposition.isPrepositionInstance(tokenC)) ||
               (this.isVerbPhraseInstance(tokenA) && Preposition.isPrepositionInstance(tokenB)   && NounPhraseRule.isNounPhraseInstance(tokenC))
    }
}

export default VerbPhraseRule
