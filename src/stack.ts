import { Token } from './token'

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

export { 
    Stack,
}
