# Browser Storage Guide

A hands-on reference covering every major browser storage mechanism — from the classics (Cookies, localStorage, sessionStorage) to the modern APIs (Cache Storage, Extension Storage, Storage Buckets). Each section is a self-contained interactive demo you can open directly in a browser.

## Sections

| # | Folder | What's Inside |
|---|--------|--------------|
| 1 | `01-cookies/` | Cookie CRUD, "Remember Me" demo, utility functions |
| 2 | `02-localStorage/` | E-commerce product page — favorites, ratings, view history |
| 3 | `03-sessionStorage/` | Shopping cart — clears when tab closes |
| 4 | `04-comparison/` | Feature matrix, live storage counts, decision tree |
| 5 | `05-security/` | XSS prevention, safe sanitization, security rules |
| 6 | `06-extension-storage/` | Chrome extension `storage` API — sync, local, and managed |
| 7 | `07-cache-storage/` | Service Worker Cache API — offline-first patterns |
| 8 | `08-storage-buckets/` | Storage Buckets API — isolated, eviction-controlled stores |

## Quick Start

Open any `index.html` directly in a browser — no server or build step required.

## Storage at a Glance

| | Cookies | localStorage | sessionStorage | Cache Storage | Extension Storage | Storage Buckets |
|---|---|---|---|---|---|---|
| Capacity | ~4 KB | ~5–10 MB | ~5–10 MB | GBs (quota-managed) | ~5–10 MB | GBs (quota-managed) |
| Persists | Until expiry | Forever | Tab only | Until evicted | Until extension removed | Configurable |
| Sent to server | Yes | No | No | No | No | No |
| Scope | Origin + path | Origin | Tab | Origin (SW) | Extension | Origin (named bucket) |
| Best for | Auth, session tokens | User preferences | Wizard/form state | Offline assets | Extension settings | Isolated app data |

## When to Use What

- **Cookie** — auth tokens, server-read flags, anything with an expiry
- **localStorage** — theme, language, preferences that survive restarts
- **sessionStorage** — multi-step forms, temporary checkout state
- **Cache Storage** — offline-capable apps, asset caching in a Service Worker
- **Extension Storage** — Chrome/Firefox extension settings synced across devices
- **Storage Buckets** — isolate storage per logical partition; control eviction policy
