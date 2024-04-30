import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddQuestion.scss";

function AddQuestion() {
  const [questionText, setQuestionText] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://study-bot-lcbn.onrender.com/api/questions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            questionText,
            answerText,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Server responded with error status: ${response.status}`
        );
      }

      const responseData = await response.json();
      console.log("New question created:", responseData);
      setQuestionText("");
      setAnswerText("");
      setErrorMessage("");
      toast.success("Question added successfully!");
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="add-question">
      <h2>Add Question</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="questionText">Question Text:</label>
          <input
            type="text"
            id="questionText"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
        </div>
        <div>
          <label className="answer_text" htmlFor="answerText">
            Answer Text:
          </label>
          <textarea
            id="answerText"
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            rows={14}
          />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddQuestion;
