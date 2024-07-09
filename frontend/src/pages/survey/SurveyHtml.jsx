// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { ReactComponent as Icon } from "./icons/Icon.svg";
// import "react-datepicker/dist/react-datepicker.css";
// import { SurveyDetails } from "../../components/SurveyDetails";
// import { InputType } from "../../components/fields/InputType";
// import { CheckBox } from "../../components/fields/CheckBoxes/CheckBox";
// import { MyButton } from "../../components/fields/button/MyButton";
// import { surveyCreationContext } from "../../context/Context";
// import PopUpTwoBtn from "../../components/dialogs/PopUpTwoBtn";
// import promptOk from "../../assets/images/promptOk.svg";

// const PORT = process.env.REACT_APP_PORT || 5000;

// export default function SurveyHtml() {
//     const [questions, setQuestions] = useState([]);
//     const [surveyInputs, setSurveyInputs] = useState({});

//     // For successful message
//     const [showPopup, setShowPopup] = useState(false);
//     const navigate = useNavigate();

//     // Callback functions for the popUp message
//     const goToHome = () => {
//         navigate("/dashboard");
//     };
//     const goToSurvey = () => {
//         navigate("/surveys");
//     };

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(
//                     `http://localhost:${PORT}/api/questions`
//                 );
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
//                 const data = await response.json();

//                 setQuestions(JSON.parse(data));
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };

//         fetchData();
//     }, []);

//     // TODO : Delete the useEffect after we fix the survey form
//     // Add missing field that we need for the tables
//     useEffect(() => {
//         setSurveyInputs((prevInputs) => ({
//             ...prevInputs,
//             status: "Upcoming",
//             viewed: 0,
//             completed: 0,
//             dropouts: 0,
//         }));
//     }, []);

//     // Method to handle sending a new survey
//     const handleAddSurvey = async (event) => {
//         event.preventDefault();
//         console.log(surveyInputs);
//         try {
//             const result = await addSurvey(surveyInputs);
//             console.log("Survey added successfully", result);
//             setShowPopup(true);
//         } catch (error) {
//             console.error("Error adding survey:", error);
//         }
//     };

//     // Add survey
//
//     const addSurvey = async (newSurvey) => {
//         try {
//             const res = await fetch(URL, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(newSurvey),
//             });

//             if (!res.ok) {
//                 throw new Error(`HTTP error! Status: ${res.status}`);
//             }
//             // Verifica si la respuesta es JSON antes de intentar analizarla
//             const contentType = res.headers.get("Content-Type");
//             if (!contentType || !contentType.includes("application/json")) {
//                 // console.log("Received non-JSON response");
//                 return;
//             }

//             const data = await res.json();
//             return data;
//         } catch (error) {
//             console.log("Failed to send message:", error);
//         }
//     };

//     return (
//         <>
//             <PopUpTwoBtn
//                 trigger={showPopup}
//                 setTrigger={setShowPopup}
//                 children={
//                     <div className="successTex flex flex-col gap-4 items-center">
//                         <img
//                             src={promptOk}
//                             alt="ok symbol"
//                             className="w-12 h-12"
//                         />
//                         <h3 className="text-h3">Published</h3>
//                         <p className="text-p text-center">
//                             The employees have received the survey link.
//                         </p>
//                     </div>
//                 }
//                 btnOneText={"Go to Home"}
//                 btnOneOnClick={goToHome}
//                 btnTwoText={"Go to the Survey"}
//                 btnTwoOnClick={goToSurvey}
//             />
//             <form onSubmit={handleAddSurvey}>
//                 <surveyCreationContext.Provider
//                     value={{ surveyInputs, setSurveyInputs }}
//                 >
//                     <p className="font-bold text-lg mb-6">Survey Title</p>
//                     <div className="h-6"></div>
//                     <hr />
//                     <div className="h-6"></div>
//                     <InputType
//                         title={"Title"}
//                         type={"text"}
//                         name={"surveyName"}
//                         placeholder={"E.g.: Employee Satisfaction"}
//                         onValueChange={(value) => {
//                             setSurveyInputs((prevInputs) => ({
//                                 ...prevInputs,
//                                 surveyName: value,
//                             }));
//                         }}
//                     />
//                     <div className="h-6"></div>

//                     <div className="h-6"></div>
//                     <p className="font-bold text-lg mb-6">
//                         Choose the participant
//                     </p>
//                     <div className="h-6"></div>
//                     <hr />
//                     <div className="h-6"></div>

//                     <SurveyDetails />

//                     <div className="h-6"></div>
//                     <p className="flex items-center gap-2 font-bold text-lg mb-6">
//                         Employee Satisfaction Index (ESI) <Icon />
//                     </p>
//                     <div className="h-6"></div>
//                     <div className="h-6"></div>
//                     <p className="flex items-center gap-2 font-bold text-lg mb-6">
//                         Employee Satisfaction Index (ESI) <Icon />
//                     </p>
//                     <div className="h-6"></div>

//                     {questions.map((question, index) => (
//                         <div key={index}>
//                             <div className="h-6"></div>
//                             <div>
//                                 <CheckBox question={question.question} />
//                                 {/* Render other question details as needed */}
//                             </div>
//                         </div>
//                     ))}
//                     <div className="h-6"></div>

//                     <div className="flex justify-between items-center py-4 border border-gray-300">
//                         <p>Add Question</p>
//                         <p>+</p>
//                     </div>
//                     <div className="h-6"></div>

//                     <div className="flex items-center">
//                         <input
//                             type="checkbox"
//                             name="Comments"
//                             id="Comments"
//                             value="Comments"
//                         />
//                         <label htmlFor="Comments" className="ml-2">
//                             {" "}
//                             Allow Comments?
//                         </label>
//                         <div className="h-6"></div>
//                     </div>

//                     <div className="flex justify-between mt-6">
//                         <MyButton value={"Cancel"} />
//                         <MyButton value={"Next"} onClick={handleAddSurvey} />
//                     </div>
//                     <div className="h-6"></div>
//                 </surveyCreationContext.Provider>
//             </form>
//         </>
//     );
// }
