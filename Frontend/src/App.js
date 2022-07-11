import { Routes, Route } from "react-router-dom";

import Signup from "./routes/signup/signup.component";
import Signin from "./routes/signin/signin.component";
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Dashboard from "./routes/dashboard/dashboard.component";
import CreateStudyGrp from "./routes/createstudygrp/createstudyprp.component";
import AddModules from "./routes/addmodule/addmodule.component";
import JoinStudyGrp from "./routes/joinstudygrp/joinstudygrp.component";
import Profile from "./routes/profile/profile.component";
import GrpDash from "./routes/grpsdashboard/grpsdashboard.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Signin />} />
      </Route>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="create-study-grp" element={<CreateStudyGrp />} />
      <Route path="addmodule" element={<AddModules />} />
      <Route path="join-study-grp" element={<JoinStudyGrp />} />
      <Route path="profile" element={<Profile />} />
      <Route path="groups/:id" element={<GrpDash />} />
    </Routes>
  );
}

export default App;
