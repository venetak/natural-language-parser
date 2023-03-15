import NounPhraseRule from '../src/grammar/rules/NounPhraseRule'
import Noun from '../src/grammar/rules/Noun'
import Determiner from '../src/grammar/rules/Determiner'

const nounInstance = new Noun('dog')
const nounPhraseInstance = new NounPhraseRule([nounInstance])
const determinerInstance = new Determiner('an')

// tests new NounPhraseRule([<Noun>])
test(`NounPhraseRule should create noun phrase with one Noun instance token`, () => {
    const instance = new NounPhraseRule([nounInstance])

    expect(instance.noun).toEqual(nounInstance)
    expect(instance.determiner).toBeUndefined()
})

// test new NounPhraseRule([<NounPhraseRule>])
test(`NounPhraseRule should create noun phrase with one NounPhraseRule instance`, () => {
    const instance = new NounPhraseRule([nounPhraseInstance])

    expect(instance.noun).toEqual(nounPhraseInstance)
    expect(instance.determiner).toBeUndefined()
})

// test new NounPhraseRule([<Determiner>, <NounPhraseRule>])
test(`NounPhraseRule should create noun phrase with Determiner instance and NounPhrase instance `, () => {
    const instance = new NounPhraseRule([determinerInstance, nounPhraseInstance])

    expect(instance.noun).toEqual(nounPhraseInstance)
    expect(instance.determiner).toEqual(determinerInstance)
})

// tests isNounPhrase([<nounInstance>, <nounInstance>, <nounInstance>])
test(`NounPhraseRule should not recognize NounPhraseRule with wrong number of tokens`, () => {
    expect(NounPhraseRule.isNounPhrase([nounInstance, nounInstance, nounInstance])).toBe(false)
})

// tests isNounPhrase([<Noun>]))
test(`NounPhraseRule should recognize noun phrase with Noun instance `, () => {
    expect(NounPhraseRule.isNounPhrase([nounInstance])).toEqual(true)
})

// tests isNounPhrase([<Determiner>, <Noun>]))
test(`NounPhraseRule should recognize noun phrase with Determiner instance and Noun instance `, () => {
    expect(NounPhraseRule.isNounPhrase([determinerInstance, nounInstance])).toEqual(true)
})

// tests isNounPhrase([<Determiner>, <NounPhraseRule>]))
test(`NounPhraseRule should recognize noun phrase with Determiner instance and NounPhrase instance `, () => {
    expect(NounPhraseRule.isNounPhrase([determinerInstance, nounPhraseInstance])).toEqual(true)
})
