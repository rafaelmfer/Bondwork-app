import style from "./styles.module.css";

export function MyButton(props) {
    const value = props.value;
    // Convert spaces in value to camelCase to match CSS class names
    const className = value
        .split(" ")
        .map((word, index) =>
            index === 0
                ? word.toLowerCase()
                : word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join("");

    return <button className={` ${style[className]}`}>{value}</button>;
}
