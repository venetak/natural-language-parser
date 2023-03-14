import { Token } from '../../token'
import NounPhraseRule from './NounPhraseRule'
import Rule from './Rule'
import VerbPhraseRule from './VerbPhraseRule'
import Subject from './Subject'

class SentenceRule extends Rule {
    verbPhrase: Token
    subject: Token

    constructor (tokens: Token[]) {
        super()
        this.type = 'Sentence'

        for (const token of tokens) {
            if (NounPhraseRule.isNounPhraseInstance(token)) this.subject = token
            if (VerbPhraseRule.isVerbPhraseInstance(token)) this.verbPhrase = token
        }
    }

    static isSentence (tokens: Token[]) {
        const tokensLength = tokens.length
        if (!this.isCorrectLength(tokensLength, 0, 2)) return false
        const [tokenA, tokenB] = tokens
        
        if (tokensLength === 1) return VerbPhraseRule.isVerbPhraseInstance(tokenA)
        // return (VerbPhraseRule.isVerbPhraseInstance(tokenA) && Subject.isSubjectInstance(tokenB)) ||
        //        (VerbPhraseRule.isVerbPhraseInstance(tokenB) && Subject.isSubjectInstance(tokenA))
        return (VerbPhraseRule.isVerbPhraseInstance(tokenA) && NounPhraseRule.isNounPhraseInstance(tokenB)) ||
               (VerbPhraseRule.isVerbPhraseInstance(tokenB) && NounPhraseRule.isNounPhraseInstance(tokenA))
    }
}

export default SentenceRule
