import React from "react";
import QuestionItem from './QuestionItem';

function QuestionList({questions, deleteQuestion, updateAnswer}) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {
          questions.map(question => {
            return (
              <QuestionItem
              key={question.id}
              question={question}
              deleteQuestion={(id) => deleteQuestion(id)}
              updateAnswer={(selectedIndex, id) => updateAnswer(selectedIndex, id)}
              />
            )
          })
        }
      </ul>
    </section>
  );
}

export default QuestionList;