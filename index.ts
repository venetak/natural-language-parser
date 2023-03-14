/// <reference path="./types/types.d.ts" />
import NounPhraseRule from './src/grammar/rules/NounPhraseRule'
import Noun from './src/grammar/rules/Noun'
import Preposition from './src/grammar/rules/PrepositionRule'
import SentenceRule from './src/grammar/rules/SentenceRule'
import VerbPhraseRule from './src/grammar/rules/VerbPhraseRule'
import Verb from './src/grammar/rules/Verb'
import tokenize from './src/tokenizer'
import Determiner from './src/grammar/rules/Determiner'
import Subject from './src/grammar/rules/Subject'
import Rule from './src/grammar/rules/Rule'
import { Token } from './src/token'

class Stack {
    tokens: Token[]
    items: Token[]

    constructor (tokens: Token[]) {
        this.tokens = tokens
        this.items = []
    }

    shift (word) {
        this.tokens.shift()
        return this.items.unshift(word)
    }

    reduce (start, end, replacement: Token) {
        this.items.splice(start, end, replacement)
    }
}

class Parser {
    phrase: string
    stack: object[]

    hasProduction (tokens: Token[], stack) {
        if (Determiner.isDeterminer(tokens[0])) return new Determiner(<string>tokens[0])

        if (Noun.isNoun(tokens[0])) return new Noun(<string>tokens[0])
        if (NounPhraseRule.isNounPhrase(tokens)) return new NounPhraseRule(tokens)

        if (Verb.isVerb(tokens[0])) return new Verb(<string>tokens[0])
        if (VerbPhraseRule.isVerbPhrase(tokens)) return new VerbPhraseRule(tokens)

        if (Preposition.isPreposition(tokens[0])) return new Preposition(tokens[0])

        // if (Subject.isSubject(tokens[0])) return new Subject(<NounPhraseRule>tokens[0])
        if (!stack.tokens.length && SentenceRule.isSentence(tokens)) return new SentenceRule(tokens)
    }

    checkForProduction (stack) {
        const stackLength = stack.items.length
        const beginning = 0
        let i = beginning

        do {
            i += 1
            const production = this.hasProduction(stack.items.slice(beginning, i).reverse(), stack)
            if (!production) continue

            stack.reduce(beginning, i, production)
            this.checkForProduction(stack)
        } while (i !== stackLength)
    }

    parse (phrase: string) {
        const tokens = tokenize(phrase)
        const stack = new Stack(tokens)

        this.shiftReduce(stack)
    }

    shiftReduce (stack: Stack) {
        if (!stack.tokens.length) {
            console.log((<Rule>(stack.items[0])).toJSON())
            return
        }

        stack.shift(stack.tokens[0])
        this.checkForProduction(stack)
        this.shiftReduce(stack)
    }
}

new Parser().parse('the dog saw a man in the park')
