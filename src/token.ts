import NounPhraseRule from './grammar/rules/NounPhraseRule'
import Preposition from './grammar/rules/PrepositionRule'
import SentenceRule from './grammar/rules/SentenceRule'
import VerbPhraseRule from './grammar/rules/VerbPhraseRule'
import Noun from './grammar/rules/Noun'
import Verb from './grammar/rules/Verb'
import Determiner from './grammar/rules/Determiner'

declare type Token = string | Noun | NounPhraseRule | Preposition | SentenceRule | VerbPhraseRule | Verb | Determiner

export {
    Token,
}
