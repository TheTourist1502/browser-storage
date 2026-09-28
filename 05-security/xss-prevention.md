# XSS Prevention & Storage Security

## The Attack: Stored XSS via Storage

1. Attacker injects a script tag into a value stored in localStorage
2. App reads the value and writes it to `innerHTML`
3. Script executes with full page privileges — can steal cookies, make requests

```javascript
// ❌ Vulnerable
const comment = localStorage.getItem('lastComment');
div.innerHTML = comment; // if comment = "<img src=x onerror=steal()>" → RCE

// ✅ Safe
div.textContent = comment; // renders as literal text, never executes
```

## Rules

### 1. Never use `innerHTML` with storage data
```javascript
// ❌
el.innerHTML = localStorage.getItem('bio');

// ✅
el.textContent = localStorage.getItem('bio');
```

### 2. If you need HTML, sanitize first
```javascript
// With DOMPurify (https://github.com/cure53/DOMPurify)
const safe = DOMPurify.sanitize(localStorage.getItem('bio'));
el.innerHTML = safe;
```

### 3. Validate shape on read
Never trust that what you stored is what you retrieve — another script may have tampered with it:
```javascript
const raw = JSON.parse(localStorage.getItem('user'));
if (!raw?.name || typeof raw.name !== 'string') throw new Error('Invalid user data');
```

### 4. Never store secrets in Web Storage
localStorage and sessionStorage are readable by **any JavaScript on the page**. A third-party script, browser extension, or XSS payload can read them trivially.

| Data | Safe storage |
|------|-------------|
| Auth token | HttpOnly cookie (server-set) |
| User preferences | localStorage (not sensitive) |
| Credit card | Never in browser storage |
| Password | Never in browser storage |

### 5. Content Security Policy
Add a `Content-Security-Policy` header to limit which scripts can run:
```
Content-Security-Policy: default-src 'self'; script-src 'self'
```
This won't fix XSS but reduces the blast radius.

### 6. SameSite + Secure cookies
```
Set-Cookie: session=abc; HttpOnly; Secure; SameSite=Strict
```
- `HttpOnly` — JS cannot read it
- `Secure` — only sent over HTTPS
- `SameSite=Strict` — not sent on cross-site requests (CSRF protection)
