import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Pages/HomePage/Homepage";
import Nav from "./Components/Nav/Nav";
import Footer from "./Components/Footer/Footer";
import CoursesPage from "./Pages/CoursesPage/CoursesPage";
import CreateCourse from "./Pages/CreateCourse/CreateCourse";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path={"/"} element={<Homepage />} />
        <Route path={"/courses"} element={<CoursesPage />} />
        <Route path={"/create-course"} element={<CreateCourse />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
