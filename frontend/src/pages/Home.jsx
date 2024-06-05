import React from "react";
import PopUpOneBtn from "../components/PopUpOneBtn";
import PopUpTwoBtn from "../components/PopUpTwoBtn";
import { useState } from "react";

const Home = () => {
    const [buttonOnePopup, setButtonOnePopup] = useState(false);
    const [buttonTwoPopup, setButtonTwoPopup] = useState(false);

    // Set callback function to interact with the data base
    const handleDelete = () => {
        console.log("Deleted from db");
    };
    const handleSaveDraft = () => {
        console.log("Saved to db");
    };
    // -------------------------------------------

    return (
        <main className="grid content-center bg-gray-800 min-h-80">
            <h2>Home</h2>
            <div className="deleteMe text-white">
                <h3>The great Greek grape growers grow great Greek grapes</h3>
                <div className="deleteMe flex gap-2 justify-center">
                    <button
                        className="deleteMe inline-block bg-black text-white rounded-lg px-2 py-2 hover:bg-gray-700"
                        onClick={() => setButtonOnePopup(true)}
                    >
                        Test One
                    </button>
                    <button
                        className="deleteMe inline-block bg-black text-white rounded-lg px-2 py-2 hover:bg-gray-700"
                        onClick={() => setButtonTwoPopup(true)}
                    >
                        Test Two
                    </button>
                </div>
                <PopUpOneBtn
                    trigger={buttonOnePopup}
                    setTrigger={setButtonOnePopup}
                >
                    <h3>Rewards Request Approved</h3>
                    <div className="w-8 h-8 rounded-full bg-green-700 m-auto"></div>
                    <p>
                        Employees will be notified on their rewards request
                        update.
                    </p>
                </PopUpOneBtn>
                <PopUpTwoBtn
                    trigger={buttonTwoPopup}
                    setTrigger={setButtonTwoPopup}
                    btnOneText="Delete"
                    btnOneOnClick={handleDelete}
                    btnTwoText="Save Draft"
                    btnTwoOnClick={handleSaveDraft}
                >
                    <div className="toDo bg-gray-500">Icon</div>
                    <h3>Cancel Survey</h3>

                    <p>Are you sure you want to cancel this survey?</p>
                </PopUpTwoBtn>
            </div>
        </main>
    );
};

export default Home;
