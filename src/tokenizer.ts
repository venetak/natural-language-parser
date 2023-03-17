/**
 * @class Tokenizer
 * Breaks a language expression to tokens.
 */
class Tokenizer {
    /**
     * Split a text by space; create an array of tokens.
     * @param text the text that need to be tokenized.
     */
    static tokenize (text: string): string[] {
        return text.split(' ')
    }
}

export { Tokenizer }
