type Variant = {
    [key: number]: Function
}

/**
 * @class Rule
 * The base class from each all rules inherit.
 * It should hold shared functionality such as serialize or utility functions like isCorrectLength.
 */
class Rule {
    static variants:Variant
    type: string

    /**
     * Check if a length is within given inclusive limits.
     * @param tokensLength The current length that will be checked.
     * @param min The lower limit.
     * @param max The upper limit.
     */
    static isCorrectLength (tokensLength: Number, min, max): boolean {
        return (tokensLength <= min || tokensLength > max) ? false: true
    }

    /**
     * A wrapper function for serialize allowing the serialized data to be parsed to JSON.
     */
    toJSON (): string {
        return JSON.stringify(this.serialize())
    }

    /**
     * Create an object of the own properties of the rule.
     * If a Rule is terminal such as Verb (where it has only a value member) - Verb { value: 'read' },
     * it is flattened to <Verb.type>: <Verb.value> pair. 
     * Instead of
     * VerbPhrase: { Verb: { value: 'reads' } }
     * it becomes:
     * VerbPhrase: { value: 'reads' }
     * @param result The parsed input - a hierarchical structure of the input, separated into
     * own entities, part of the grammar - Sentence: { VerbPhrase: {...}, NounPhrase: {...} }
     */
    serialize (result = {}): object {
        const properties = Object.getOwnPropertyNames(this)
        const length = properties.length
        const firstProp = properties[0]
        let currentInstance = {}

        // If the property is a terminal symbol - flatten the object
        if (length !== 1 || length === 1 && !this[firstProp].value) {
            result[this.type] = currentInstance
        } else {
            result = currentInstance
        }

        // recursively go through all properties
        for (const property of properties) {
            if (property === 'type') continue

            const propertyInstance = this[property]
            if (propertyInstance.value) {
                currentInstance[property] = propertyInstance.value
                continue
            }

            if (propertyInstance.type) {
                result[this.type] = currentInstance = {...currentInstance, ...propertyInstance.serialize({})}
            }
        }

        return result
    }
}

export default Rule
