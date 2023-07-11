function priceFormatter(prc:number, qty:number = 1): string {
  const price = new Intl.NumberFormat(
    'de-DE', {style: 'currency', currency: 'EUR'}
    ).format(prc * qty)
    return price
}

export default priceFormatter