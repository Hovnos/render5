import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Resume from "./pages/Resume";
import ResumeSvk from "./pages/ResumeSvk";
import About from "./pages/About";

import "bootstrap/dist/css/bootstrap.min.css";
import ListHeader from "./components/ListHeader";

const App = () => {
  return (
    <div>
      <ListHeader />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resumeEng" element={<Resume />} />
          <Route path="/resumeSvk" element={<ResumeSvk />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
