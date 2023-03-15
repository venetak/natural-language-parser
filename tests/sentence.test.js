import SentenceRule from '../src/grammar/rules/SentenceRule'
import Noun from '../src/grammar/rules/Noun'
import Verb from '../src/grammar/rules/Verb'
import VerbPhraseRule from '../src/grammar/rules/VerbPhraseRule'
import NounPhraseRule from '../src/grammar/rules/NounPhraseRule'

const verbInstance = new Verb('click')
const nounInstance = new Noun('dog')

const nounPhraseInstance = new NounPhraseRule([nounInstance])
const verbPhraseInstance = new VerbPhraseRule([verbInstance])

const sentenceInstance = new SentenceRule([verbPhraseInstance, nounPhraseInstance])

// tests SentenceRule([<VerbPhraseRule>, <NounPhraseRule>])
test('SentenceRule should create sentence rule with NounPhraseRule and VerbPhraseRule', () => {
    const instance = new SentenceRule([verbPhraseInstance, nounPhraseInstance])

    expect(instance.verbPhrase).toEqual(verbPhraseInstance)
    expect(instance.subject).toEqual(nounPhraseInstance)
})

// tests isSentence([<VerbPhraseRule>, <VerbPhraseRule>, <VerbPhraseRule>])
test('SentenceRule should not recognize sentence rule with wrong number of tokens', () => {
    expect(SentenceRule.isSentence([verbPhraseInstance, verbPhraseInstance, verbPhraseInstance])).toBe(false)
})

// tests isSentence([<VerbPhraseRule>])
test('SentenceRule should recognize sentence rule with VerbPhraseRule', () => {
    expect(SentenceRule.isSentence([verbPhraseInstance])).toBe(true)
})

// tests isSentence([<NounPhraseRule>,<VerbPhraseRule>])
test('SentenceRule should recognize sentence rule with VerbPhraseRule', () => {
    expect(SentenceRule.isSentence([nounPhraseInstance, verbPhraseInstance])).toBe(true)
})

// tests isSentence([<NounPhraseRule>,<VerbPhraseRule>])
test('SentenceRule should recognize sentence rule with VerbPhraseRule', () => {
    expect(SentenceRule.isSentence([nounPhraseInstance, verbPhraseInstance])).toBe(true)
})

// tests isSentence([<Verb>, <Noun>])
test('SentenceRule should not recognize sentence rule with Verb and Noun', () => {
    expect(SentenceRule.isSentence([verbInstance, nounInstance])).toBe(false)
})
