import { useState } from "react";
import styles from "../styles.module.css";

export function InputTextArea(props) {
    const [text, setText] = useState("");
    const [charCount, setCharCount] = useState(0);

    const handleTextChange = (event) => {
        const newText = event.target.value;
        setText(newText);
        setCharCount(newText.length);
    };
    return (
        <>
            <div className={styles.textArea}>
                <h3>Description</h3>
                <textarea
                    placeholder="Description"
                    value={text}
                    onChange={handleTextChange}
                    maxLength="200"
                    className={styles.textField}
                ></textarea>
                <p className={styles.countDescription}>
                    {charCount}/200 characters
                </p>
            </div>
        </>
    );
}
