import React from 'react'
import Question from './Question'

export default function QuestionPage(props) {
    return (
        <div>
            <Question id={props.match.params.id}></Question>
        </div>
    )
}
