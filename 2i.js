const computeProfit = (costPrice, sellingPrice) => sellingPrice - costPrice;

const costPrice = 1000;
const sellingPrice = 5000;
const profit = computeProfit(costPrice, sellingPrice);

console.log(`Profit: ${profit}`);