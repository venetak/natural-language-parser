type Dictionary = {
    nouns: string[],
    verbs: string[],
    conjunctions: string[],
    prepositions: string[],
    determiners: string[],
}

import {
    nouns,
    verbs,
    conjunctions,
    prepositions,
    determiners,
} from './default'
import * as fs from 'fs'
import * as path from 'path'

const CONFIG_FILE = 'nlpconfig.js'
const LOCAL_DICTIONARY_FILE = 'dictionary.js'
const requiredProps = [
    'nouns',
    'verbs',
    'conjunctions',
    'prepositions',
    'determiners'
]

/**
 * Check if a dictionary object has all required properties and if they are all strings.
 * @param dictionary The dictionary object that is going to be validated.
 * @param filePath The path to the dictionary file - used for logging purposes only.
 */
function isValid (dictionary: object, filePath: string): boolean {
    let isValid = true

    for (const prop of requiredProps) {
        if (!dictionary[prop]) {
            console.error(`No ${prop} property in dictionary file: ${filePath}`)
            isValid = false
            continue
        }

        if (!dictionary[prop].every(word => typeof word === 'string')) {
            console.error(`Dictionary property ${prop} must contain only strings!`)
            isValid = false
        }
    }

    return isValid
}

/**
 * Load a dictionary file by given path.
 * Validate if the file has all required properties.
 * @param filePath
 * @param next a function that will be called if the file is not valid.
 */
function loadFromFile (filePath: string, next: Function): Function | object {
    const file = require(filePath)
    if (!isValid(file, filePath)) return next()

    return file
}

/**
 * Execute a stack of functions by calling the first one and passing a next callback.
 * The currently executed function can either return a result or call next until the 
 * stack reaches the end and calls the last next. The result should be an object of 
 * dictionary descriptions - arrays of strings.
 * @param stack Array of functions.
 */
function load (stack: Function[]): object {
    let current = 0

    const next = () => {
        current++
        if (stack[current] && typeof stack[current] === 'function') return stack[current](next)
    }

    return stack[current](next)
}

/**
 * Load a dictionary from a config file.
 * If there is no config file or no dictionaryPath is specified - continue to the next load function.
 * @param next The next callback that will be called if there is no usable config.
 */
function loadFromConfig (next: Function): Function | object {
    const configFilePath = path.join(process.cwd(), CONFIG_FILE)
    const hasConfigFille = fs.existsSync(configFilePath)

    if (!hasConfigFille) return next()

    const config = require(configFilePath)
    const dictionaryFilePath = config.dictionaryPath
    if (!dictionaryFilePath) return next()

    const filePath = path.resolve(process.cwd(), dictionaryFilePath)
    return loadFromFile(filePath, next)
}

/**
 * Load a dictionary from a file that has specific reserved word name - LOCAL_DICTIONARY_FILE.
 * If the file does not contain a usable dictionary call the next load function.
 * @param next The next callback that will be called in case the local file cannot be used.
 */
function loadLocalDictionary (next: Function): Function | object {
    const dictionaryFilePath = path.join(process.cwd(), LOCAL_DICTIONARY_FILE)
    const hasDictionaryFille = fs.existsSync(dictionaryFilePath)

    if (!hasDictionaryFille) return next()

    return loadFromFile(dictionaryFilePath, next)
}

/**
 * Load the default build-in dictionary.
 * Usually used as a last resort option in case all other dictionary sources are unreliable.
 */
function loadDefault (): object {
    return {
        nouns,
        verbs,
        conjunctions,
        prepositions,
        determiners,
    }
}

export default <Dictionary>load([loadFromConfig, loadLocalDictionary, loadDefault])
