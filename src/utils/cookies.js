export const getCookies = (tokenName) => {
  const cookieMatches = document.cookie.match(
    // eslint-disable-next-line no-useless-escape
    new RegExp('(?:^|; )' + tokenName.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  )
  return cookieMatches ? decodeURIComponent(cookieMatches[1]) : undefined;
}

export const setCookies = (tokenName, tokenValue, props) => {
  props = props || {}
  let expire = props.expires

  if (typeof expire == 'number' && expire) {
    const date = new Date()
    date.setTime(date.getTime() + expire * 1000)
    expire = props.expires = date
  }

  if (expire && expire.toUTCString) {
    props.expires = expire.toUTCString()
  }

  let cookie = tokenName + '=' + encodeURIComponent(tokenValue)

  for (const prop in props) {
    cookie += '; ' + prop
    const value = props[prop]
    if (value !== true) {
      cookie += '=' + value
    }
  }

  document.cookie = cookie
}

export const deleteCookies = (tokenName) => setCookies(tokenName, null, { expires: -1 })
