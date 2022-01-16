export const handleError = (error: string | undefined) => {
  if (!error) {
    return { code: 500, message: 'Unknown error' }
  }
  const [errCode, errMessage] = error.split(':', 2)
  return { code: +errCode, message: errMessage?.trim() }
}
