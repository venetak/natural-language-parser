import Parser from '../index'

const parser = new Parser()
const sentence = 'the dog saw a man in the park'
const expectedAST = JSON.stringify({
    Sentence: {
        VerbPhrase: {
            VerbPhrase: {
                VerbPhrase: {
                    NounPhrase: {
                        determiner: 'the',
                        NounPhrase: {
                            noun: 'dog',
                        },
                    },
                    VerbPhrase: {
                        verb: 'saw',
                    },
                },
                NounPhrase: {
                    determiner: 'a',
                    NounPhrase: {
                        noun: 'man',
                    },
                },
            },
            preposition: 'in',
            NounPhrase: {
                determiner: 'the',
                NounPhrase: {
                    noun: 'park',
                },
            },
        },
    },
})

test(`Parses input - ${sentence}`, () => {
    const ast = parser.parse(sentence)
    expect(ast).toBe(expectedAST)
})
