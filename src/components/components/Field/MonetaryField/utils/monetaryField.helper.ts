export const formatCurrency = (value: number): string => {
  if (!!!value) return "-"

  //   const options = { style: "currency", currency: code || 'USD' }
  const options = {
    style: "decimal",
    minimumFractionDigits: 2, // Minimum decimal places
    maximumFractionDigits: 2,
  }
  const formattedValue = new Intl.NumberFormat(undefined, options).format(value)

  return formattedValue
}


