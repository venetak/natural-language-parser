import Parser from '../index'

const parser = new Parser()
const sentence = 'the dog saw a man in the park'
const expectedFlattenedAST = JSON.stringify({
    'Sentence': {
        'VerbPhrase': {
            'VerbPhrase': {
                'VerbPhrase': {
                    'NounPhrase': {
                        'determiner': 'the',
                        'noun': 'dog'
                    },
                    'verb': 'saw'
                },
                'NounPhrase': {
                    'determiner': 'a',
                    'noun': 'man'
                }
            },
            'preposition': 'in',
            'NounPhrase': {
                'determiner': 'the',
                'noun': 'park'
            }
        }
    }
})

test(`Parses input and formats to flattened JSON - ${sentence}`, () => {
    const ast = parser.parse(sentence).toHumanReadableJSON()
    expect(ast).toBe(expectedFlattenedAST)
})
