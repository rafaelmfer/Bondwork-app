import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Rewards from "./pages/Rewards";
import Survey from "./pages/Survey";
import Users from "./pages/Users";
import Endorsement from "./pages/Endorsement";
import Management from "./pages/Management";
import Responses from "./pages/Responses";
import TopUserBar from "./components/TopUserBar/TopUserBar";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header"></header>
                <TopUserBar />
                <Sidebar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Rewards" element={<Rewards />} />
                    <Route path="/Survey" element={<Survey />} />
                    <Route path="/Users" element={<Users />} />
                    <Route path="/Endorsement" element={<Endorsement />} />
                    <Route path="/Management" element={<Management />} />
                    <Route path="/Responses" element={<Responses />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
