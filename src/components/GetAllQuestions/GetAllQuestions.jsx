import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./GetAllQuestion.scss";

function GetAllQuestionsWithDetails() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editQuestionId, setEditQuestionId] = useState(null);
  const [editedQuestionText, setEditedQuestionText] = useState("");
  const [editedAnswerText, setEditedAnswerText] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/api/questions/all`);
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/questions/${id}`);
      setQuestions(questions.filter((question) => question.id !== id));
      toast.success("Question deleted successfully!");
    } catch (error) {
      toast.error("Error deleting question");
    }
  };

  const handleEdit = (id) => {
    setEditQuestionId(id);
    const question = questions.find((q) => q.id === id);
    setEditedQuestionText(question.questionText);
    setEditedAnswerText(question.answerText);
  };

  const handleSaveEdit = async (id) => {
    try {
      await axios.put(`${API_URL}/api/questions/${id}`, {
        questionText: editedQuestionText,
        answerText: editedAnswerText,
      });
      setEditQuestionId(null);
      toast.success("Question updated successfully!");
      window.location.reload();
    } catch (error) {
      toast.error("Error updating question");
    }
  };

  return (
    <div className="all-questions-container">
      <h2 className="q-title">All Questions</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <div>
          {questions.map((question) => (
            <div key={question.id}>
              {editQuestionId === question.id ? (
                <div className="editArea">
                  <input
                    type="text"
                    value={editedQuestionText}
                    onChange={(e) => setEditedQuestionText(e.target.value)}
                  />
                  <textarea
                    value={editedAnswerText}
                    onChange={(e) => setEditedAnswerText(e.target.value)}
                    rows={4}
                  />
                  <button className="save_btn" onClick={() => handleSaveEdit(question.id)}>
                    Save
                  </button>
                </div>
              ) : (
                <details className="question-details">
                  <summary>{question.questionText}</summary>
                  <p>{question.answerText}</p>
                  <div className="buttons">
                    <button className="delete_btn" onClick={() => handleDelete(question.id)}>
                      Delete
                    </button>
                    <button className="edit_btn" onClick={() => handleEdit(question.id)}>
                      Edit
                    </button>
                  </div>
                </details>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GetAllQuestionsWithDetails;
