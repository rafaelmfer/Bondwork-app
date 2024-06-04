import "./App.css";
import { useState } from "react";
import PopUpOneBtn from "./components/PopUpOneBtn";

function App() {
    const [buttonPopup, setButtonPopup] = useState(false);

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Say "First thing first" fast
                </p>
                <button className="deleteMe" onClick={()=>setButtonPopup(true)}>
                    Test PopUp
                </button>
                <PopUpOneBtn trigger={buttonPopup} setTrigger={setButtonPopup}>
                    <h3>Rewards Request Approved</h3>
                    <div className="toDo" style={{width:'80px',height:'80px',borderRadius:'50%',backgroundColor:"#4b9f6e",margin:'auto'}}></div>
                    <p>Employees will be notified on their rewards request update.</p>
                </PopUpOneBtn>
            </header>

        </div>
    );
}

export default App;
