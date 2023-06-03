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
import ModalVerb from './src/grammar/rules/ModalVerb'
import ModalVerbPhrase from './src/grammar/rules/ModalVerbPhrase'
import Conjunction from './src/grammar/rules/Conjunction'

/**
 * @class Parser
 * Used to parse a text expression reducing it to its biding blocks - verb, noun, noun phrase etc.
 * For more information regarding the grammar - refer to the Backus-Naur definition in src/grammar/BNF.txt.
 */
class Parser {
    phrase: string
    stack: object[]

    /**
     * Check if a token is a terminal symbol - Noun, Verb, Determiner or Preposition.
     * Technically Verb and Noun can become Verb and Noun Phrases but an elementary symbol such as
     * a verb "read" must be constituted with a Verb before it could become a VerbPhrase.
     * @param token The token that will be checked
     */
    isTerminalSymbol (token: Token): Token | undefined {
        if (Determiner.isDeterminer(token)) return new Determiner(<string>token)
        if (Conjunction.isConjunction(token)) return new Conjunction(<string>token)
        if (Noun.isNoun(token)) return new Noun(<string>token)
        if (Verb.isVerb(token)) return new Verb(<string>token)
        if (Preposition.isPreposition(token)) return new Preposition(token)
        if (ModalVerb.isModalVerb(token)) return new ModalVerb(<string>token)
    }

    /**
     * Checks if an array of tokens can form a terminal symbol such as VerbPhrase.
     * @param tokens The tokens that will be checked.
     * @param stack The stack containing the tokenized text and the production items.
     */
    isNonTerminalSymbol (tokens: Token[], stack: Stack):Token | undefined {
        if (NounPhraseRule.isNounPhrase(tokens)) return new NounPhraseRule(tokens)
        if (VerbPhraseRule.isVerbPhrase(tokens)) return new VerbPhraseRule(tokens)
        if (ModalVerbPhrase.isModalVerbPhrase(tokens)) return new ModalVerbPhrase(tokens)
    }

    /**
     * Individually checks if an array of tokens form a production rule that they can be
     * replaced with.
     * @param tokens A tokenized language phrase.
     * @param stack The stack that holds the parsed and not yet parsed tokens. 
     */
    hasProduction (tokens: Token[], stack: Stack): Token | undefined {
        let production
        const firstToken = tokens[0]
        if (tokens.length === 1 && typeof firstToken === 'string') production = this.isTerminalSymbol(firstToken)
        if (!production) production = this.isNonTerminalSymbol(tokens, stack)
        return production
    }

    /**
     * Loops all stack items and see it they can be replaced with the left side of a 
     * grammar production rule - A -> ab; if the stack contains ab, it can be reduced to A.
     * @param stack The stack containing the tokenized text and the production items.
     */
    checkForProduction (stack) {
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
        if (!productionItems.length) return console.error(`No production items found. Failed to parse phrase.`)
        return productionItems[0]
    }
}

export default Parser

// const parser = new Parser()
// const parsed = parser.parse('the dog saw a man in the park')
// const parsed = parser.parse('default-car default-drive default-in default-the road')
// console.log(parsed.toHumanReadableJSON())
// new Parser().parse('the man plays dog in the movie')
