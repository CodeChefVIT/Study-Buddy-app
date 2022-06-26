import { Routes, Route } from "react-router-dom";

import Signup from "./routes/signup/signup.component";
import Signin from "./routes/signin/signin.component";
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";

import "./App.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Signin />} />
      </Route>
    </Routes>
  );
}

export default App;
