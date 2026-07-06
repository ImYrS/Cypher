# Cypher

A lightweight static Cloudflare DNS panel for zones hosted on Cloudflare, including CNAME-hosted zones.

## Features

- List active Cloudflare zones.
- View, create, edit, and delete DNS records.
- Copy proxied record CNAME targets.
- Edit raw DNS record JSON for advanced Cloudflare API fields.
- Remember starred zones in the current browser.

## Usage

Serve the repository from a static web server so the root-relative `/static` assets resolve correctly.

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080/login.html`, enter a Cloudflare API Token, and keep the default API endpoint or provide your own Cloudflare API proxy endpoint.

## Token permissions

Use a scoped Cloudflare API Token instead of a global API key. The panel needs permissions for listing zones and editing DNS records. Worker-domain display also needs account access for the Workers domains endpoint.

Suggested minimum permissions:

- `Zone:Zone:Read`
- `Zone:DNS:Edit`
- `Account:Account Settings:Read`
- Worker domain read access if you want Worker-bound records to display their service name

The token is stored only in the current browser's local storage.
