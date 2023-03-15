import Preposition from '../src/grammar/rules/PrepositionRule'

const token = 'in'
const prepositionInstance = new Preposition(token)

// tests new Preposition(<Token>)
test(`Preposition should create Preposition instance with preposition literal - "${token}"`, () => {
    const instance = new Preposition(token)
    expect(instance.value).toBe(token)
})

// tests new isPreposition(<Token>)
test(`Preposition should recognize Preposition literal - "${token}"`, () => {
    expect(Preposition.isPreposition(token)).toBe(true)
})

// tests new isPrepositionInstance(<Preposition>)
test(`Preposition should recognize Preposition instance`, () => {
    expect(Preposition.isPrepositionInstance(prepositionInstance)).toBe(true)
})
