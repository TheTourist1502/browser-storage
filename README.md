# Browser Storage Guide

A comprehensive guide to **Cookies**, **localStorage**, and **sessionStorage** with interactive demos and security best practices.

## Sections

| # | Folder | What's Inside |
|---|--------|--------------|
| 1 | `01-cookies/` | Cookie CRUD, "Remember Me" demo, utility functions |
| 2 | `02-localStorage/` | E-commerce product page — favorites, ratings, view history |
| 3 | `03-sessionStorage/` | Shopping cart — clears when tab closes |
| 4 | `04-comparison/` | Feature matrix, live storage counts, decision tree |
| 5 | `05-security/` | XSS prevention, safe sanitization, security rules |

## Quick Start

Open any `.html` file directly in a browser — no server required.

## Storage at a Glance

| | Cookies | localStorage | sessionStorage |
|---|---|---|---|
| Capacity | ~4 KB | ~5–10 MB | ~5–10 MB |
| Persists | Until expiry | Forever | Tab only |
| Sent to server | ✅ Auto | ❌ | ❌ |
| HttpOnly | ✅ | ❌ | ❌ |
| Best for | Auth, tracking | Preferences | Temporary data |
