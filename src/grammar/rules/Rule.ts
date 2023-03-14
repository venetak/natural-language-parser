type Variant = {
    [key: number]: Function
}

class Rule {
    static variants:Variant
    type: string

    static isCorrectLength (tokensLength: Number, min, max) {
        return (tokensLength <= min || tokensLength > max) ? false: true
    }

    static generateRandom () {
        const variantsLength = Object.keys(this.variants).length
        return this.variants[this.randomInt(variantsLength)]()
    }

    static randomInt (max: number): number {
        return Math.floor(Math.random() * max)
    }

    toJSON (): string {
        return JSON.stringify(this.serialize())
    }

    serialize (result = {}): object {
        const properties = Object.getOwnPropertyNames(this)
        let currentInstance = {}

        if (properties.length !== 1 || properties.length === 1 && !this[properties[0]].value) {
            result[this.type] = currentInstance
        } else {
            result = currentInstance
        }

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
