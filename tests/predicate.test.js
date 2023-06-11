import Adverb from '../src/grammar/rules/Adverb'
import Predicate from '../src/grammar/rules/Predicate'
import Verb from '../src/grammar/rules/Verb'
import VerbPhraseRule from '../src/grammar/rules/VerbPhraseRule'

const verbPhraseInstance = new VerbPhraseRule([new Verb('read')])
const adverbInstance = new Adverb('stopped')
const predicateInstance = new Predicate([verbPhraseInstance, adverbInstance])

// tests new Predicate(<Token>)
test(`Predicate should create Predicate instance with verbPhraseInstance and predicateInstance`, () => {
    const instance = new Predicate([verbPhraseInstance, adverbInstance])
    expect(instance.verbPhrase).toBe(verbPhraseInstance)
    expect(instance.adverb).toBe(adverbInstance)
})

// tests isPredicate(<Token>)
test(`Predicate should recognize Predicate`, () => {
    expect(Predicate.isPredicate([verbPhraseInstance, adverbInstance])).toBe(true)
})

// tests new isPredicateInstance([<token>])
test(`Predicate should recognize isPredicateInstance instance`, () => {
    expect(Predicate.isPredicateInstance(predicateInstance)).toBe(true)
})
