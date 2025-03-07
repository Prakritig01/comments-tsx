import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./components/Search";
import Results from "@/components/Result";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/result" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
