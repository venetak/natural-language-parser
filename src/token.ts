import NounPhraseRule from './grammar/rules/NounPhraseRule'
import Preposition from './grammar/rules/PrepositionRule'
import VerbPhraseRule from './grammar/rules/VerbPhraseRule'
import Noun from './grammar/rules/Noun'
import Verb from './grammar/rules/Verb'
import Determiner from './grammar/rules/Determiner'
import ModalVerb from './grammar/rules/ModalVerb'
import ModalVerbPhrase from './grammar/rules/ModalVerbPhrase'
import SentenceRule from './grammar/rules/SentenceRule'

declare type Token = string | Noun | NounPhraseRule | Preposition | VerbPhraseRule | Verb | Determiner | ModalVerbPhrase | ModalVerb | SentenceRule

export {
    Token,
}
