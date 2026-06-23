![Portfolio Preview](/public/opengraph.png)

# Noah Pham | Portfolio

Personal portfolio website showcasing my projects, hackathon wins, and technical experiences.

**Live:** [noahpham.me](https://noahpham.me)

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view.

## Troubleshooting

### Connection not private (Public WiFi)
If you see a `net::ERR_CERT_AUTHORITY_INVALID` error while connecting from public WiFi (libraries, cafes, airports):
- **Cause:** The network has a login screen ("Captive Portal") that is trying to intercept the connection. Because this site uses HSTS (security feature), your browser blocks the interception to protect you.
- **Fix:** Visit a non-secure site like [http://neverssl.com](http://neverssl.com) first. This will trigger the WiFi login screen. Once you log in, `noahpham.me` will load correctly.
