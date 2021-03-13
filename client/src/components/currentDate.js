// handle the current date
let newDate = new Date();
let dateToString = newDate.toString();
let dateToArray = dateToString.split(" ");
let day = dateToArray[2];
let month = dateToArray[1];
let year = newDate.getFullYear();
let hour = dateToArray[4];
export let currentDate = `${day}-${month}-${year} ${hour}`;
