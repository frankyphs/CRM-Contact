// generate id while adding option
export const generateUniqueId = (): string => {
  const now = new Date()
  return `${now.getHours()}${now.getMinutes()}${now.getSeconds()}${now.getDate()}${now.getMonth()}${now.getFullYear()}`
}
