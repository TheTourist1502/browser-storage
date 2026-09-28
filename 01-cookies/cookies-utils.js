function setCookie(name, value, daysExpire) {
  const expires = daysExpire
    ? `; expires=${new Date(Date.now() + daysExpire * 864e5).toUTCString()}`
    : '';
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}${expires}; path=/`;
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(?:^|; )' + encodeURIComponent(name) + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

function deleteCookie(name) {
  document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

function listAllCookies() {
  return document.cookie
    ? document.cookie.split('; ').map(c => {
        const [k, ...v] = c.split('=');
        return { name: decodeURIComponent(k), value: decodeURIComponent(v.join('=')) };
      })
    : [];
}

function setCookieWithOptions(name, value, options = {}) {
  const { days, path = '/', domain, secure, sameSite = 'Lax' } = options;
  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=${path}`;
  if (days) cookie += `; expires=${new Date(Date.now() + days * 864e5).toUTCString()}`;
  if (domain) cookie += `; domain=${domain}`;
  if (secure) cookie += '; Secure';
  cookie += `; SameSite=${sameSite}`;
  document.cookie = cookie;
}
