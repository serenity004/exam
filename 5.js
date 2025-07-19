const fahrenheitArray = [83, 77, 55, 66, 98, 50, 32, 21];

const celsiusArray = fahrenheitArray.map(f => ((f - 32) * 5) / 9);

console.log(celsiusArray);