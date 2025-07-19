const computeWithholdingTaxDue = (contractualSum, discount, tariffPercent, outstanding) => {
    const taxableAmount = contractualSum - discount;
    const tariff = (taxableAmount * tariffPercent) / 100;
    return tariff + outstanding;
};

const contractualSum = 50000;
const discount = 1000;
const tariffPercent = 10;
const outstanding = 2000;

const totalTaxDue = computeWithholdingTaxDue(contractualSum, discount, tariffPercent, outstanding);

console.log(`Total Withholding Tax Due: ${totalTaxDue}`);