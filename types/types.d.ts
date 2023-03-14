
import NounPhraseRule from '../src/grammar/rules/NounPhraseRule'
import Preposition from '../src/grammar/rules/PrepositionRule'
import SentenceRule from '../src/grammar/rules/SentenceRule'
import VerbPhraseRule from '../src/grammar/rules/VerbPhraseRule'
import Noun from '../src/grammar/rules/Noun'
import Verb from '../src/grammar/rules/Verb'
import Determiner from '../src/grammar/rules/Determiner'
import Subject from '../src/grammar/rules/Subject'

declare type Token = string | Noun | NounPhraseRule | Preposition | SentenceRule | VerbPhraseRule | Verb | Determiner | Subject
