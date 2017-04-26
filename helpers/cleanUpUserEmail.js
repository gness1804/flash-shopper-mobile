// @flow

const cleanUpUserEmail = (email: string): string => {
  const result = email.split('').filter((char: string) => {
    return char !== '.' && char !== '$' && char !== '[' && char !== ']' && char !== '#' && char !== '/'
  })
  return result.join('')
}

export default cleanUpUserEmail
