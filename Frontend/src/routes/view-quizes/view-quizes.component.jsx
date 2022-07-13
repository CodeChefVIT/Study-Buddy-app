/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Navigation from "../navigation/navigation.component";
import NavigationAuth from "./../navigation-auth/navigation-auth.component";
import ViewQuizesCard from "./../../components/view-quizes-card/view-quizes-card.component";
import Footer from "./../footer/footer.component";
import SearchBox from "../../components/search-box/search-box.component";

import "./view-quizes.styles.css";

const ViewQuiz = () => {
  const navigate = useNavigate();
  const [quizes, setQuizes] = useState([]);

  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  };
  const path = usePathname();
  // console.log(path);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    fetch(`https://study-buddy-app-production.up.railway.app/api/v1${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then(({ data }) => setQuizes(data));
  }, []);

  return (
    <div>
      {localStorage.getItem("token") ? <NavigationAuth /> : <Navigation />}
      <section className="quizes">
        <div className="quizes-title">
          <h1 className="heading-primary-sm">Find Quizes</h1>
        </div>
        <div className="quiz-container">
          {quizes &&
            quizes.map((quiz) => {
              return <ViewQuizesCard key={quiz.id} quiz={quiz} />;
            })}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ViewQuiz;
