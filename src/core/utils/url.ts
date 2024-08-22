export function getParameterValueFromUrl(url: string, parameterName: string) {
  const queryString = url.split('?')[1]

  if (queryString) {
    const keyValuePairs = queryString.split('&')

    for (let i = 0; i < keyValuePairs.length; i++) {
      const pair = keyValuePairs[i].split('=')
      if (pair[0] === parameterName) {
        return pair[1]
      }
    }
  }

  return null
}
