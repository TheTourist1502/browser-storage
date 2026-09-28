# localStorage Guide

## What is localStorage?

Key-value store persisted in the browser with **no expiry**. Survives page refreshes, tab closes, and browser restarts. Cleared only by `localStorage.clear()`, `localStorage.removeItem()`, or the user clearing site data.

## API

```javascript
// Store (values must be strings)
localStorage.setItem('theme', 'dark');
localStorage.setItem('user', JSON.stringify({ name: 'Alice', age: 30 }));

// Retrieve
const theme = localStorage.getItem('theme');              // "dark"
const user  = JSON.parse(localStorage.getItem('user'));   // { name: 'Alice', age: 30 }

// Delete
localStorage.removeItem('theme');

// Clear everything
localStorage.clear();

// Count
console.log(localStorage.length);

// Iterate
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  console.log(key, localStorage.getItem(key));
}
```

## Capacity

~5MB per origin (varies by browser). Store large data in IndexedDB instead.

## When to Use

✅ User preferences (theme, language, layout)  
✅ App state that should survive restarts (favorites, ratings)  
✅ Cached API responses  
✅ Draft content  

❌ Sensitive data (no encryption, readable by any JS on the page)  
❌ Data that must sync to the server  
❌ Large binary data  

## Common Pitfall: Objects

```javascript
// ❌ Stores "[object Object]"
localStorage.setItem('user', { name: 'Bob' });

// ✅ Serialize with JSON
localStorage.setItem('user', JSON.stringify({ name: 'Bob' }));
const user = JSON.parse(localStorage.getItem('user'));
```

## Same-Origin Policy

localStorage is scoped to `protocol + hostname + port`. `http://example.com` and `https://example.com` have separate stores.
