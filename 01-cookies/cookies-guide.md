# Cookies Guide

## What are Cookies?

Cookies are small key-value pairs stored by the browser and **automatically sent with every HTTP request** to the matching domain. This is what makes them useful for authentication — the server sees them without any JavaScript.

## Anatomy of a Cookie

```
Set-Cookie: sessionId=abc123; Expires=Fri, 01 Jan 2027 00:00:00 GMT; Path=/; Secure; HttpOnly; SameSite=Strict
```

| Attribute | Description |
|-----------|-------------|
| `Expires` / `Max-Age` | When the cookie dies. Omit for session cookie (cleared on browser close). |
| `Path` | URL prefix the cookie is sent with. `/` = all paths. |
| `Domain` | Scope to a domain + subdomains. |
| `Secure` | Only sent over HTTPS. |
| `HttpOnly` | Not accessible via `document.cookie` — XSS-safe. |
| `SameSite` | `Strict` / `Lax` / `None` — CSRF protection. |

## JavaScript API

```javascript
// Set (client-side only — no HttpOnly from JS)
document.cookie = "theme=dark; path=/; max-age=2592000"; // 30 days

// Get
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

// Delete (set expiry in the past)
document.cookie = "theme=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
```

## When to Use Cookies

✅ Authentication tokens (set by server as HttpOnly+Secure)  
✅ "Remember Me" sessions  
✅ Cross-subdomain shared state  
✅ Analytics / tracking IDs  

❌ Large data (4KB limit per cookie)  
❌ Sensitive data without HttpOnly  
❌ Client-only data that never needs the server  

## Security Rules

1. **Auth cookies → always HttpOnly + Secure + SameSite=Strict**
2. Never store passwords, credit card numbers, or PII in cookies
3. Set `SameSite=Strict` or `Lax` to prevent CSRF
4. Use `Secure` so cookies don't travel over plain HTTP
