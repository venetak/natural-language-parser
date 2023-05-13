import ModalVerb from '../src/grammar/rules/ModalVerb'
import ModalVerbPhrase from '../src/grammar/rules/ModalVerbPhrase'
import Verb from '../src/grammar/rules/Verb'
import VerbPhraseRule from '../src/grammar/rules/VerbPhraseRule'

const modalVerb = 'should'
const verb = 'be'

const verbInstance = new Verb(verb)
const verbPhraseInstance = new VerbPhraseRule([verbInstance])
const modalVerbInstance = new ModalVerb(modalVerb)

// tests new ModalVerbPhrase([<Token>])
test(`ModalVerbPhrase should create ModalVerb instance with modal verb and a verb - "${modalVerb} ${verb}"`, () => {
    const instance = new ModalVerbPhrase([modalVerbInstance, verbPhraseInstance])

    expect(instance.modalVerb).toBe(modalVerbInstance)
    expect(instance.verbPhrase).toBe(verbPhraseInstance)
})

// tests isModalVerbPhrase(<Token>)
test(`ModalVerbPhrase should recognize modal verb - "${modalVerb} ${verb}"`, () => {
    expect(ModalVerbPhrase.isModalVerbPhrase([modalVerbInstance, verbPhraseInstance])).toBe(true)
})
