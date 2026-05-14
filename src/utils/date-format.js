export default function getFormattedDate(dateString){

    const date = new Date(dateString);

    const day = date.getDate();

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const weekDays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    const month = monthNames[date.getMonth()];
    const weekDay = weekDays[date.getDay()];

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2,"0");

    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;

    if(hours === 0){
        hours = 12;
    }

    function getDaySuffix(day){
        if(day > 3 && day < 21){
            return "th";
        }

        switch(day % 10){
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    }

    return `${day}${getDaySuffix(day)} ${weekDay} of ${month} ${hours}:${minutes} ${ampm}`;
}