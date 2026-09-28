# sessionStorage Guide

## What is sessionStorage?

Identical API to localStorage but scoped to the **current browser tab/window**. Cleared automatically when the tab closes. Opening the same URL in a new tab gives a fresh, isolated store.

## API

```javascript
sessionStorage.setItem('step', '2');
const step = sessionStorage.getItem('step');   // "2"
sessionStorage.removeItem('step');
sessionStorage.clear();
```

## Key Differences from localStorage

| | localStorage | sessionStorage |
|---|---|---|
| Survives tab close | ✅ | ❌ |
| Shared across tabs | ✅ same origin | ❌ each tab is isolated |
| Survives page refresh | ✅ | ✅ |

## When to Use

✅ Shopping cart in progress (clear on close is a feature)  
✅ Multi-step form state (wizard progress)  
✅ Temporary filters / sort state  
✅ One-time welcome messages  

❌ Data that must survive tab close  
❌ Data shared across tabs  

## Multi-Step Form Example

```javascript
// Step 1 — save partial form
sessionStorage.setItem('formStep1', JSON.stringify({ name: 'Alice', email: 'a@b.com' }));

// Step 2 — read and extend
const step1 = JSON.parse(sessionStorage.getItem('formStep1'));
const combined = { ...step1, address: '123 Main St' };

// On submit — clear
sessionStorage.removeItem('formStep1');
```
