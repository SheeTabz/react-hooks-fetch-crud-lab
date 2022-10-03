

import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);
  const [uponQuestionsChange, setUponQuestionsChange] = useState(false);

  const url = 'http://localhost:4000/questions';

  const updateQuestions = (newQuestion) => {
    setUponQuestionsChange(prev => !prev);
  }

  const deleteQuestion = (id) => {
    fetch(`${url}/${id}`, {method: 'DELETE'})
    .then(res => res.json())
    .catch(err => console.log(err));
    setUponQuestionsChange(prev => !prev);
  }

  const updateAnswer = (selectedIndex, id) => {
    fetch(`${url}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({correctIndex: selectedIndex})
    })
    .then(res => res.json());
    setUponQuestionsChange(prev => !prev);
  }

  useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then(res => setQuestions(res));
  }, [uponQuestionsChange]);

  
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {
        page === "Form" ?
        <QuestionForm
          updateQuestions={updateQuestions}
          url={url}
        />
        :
        <QuestionList
          questions={questions}
          deleteQuestion={deleteQuestion}
          updateAnswer={updateAnswer}
        />
      }
    </main>
  );
}

export default App;
