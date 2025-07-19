// Compute total tax due with improved readability and ES6 features
const computeTotalTaxDue = ({ purchaseAmount = 0, discount = 0, tariffPercent = 0, outstanding = 0 }) => {
    const netAmount = purchaseAmount - discount;
    const tariff = (netAmount * tariffPercent) / 100;
    return tariff + outstanding;
};

const params = {
    purchaseAmount: 10000,
    discount: 300,
    tariffPercent: 5,
    outstanding: 1000
};

const totalTaxDue = computeTotalTaxDue(params);
console.log(`Total Tax Due: $${totalTaxDue.toFixed(2)}`);