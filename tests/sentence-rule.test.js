import VerbPhraseRule from '../src/grammar/rules/VerbPhraseRule'
import Verb from '../src/grammar/rules/Verb'
import Noun from '../src/grammar/rules/Noun'
import Preposition from '../src/grammar/rules/PrepositionRule'
import NounPhraseRule from '../src/grammar/rules/NounPhraseRule'
import ModalVerbPhrase from '../src/grammar/rules/ModalVerbPhrase'
import Determiner from '../src/grammar/rules/Determiner'
import Conjunction from '../src/grammar/rules/Conjunction'
import SentenceRule from '../src/grammar/rules/SentenceRule'
import ModalVerb from '../src/grammar/rules/ModalVerb'


const modalVerbPhrase = new ModalVerbPhrase([new ModalVerb('should'), new Conjunction('not'), new VerbPhraseRule([new Verb('pass')])])
const verbPhraseInstanceA = new VerbPhraseRule([new NounPhraseRule([new Determiner('the'), new Noun('balrog')]), modalVerbPhrase])
const verbPhraseInstanceB = new VerbPhraseRule([new VerbPhraseRule([new Verb('sleeps')]), new Preposition('in'), new NounPhraseRule([new Noun('Moria')])])

const conjunctionInstance = new Conjunction('and')

const expectedJSON = JSON.stringify({'conjunction':'and','verbPhraseA':{'VerbPhrase':{'NounPhrase':{'determiner':'the','noun':'balrog'},'ModalVerbPhrase':{'modalVerb':'should','conjunction':'not','verb':'pass'}}},'verbPhraseC':{'VerbPhrase':{'verb':'sleeps','preposition':'in','noun':'Moria'}}})


// tests new Sentence([<VerbPhraseRule>, <Conjunction>, <VerbPhraseRule>])
test(`SentenceRule should create Sentence instance`, () => {
    const instance = new SentenceRule ([verbPhraseInstanceA, conjunctionInstance, verbPhraseInstanceB])

    expect(instance.verbPhraseA).toBe(verbPhraseInstanceA)
    expect(instance.verbPhraseC).toBe(verbPhraseInstanceB)
    expect(instance.conjunction).toBe(conjunctionInstance)
})

test(`SentenceRule should output correct human readable object`, () => {
    const instance = new SentenceRule ([verbPhraseInstanceA, conjunctionInstance, verbPhraseInstanceB])

    expect(instance.toHumanReadableJSON()).toBe(expectedJSON)
})
