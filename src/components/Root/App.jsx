// App.jsx
import Layout from "../Layout/Layout";
import { Route, Routes } from "react-router-dom";
import AddQuestion from "../AddQuestion/AddQuestion";
import "./app.scss";
import GetAllQuestions from "../GetAllQuestions/GetAllQuestions";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/add_question" element={<AddQuestion />} />
        <Route path="/get_all_questions" element={<GetAllQuestions />} />
      </Routes>
    </Layout>
  );
};

export default App;
