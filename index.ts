import SentenceRule from './src/grammar/rules/SentenceRule'
import Noun from './src/grammar/rules/Noun'
import NounPhraseRule from './src/grammar/rules/NounPhraseRule'
import Verb from './src/grammar/rules/Verb'
import VerbPhraseRule from './src/grammar/rules/VerbPhraseRule'
import Preposition from './src/grammar/rules/PrepositionRule'
import Determiner from './src/grammar/rules/Determiner'

import { Token } from './src/token'
import { Stack } from './src/stack'

import { Tokenizer } from './src/tokenizer'
import Rule from './src/grammar/rules/Rule'

/**
 * @class Parser
 * Used to parse a text expression reducing it to its biding blocks - verb, noun, noun phrase etc.
 * For more information regarding the grammar - refer to the Backus-Naur definition in src/grammar/BNF.txt.
 */
class Parser {
    phrase: string
    stack: object[]

    /**
     * Individually checks if an array of tokens form a production rule that they can be
     * replaced with.
     * @param tokens A tokenized language phrase.
     * @param stack The stack that holds the parsed and not yet parsed tokens. 
     */
    hasProduction (tokens: Token[], stack: Stack) {
        if (Determiner.isDeterminer(tokens[0])) return new Determiner(<string>tokens[0])

        if (Noun.isNoun(tokens[0])) return new Noun(<string>tokens[0])
        if (NounPhraseRule.isNounPhrase(tokens)) return new NounPhraseRule(tokens)

        if (Verb.isVerb(tokens[0])) return new Verb(<string>tokens[0])
        if (VerbPhraseRule.isVerbPhrase(tokens)) return new VerbPhraseRule(tokens)

        if (Preposition.isPreposition(tokens[0])) return new Preposition(tokens[0])

        if (!stack.tokens.length && SentenceRule.isSentence(tokens)) return new SentenceRule(tokens)
    }

    /**
     * Loops all stack items and see it they can be replaced with the left side of a 
     * grammar production rule - A -> ab; if the stack contains ab, it can be reduced to A.
     * @param stack The stack containing the tokenized text and the production items.
     */
    checkForProduction(stack) {
        const stackLength = stack.items.length
        const beginning = 0
        let i = beginning

        while (stack.items[i]) {
            i += 1
            const production = this.hasProduction(stack.items.slice(beginning, i).reverse(), stack)
            if (!production) continue

            stack.reduce(beginning, i, production)
            this.checkForProduction(stack)
        }
    }

    /**
     * Starts the parsing process by tokenizing the input phrase and
     * initializing the stack.
     * @param phrase The input text.
     */
    parse (phrase: string) {
        const tokens = Tokenizer.tokenize(phrase)
        const stack = new Stack(tokens)

        this.shiftReduce(stack)
        return this.format(stack.items)
    }

    /**
     * Does a shift operation, check if a production is possible and then
     * recursively executes itself until the stack hah no items.
     * @param stack The stack containing the tokenized input text and the production items.
     */
    shiftReduce (stack: Stack) {
        if (!stack.tokens.length) return

        stack.shift()
        this.checkForProduction(stack)
        this.shiftReduce(stack)
    }

    /**
     * Checks if there is a production item and formats it to JSON.
     * @param productionItems The array of production items; the result of the parse.
     */
    format (productionItems) {
        if (!productionItems.length) return console.error(`No production items found. Failed to parse phrase: `)
        return <Rule>productionItems[0].toJSON()
    }
}

export default Parser

const parser = new Parser()
const parsed = parser.parse('the dog')
console.log(parsed)
// new Parser().parse('the man plays dog in the movie')
