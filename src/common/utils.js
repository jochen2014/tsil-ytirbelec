export const toCurrency = (value, currency) => {
    if (value === null) {
        return 'N/A';
    }
    let currencyChar = '';
    switch (currency) {
        case 'usd':
            currencyChar = "$USD";
            break;
        case 'euro':
            currencyChar = '\u{20ac}';
            break;
        case 'aud':
            currencyChar = '$AUD';
            break;
        default:
            throw 'unsupported currency'
    }

    return `${currencyChar} ${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}