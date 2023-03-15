import Determiner from '../src/grammar/rules/Determiner'

const token = 'an'
const determinerInstance = new Determiner(token)

// tests new Determiner(<Token>)
test(`Determiner should create Determiner instance with determiner literal - "${token}"`, () => {
    const instance = new Determiner(token)
    expect(instance.value).toBe(token)
})

// tests new isDeterminer(<Token>)
test(`Determiner should recognize Determiner literal - "${token}"`, () => {
    expect(Determiner.isDeterminer(token)).toBe(true)
})

// tests new isDeterminerInstance(<Determiner>)
test(`Determiner should recognize Determiner instance`, () => {
    expect(Determiner.isDeterminerInstance(determinerInstance)).toBe(true)
})
