import Verb from '../src/grammar/rules/Verb'

const token = 'click'
const verbInstance = new Verb(token)

// tests new Verb(<Token>)
test(`Verb should create Verb instance with verb literal - "${token}"`, () => {
    const instance = new Verb(token)
    expect(instance.value).toBe(token)
})

// tests new isVerb(<Token>)
test(`isVerb should recognize verb literal - "${token}"`, () => {
    expect(Verb.isVerb(token)).toBe(true)
})

// tests new isVerbInstance(<Verb>)
test(`Verb should recognize Verb instance`, () => {
    expect(Verb.isVerbInstance(verbInstance)).toBe(true)
})
