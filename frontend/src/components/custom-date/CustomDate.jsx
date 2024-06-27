export default function CustomDate(props) {
    const date = new Date(props.propsDate);
    const monthNames = [
        "January ",
        "February ",
        "March ",
        "April ",
        "May ",
        "June ",
        "July ",
        "August ",
        "September ",
        "October ",
        "November ",
        "December ",
    ];
    const month = monthNames[date.getMonth()];

    return (
        <>
            {month} {date.getDate()}, {date.getFullYear()}
        </>
    );
}
