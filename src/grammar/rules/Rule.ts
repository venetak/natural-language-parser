type Variant = {
    [key: number]: Function
}

/**
 * @class Rule
 * The base class from each all rules inherit.
 * It should hold shared functionality such as serialize or utility functions like isCorrectLength.
 */
class Rule {
    type: string

    /**
     * Check if a length is within given inclusive limits.
     * @param tokensLength The current length that will be checked.
     * @param min The lower limit.
     * @param max The upper limit.
     */
    static isCorrectLength (tokensLength: Number, min, max): boolean {
        return (tokensLength <= min || tokensLength > max) ? false : true
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
    toHumanReadableObject (result = {}): object {
        const properties = Object.getOwnPropertyNames(this)
        properties.splice(properties.indexOf('type'), 1)

        const length = properties.length
        const [firstProp] = properties
        let currentInstance = {}

        // If the property is a terminal symbol - flatten the object
        if (length !== 1 || (length === 1 && !this[firstProp].value)) {
            result[this.type] = currentInstance
        } else {
            result = currentInstance
        }

        // recursively go through all properties
        for (const property of properties) {
            const propertyInstance = this[property]
            if (propertyInstance.value) {
                currentInstance[property] = propertyInstance.value
                continue
            }

            if (propertyInstance.type) {
                result[this.type] = currentInstance = { ...currentInstance, ...propertyInstance.toHumanReadableObject({}) }
            }
        }

        return result
    }

    /**
     * Create a JSON object of the rule
     */
    toJSON (): string {
        return JSON.stringify(this)
    }

    /**
     * Create a JSON of the flattened object of the rule's own properties.
     */
    toHumanReadableJSON (): string {
        return JSON.stringify(this.toHumanReadableObject())
    }
}

export default Rule
