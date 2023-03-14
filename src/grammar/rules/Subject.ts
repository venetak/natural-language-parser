import Rule from './Rule'
import { Token } from '../../token'
import NounPhraseRule from './NounPhraseRule'

class Subject extends Rule {
    nounPhrase: NounPhraseRule

    constructor (token: Token) {
        super()

        this.type = 'Subject'
        this.nounPhrase = <NounPhraseRule>token
    }

    static isSubject (token: Token) {
        return token instanceof NounPhraseRule
    }

    static isSubjectInstance (token: Token) {
        return token instanceof Subject
    }
}

export default Subject
