# Natural Language Parser in Typescript
[![Run Tests](https://github.com/venetak/natural-language-parser/actions/workflows/run-tests.yml/badge.svg?branch=main)](https://github.com/venetak/natural-language-parser/actions/workflows/run-tests.yml)

The purpose of this tool is to create an [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) from a sentence in English. You ca use the generated abstract syntax tree to analyze the semantics of the sentence and use them as an input for a natural language interpreter.

# Structure

The rules that describe the language grammar are defined in [grammar/BNF.txt](https://github.com/venetak/natural-language-parser/blob/main/src/grammar/BNF.txt) - using the [Backus–Naur metasyntax](https://en.wikipedia.org/wiki/Backus%E2%80%93Naur_form). The actual implementation utilizes OOP principals using TypeScript classes.

# Usage
## Setup

Install using npm:
```
npm i natural-language-parser
```

Import using [CommonJS](https://nodejs.org/docs/latest/api/modules.html) and create a instance:
```js
const Parser = require('natural-language-parser').default
const parser = new Parser()
const parsed = parser.parse('the dog is in the park') // will create a Rule instance
```

## JavaScript API

Import the parser using [CommonJS](https://nodejs.org/docs/latest/api/modules.html):

```js
const Parser = require('natural-language-parser').default
```

### parserInstance.parse()
The parse function creates a Rule instance that contains all matched sentence parts as properties:
```js
const parsed = parser.parse('the dog is in the park')
```
outputs an object with the following structure:
```js
verbPhrase: VerbPhraseRule {
  type: 'VerbPhrase',
  verb: VerbPhraseRule {
    type: 'VerbPhrase',
    noun: [NounPhraseRule],
    verb: [VerbPhraseRule]
  },
  preposition: [Preposition],
  noun: NounPhraseRule {
    type: 'NounPhrase',
    determiner: [Determiner],
    noun: [NounPhraseRule]
  }
}
```
### parsed.toHumanReadableJSON()
Use the `toHumanReadableJSON` function to create a JSON:
```js
const parsed = parser.parse('the dog is in the park')
console.log(parsed.toHumanReadableJSON())
```
outputs a JSON object with simplified structure:
```json
{
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
```

## CLI

Use the `nlp-cli` command to parse a sentence:

![cli usage](https://github.com/venetak/natural-language-parser/blob/main/img/cli.PNG?raw=true)

` nlp-cli parse -s "the balrog sleeps in Moria"`

will produce:

```json
{
    "VerbPhrase": {
        "VerbPhrase": {
            "NounPhrase": {
                "determiner": "the",
                "noun": "balrog"
            },
            "verb": "sleeps"
        },
        "preposition": "in",
        "noun": "Moria"
    }
}
```

# Configuration

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
    determiners: ['the'],
    modalVerbs: ['should'],
}
```
<mark>If some of the above listed word classes is missing the parser will use the built in dictionary.</mark>

## Custom dictionary file using a config
If you want to use a dictionary from a custom-named file that is not in the root of the repo - you can use a `nlpconfig.js` file. The config file must be located in the root of the repo and it must have the **dictionaryPath** property:

```js
module.exports = {
    dictionaryPath: 'some-folder/dictionary-custom.js'
}
```

# How it Works

The parser accepts text written in English, breaks it down to its building components and builds a syntax tree representing the hierarchical structure of the sentence.

![syntax tree](https://github.com/venetak/natural-language-parser/blob/main/img/tree.PNG?raw=true)

It separates the input into tokens - this process is called tokenization. Then recursively checks if the tokens can be substituted with items from the grammar's set - this is called production. The production rules are defined in the grammar of the parser. For example a noun phrase is made up of a determiner and and a noun - "The sun" - `NP -> D N`. A verb phrase is made up of a verb and a noun phrase - "The sun rises" - `VP -> V NP | NP V`. Once there are no more possible productions the parser stops and outputs the result. It uses a bottom up(shift-reduce) parsing algorithm - pushes the next word of the input sentence to a stack(the shift operation) and checks if a sequence of tokens corresponds to the right hand of a production rule and substitutes it with the left hand side if that rule(called the reduce phase) - will reduce `V NP` to `VP`:

![parsing steps](https://github.com/venetak/natural-language-parser/blob/main/img/parsing_steps.PNG?raw=true)