import SentenceRule from './src/grammar/rules/SentenceRule'
import Noun from './src/grammar/rules/Noun'
import NounPhraseRule from './src/grammar/rules/NounPhraseRule'
import Verb from './src/grammar/rules/Verb'
import VerbPhraseRule from './src/grammar/rules/VerbPhraseRule'
import Preposition from './src/grammar/rules/PrepositionRule'
import Determiner from './src/grammar/rules/Determiner'

import { Token } from './src/token'
import { Stack } from './src/stack'

import tokenize from './src/tokenizer'
import Rule from './src/grammar/rules/Rule'

class Parser {
    phrase: string
    stack: object[]

    hasProduction (tokens: Token[], stack: Stack) {
        if (Determiner.isDeterminer(tokens[0])) return new Determiner(<string>tokens[0])

        if (Noun.isNoun(tokens[0])) return new Noun(<string>tokens[0])
        if (NounPhraseRule.isNounPhrase(tokens)) return new NounPhraseRule(tokens)

        if (Verb.isVerb(tokens[0])) return new Verb(<string>tokens[0])
        if (VerbPhraseRule.isVerbPhrase(tokens)) return new VerbPhraseRule(tokens)

        if (Preposition.isPreposition(tokens[0])) return new Preposition(tokens[0])

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
            // TODO: stack.length changes; update the condition to avoid redundant iterations!
        } while (i !== stackLength)
    }

    parse (phrase: string) {
        const tokens = tokenize(phrase)
        const stack = new Stack(tokens)

        this.shiftReduce(stack)
        return (<Rule>stack.items[0]).toJSON()
    }

    shiftReduce (stack: Stack) {
        // TODO: error handling
        if (!stack.tokens.length) return

        stack.shift(stack.tokens[0])
        this.checkForProduction(stack)
        this.shiftReduce(stack)
    }
}

export default Parser

// new Parser().parse('the dog saw a man in the park')
// new Parser().parse('the man plays dog in the movie')
