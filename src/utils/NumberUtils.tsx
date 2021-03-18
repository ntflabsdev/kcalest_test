export const roundToOneDp=(value: Number) => {
    value = Number(value.toFixed(1));
    return String(value).concat("g");
}

export const roundToOneDpKcal=(value: Number) => {
    return Number(value.toFixed(0));
}


// => annonymous function - Modern way to write a function 
