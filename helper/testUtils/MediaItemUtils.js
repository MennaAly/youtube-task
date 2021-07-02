function getDifferentDateInYears() {
    let date = new Date();
    date.setFullYear(date.getFullYear() - 2);
    return date;
}

function getDifferentDateInMonths() {
    let date = new Date();
    date.setMonth(date.getMonth() - 2);
    return date;
    
}

function getDifferentDateInWeeks() {
    let date = new Date();
    date.setHours(date.getHours() - 168);
    return date;
}

function getDifferentDateInDays() {
    let date = new Date();
    date.setHours(date.getHours() - 24);
    return date;
}
function getDifferentDateInHours() {
    let date = new Date();
    date.setHours(date.getHours() - 3);
    return date;
}

function getDifferentDateInMinutes() {
    let date = new Date();
    date.setMinutes(date.getMinutes() - 30);
    return date;
}

function getDifferentDateInSeconds() {
    let date = new Date();
    date.setSeconds(date.getSeconds() - 10);
    return date;
}

module.exports = {
    getDifferentDateInYears,
    getDifferentDateInMonths,
    getDifferentDateInWeeks,
    getDifferentDateInDays,
    getDifferentDateInHours,
    getDifferentDateInMinutes,
    getDifferentDateInSeconds
}