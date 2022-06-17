const parseAmount = (amount: string | number) => {
    amount = amount.toString();

    amount = amount.replace('.', '');
    amount = amount.replace(',', '.');

    return parseFloat(amount)
}

export default parseAmount