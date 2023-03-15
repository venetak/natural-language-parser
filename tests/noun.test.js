import Noun from '../src/grammar/rules/Noun'

const token = 'dog'
const nounInstance = new Noun(token)

// tests new Noun(<Token>)
test(`Noun should create Noun instance with noun literal - "${token}"`, () => {
    const instance = new Noun(token)
    expect(instance.value).toBe(token)
})

// tests new isNoun(<Token>)
test(`Noun should recognize noun literal - "${token}"`, () => {
    expect(Noun.isNoun(token)).toBe(true)
})

// tests new isNounInstance(<Noun>)
test(`Noun should recognize Noun instance`, () => {
    expect(Noun.isNounInstance(nounInstance)).toBe(true)
})
