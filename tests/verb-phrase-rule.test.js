import Verb from '../src/grammar/rules/Verb'
import Noun from '../src/grammar/rules/Noun'
import Preposition from '../src/grammar/rules/PrepositionRule'

import VerbPhraseRule from '../src/grammar/rules/VerbPhraseRule'
import NounPhraseRule from '../src/grammar/rules/NounPhraseRule'

const verbInstance = new Verb('click')
const nounInstance = new Noun('dog')
const prepositionInstance = new Preposition('in')

const nounPhraseInstance = new NounPhraseRule([nounInstance])
const verbPhraseInstance = new VerbPhraseRule([verbInstance, nounPhraseInstance])

// tests isVerbPhrase([<Preposition>, <VerbPhraseRule>, <Preposition>, <Preposition>])
test(`VerbPhraseRule should not recognize VerbPhraseRule with wrong number of tokens`, () => {
    expect(VerbPhraseRule.isVerbPhrase([prepositionInstance, verbPhraseInstance, prepositionInstance, prepositionInstance])).toBe(false)
})

// tests isVerbPhrase([<Verb>, <NounPhraseRule>])
test(`VerbPhraseRule should recognize VerbPhraseRule with Verb and NounPhraseRule`, () => {
    expect(VerbPhraseRule.isVerbPhrase([verbInstance, nounPhraseInstance])).toBe(true)
})

// tests isVerbPhrase([<NounPhraseRule>, <Verb>])
test(`VerbPhraseRule should recognize VerbPhraseRule with NounPhraseRule and Verb`, () => {
    expect(VerbPhraseRule.isVerbPhrase([nounPhraseInstance, verbInstance])).toBe(true)
})

// tests isVerbPhrase([<VerbPhraseRule>, <NounPhraseRule>])
test(`VerbPhraseRule should recognize VerbPhraseRule with VerbPhraseRule and NounPhraseRule`, () => {
    expect(VerbPhraseRule.isVerbPhrase([verbPhraseInstance, nounPhraseInstance])).toBe(true)
})

// tests isVerbPhrase([<NounPhraseRule>, <VerbPhraseRule>])
test(`VerbPhraseRule should recognize VerbPhraseRule with NounPhraseRule and VerbPhraseRule`, () => {
    expect(VerbPhraseRule.isVerbPhrase([nounPhraseInstance, verbPhraseInstance])).toBe(true)
})

// tests isVerbPhrase([Verb, <NounPhraseRule>, <Preposition>])
test(`VerbPhraseRule should recognize VerbPhraseRule with Verb, NounPhraseRule and Preposition`, () => {
    expect(VerbPhraseRule.isVerbPhrase([verbInstance, nounPhraseInstance, prepositionInstance])).toBe(true)
})

// tests isVerbPhrase([VerbPhraseRule, <NounPhraseRule>, <Preposition>])
test(`VerbPhraseRule should recognize VerbPhraseRule with VerbPhraseRule, NounPhraseRule and Preposition`, () => {
    expect(VerbPhraseRule.isVerbPhrase([verbPhraseInstance, nounPhraseInstance, prepositionInstance])).toBe(true)
})

// tests isVerbPhrase([VerbPhraseRule, <Preposition>, <NounPhraseRule>])
test(`VerbPhraseRule should recognize VerbPhraseRule with VerbPhraseRule, Preposition and NounPhraseRule`, () => {
    expect(VerbPhraseRule.isVerbPhrase([verbPhraseInstance, prepositionInstance, nounPhraseInstance])).toBe(true)
})

// tests isVerbPhrase([VerbPhraseRule, <VerbPhraseRule>])
test(`VerbPhraseRule should not recognize VerbPhraseRule with VerbPhraseRule twice`, () => {
    expect(VerbPhraseRule.isVerbPhrase([verbPhraseInstance, verbPhraseInstance])).toBe(false)
})

// tests isVerbPhrase([<Preposition>, <VerbPhraseRule>])
test(`VerbPhraseRule should not recognize VerbPhraseRule with Preposition at the start`, () => {
    expect(VerbPhraseRule.isVerbPhrase([verbPhraseInstance, verbPhraseInstance])).toBe(false)
})
