import Parser from '../parser'

const parser = new Parser()
const sentence = 'the dog saw a man in the park'
const modalVerbSentence = 'the dog should be in the park'
const expectedFlattenedAST = JSON.stringify({
    'VerbPhrase': {
        'VerbPhrase': {
            'VerbPhrase': {
                'NounPhrase': {
                    'determiner': 'the',
                    'noun': 'dog',
                },
                'verb': 'saw',
            },
            'NounPhrase': {
                'determiner': 'a',
                'noun': 'man',
            },
        },
        'preposition': 'in',
        'NounPhrase': {
            'determiner': 'the',
            'noun': 'park',
        },
    },
})

const expectedFlattenedModalVerbAST = JSON.stringify({
    VerbPhrase: {
        VerbPhrase: {
            NounPhrase: {
                determiner: 'the',
                noun: 'dog',
            },
            ModalVerbPhrase: {
                modalVerb: 'should',
                verb: 'be',
            },
        },
        preposition: 'in',
        NounPhrase: {
            determiner: 'the',
            noun: 'park',
        },
    },
})

test(`Parses input and formats to flattened JSON - ${sentence}`, () => {
    const ast = parser.parse(sentence).toHumanReadableJSON()
    expect(ast).toBe(expectedFlattenedAST)
})

test(`Parses sentence that has modal verb - ${modalVerbSentence}`, () => {
    const ast = parser.parse(modalVerbSentence).toHumanReadableJSON()
    expect(ast).toBe(expectedFlattenedModalVerbAST)
})
