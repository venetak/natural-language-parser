#!/usr/bin/env node

const yargs = require('yargs')
import Parser from './parser'

yargs(process.argv.slice(2))
  .scriptName('nlp-cli')
  .command(
    'parse [sentence]',
    'parse a sentence',
    function (yargs) {
      return yargs.option('sentence', {
        alias: 's',
        describe: 'the text you wish to parse',
      })
    },
    function (argv) {
        const sentence = argv.sentence
        const instance = new Parser()

        try {
          const ast = instance.parse(sentence)
          if (ast && ast.toHumanReadableJSON) console.log(`AST readable:`, ast.toHumanReadableJSON())
          if (ast && !ast.toHumanReadableJSON) console.log(`AST:`, ast)
        } catch (error) {
          console.log(`Failed to parse ${sentence}, the following error occurred: ${error}`)
        }
    }
  )
  .demandOption('sentence', 'Please pass a text to parse!')
  .help()
  .argv
