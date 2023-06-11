import Adverb from '../src/grammar/rules/Adverb'

const token = 'stopped'
const adverbInstance = new Adverb(token)

// tests new Adverb(<Token>)
test(`Adverb should create Adverb instance with adverb literal - "${token}"`, () => {
    const instance = new Adverb(token)
    expect(instance.value).toBe(token)
})

// tests Adverb.isAdverb(<Token>)
test(`Adverb should recognize Adverb literal - "${token}"`, () => {
    expect(Adverb.isAdverb(token)).toBe(true)
})

// tests Adverb.isAdverbInstance(<Adverb>)
test(`Adverb should recognize isAdverbInstance instance`, () => {
    expect(Adverb.isAdverbInstance(adverbInstance)).toBe(true)
})
