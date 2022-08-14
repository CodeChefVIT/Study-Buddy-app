import { Routes, Route } from "react-router-dom";

import Signup from "./routes/signup/signup.component";
import Signin from "./routes/signin/signin.component";
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Verified from "./routes/verified/verified.component";
import Dashboard from "./routes/dashboard/dashboard.component";
import CreateStudyGrp from "./routes/createstudygrp/createstudygrp.component";
import JoinStudyGrp from "./routes/joinstudygrp/joinstudygrp.component";
import Profile from "./routes/profile/profile.component";
import Group from "./routes/group/group.component";
import GrpDash from "./routes/grpsdashboard/grpsdashboard.component";
import GrpInvites from "./routes/grpinvites/grpinvites.component";
import GrpMembers from "./routes/grpmember/grpmember.component";
import CreateQuiz from "./routes/createquiz/createquiz.component";
import ViewQuizes from "./routes/view-quizes/view-quizes.component";
import AttemptQuiz from "./routes/attempt-quiz/attempt-quiz.component";
import ForgotPass from "./routes/forgotPass/forgotpass.component";
import ResetPassEmail from "./routes/reset-password/reset-password.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Signin />} />
        <Route path="verified" element={<Verified />} />
        <Route path="user/forgotPassword" element={<ForgotPass />} />
        <Route path="user/reset/:id/:id" element={<ResetPassEmail />} />
      </Route>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="create-study-grp" element={<CreateStudyGrp />} />
      <Route path="join-study-grp" element={<JoinStudyGrp />} />
      <Route path="profile" element={<Profile />} />
      <Route path="groups/:id/set" element={<Group />} />
      <Route path="groups/:id" element={<GrpDash />} />
      <Route path="groups/:id/request" element={<GrpInvites />} />
      <Route path="groups/:id/members" element={<GrpMembers />} />
      <Route path="groups/:id/quiz/new" element={<CreateQuiz />} />
      <Route path="groups/:id/quiz/" element={<ViewQuizes />} />
      <Route path="groups/quiz/attempt/:quizId" element={<AttemptQuiz />} />
    </Routes>
  );
}

export default App;
