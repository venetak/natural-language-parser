# Natural Language Parser in Typescript
[![Run Tests](https://github.com/venetak/natural-language-parser/actions/workflows/run-tests.yml/badge.svg?branch=main)](https://github.com/venetak/natural-language-parser/actions/workflows/run-tests.yml)

The purpose of this tool is to create an [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) from a sentence in English. You ca use the generated abstract syntax tree to analyze the semantics of the sentence and used them as input for a natural language interpreter.

# Structure

The language grammar rules is defined in [`grammar/BNF.txt`](https://github.com/venetak/natural-language-parser/blob/main/src/grammar/BNF.txt) - it in [Backus–Naur form](https://en.wikipedia.org/wiki/Backus%E2%80%93Naur_form). The actual implementation is an Object Oriented approach using TypeScript classes.

# Usage
## Setup

Install using npm:
`npm i natural-language-parser`

Import using CommonJS:
```js
const Parser = require('natural-language-parser').default
```

Create an instance:
```js
const parser = new Parser()
```

## JavaScript API

Once you've instantiated the parser you can call the parse function:
```js
const parsed = parser.parse('the dog is in the park') // will create a Rule instance
```

Use the `toHumanReadableJSON` function to create a JSON:
```js
const parsed = parser.parse('the dog is in the park')
console.log(parsed.toHumanReadableJSON())
```

This will log:
```json
{
    "Sentence": {
        "VerbPhrase": {
            "VerbPhrase": {
                "NounPhrase": {
                    "determiner": "the",
                    "noun": "dog"
                },
                "verb": "is"
            },
            "preposition": "in",
            "NounPhrase": {
                "determiner": "the",
                "noun": "park"
            }
        }
    }
}
```

## Configuration

The parser needs a dictionary in order to be able to recognize different words as verbs, nouns. prepositions etc. There is a build in dictionary that is packaged with the parser. It supports the most common English **verbs**, **nouns**, **prepositions**, **determiners** and **conjunctions**.

## A dictionary.js file
If you need to specify a custom dictionary you can create a `dictionary.js` file located in the **root of your project**:

node_modules/
index.js
**dictionary.js**
...

The dictionary file **must** contain values for all required word classes supported by the parser:
```js
module.exports = {
    nouns: ['road'],
    verbs: ['drive'],
    conjunctions: ['and'],
    prepositions: ['in'],
}
```
If some of the above listed word classes is missing the parser will use the built in dictionary.

## Custom dictionary using a config
If you want to use a dictionary from a custom-named file that is not in the root of the repo - you can use a `nlpconfig.js` file. The config file must be located in the root of the repo and it must have the **dictionaryPath** property:

```js
module.exports = {
    dictionaryPath: 'some-folder/dictionary-custom.js'
}
```



# How it Works
