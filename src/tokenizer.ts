class Tokenizer {
    static tokenize (text: string): string[] {
        return text.split(' ')
    }
}

export default Tokenizer.tokenize
