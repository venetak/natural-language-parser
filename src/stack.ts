import { Token } from './token'

/**
 * @class Stack
 * Holds the tokenized language phrase in its tokens member.
 * It can move the tokens one by one in order to make it easier to check
 * if production is possible.
 * It can replace item(s) from the tokens with production items.
 * 
 * Uses Array.shift and Array.unshift to implement Shift and Reduce in the
 * context of a shift-reduce parser - https://en.wikipedia.org/wiki/Shift-reduce_parser#Tree_building_steps
 */
class Stack {
    tokens: Token[]
    items: Token[]

    /**
     * Initialize a Stack instance.
     * @param tokens A tokenized language phrase.
     */
    constructor (tokens: Token[]) {
        this.tokens = tokens
        this.items = []
    }

    /**
     * Takes the token at the top of the stack and moves it to the items array
     * so that it could be checked for production.
     */
    shift (): void {
        const tokenAtTop = this.tokens.shift()
        this.items.unshift(tokenAtTop)
    }

    /**
     * Replaces token(s) from the stack items with production items.
     * @param start The index of the first token to be replaced.
     * @param end The index of the last token to be replaced.
     * @param replacement The production item that will replace the tokens.
     */
    reduce (start, end, replacement: Token): void {
        this.items.splice(start, end, replacement)
    }
}

export { Stack }
