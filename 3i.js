const computeProfit = (costPrice, sellingPrice) => sellingPrice - costPrice;

const costPrice = 75000;
const sellingPrice = 90000;
const profit = computeProfit(costPrice, sellingPrice);

console.log(`Profit: ${profit}`);