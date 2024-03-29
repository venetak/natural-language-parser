import Rule from './Rule'
import NounPhraseRule from './NounPhraseRule'
import Preposition from './PrepositionRule'
import dictionary from '../dictionary/dictionary'
import { Token } from '../../token'
import Verb from './Verb'
import Noun from './Noun'
import ModalVerbPhrase from './ModalVerbPhrase'

const verbs = dictionary.verbs

/**
 * @class VerbPhraseRule
 * These are the production rules of VerbPhrase. Possible values are:
 * <Verb>
 * <Verb>        <NounPhrase>
 * <NounPhrase>  <Verb>
 * <VerbPhrase>  <NounPhrase>
 * <NounPhrase>  <VerbPhrase>
 * <Verb>        <NounPhrase>   <Preposition>
 * <VerbPhrase>  <NounPhrase>   <Preposition>
 * <VerbPhrase>  <Preposition>  <NounPhrase>
 */
class VerbPhraseRule extends Rule {
    preposition: Token
    verb: Token
    noun: Token
    modalVerb: Token

    constructor (tokens: Token[]) {
        super()
        this.type = 'VerbPhrase'

        // set preposition, verb and noun members
        for (const token of tokens) {
            if (Preposition.isPrepositionInstance(token)) this.preposition = token
            if (Verb.isVerbInstance(token) || VerbPhraseRule.isVerbPhraseInstance(token)) this.verb = token
            if (Noun.isNounInstance(token) || NounPhraseRule.isNounPhraseInstance(token)) this.noun = token
            if (ModalVerbPhrase.isModalVerbPhraseInstance(token)) this.modalVerb = token
        }
    }

    static isVerbPhraseInstance (token: Token): boolean {
        return token instanceof VerbPhraseRule
    }

    /**
     * Checks if an array of tokens can form a Verb Phrase.
     * @param tokens The array of tokens that will be checked.
     */
    static isVerbPhrase (tokens: Token[]): boolean {
        const tokensLen = tokens.length
        if (!this.isCorrectLength(tokensLen, 0, 3)) return false
        const [tokenA, tokenB, tokenC] = tokens

        if (tokensLen === 1) return Verb.isVerbInstance(tokenA)

        if (tokensLen === 2) {
            return (this.isVerbPhraseInstance(tokenA)) && NounPhraseRule.isNounPhraseInstance(tokenB)                 ||
                   (this.isVerbPhraseInstance(tokenB)) && NounPhraseRule.isNounPhraseInstance(tokenA)                 ||
                   (ModalVerbPhrase.isModalVerbPhraseInstance(tokenA)) && NounPhraseRule.isNounPhraseInstance(tokenB) ||
                   (ModalVerbPhrase.isModalVerbPhraseInstance(tokenB)) && NounPhraseRule.isNounPhraseInstance(tokenA)
        }

        return (this.isVerbPhraseInstance(tokenA) && NounPhraseRule.isNounPhraseInstance(tokenB) && Preposition.isPrepositionInstance(tokenC))     ||
               (this.isVerbPhraseInstance(tokenA) && Preposition.isPrepositionInstance(tokenB)   && NounPhraseRule.isNounPhraseInstance(tokenC))   ||
               (ModalVerbPhrase.isModalVerbPhraseInstance(tokenA) && Preposition.isPrepositionInstance(tokenB)  && NounPhraseRule.isNounPhraseInstance(tokenB))
    }
}

export default VerbPhraseRule
