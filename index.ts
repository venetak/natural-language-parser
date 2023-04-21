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
        console.log(new Parser().parse(argv.sentence).toHumanReadableJSON())
    }
  )
  .demandOption('sentence', 'Please pass a text to parse!')
  .help()
  .argv
