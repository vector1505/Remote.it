# Remote.it

A small web-based cloud IDE demo that combines a Vite + React client with an Express + Socket.IO server to provide an interactive terminal, file tree, and editor surface. This repository contains a client UI, a server that exposes terminal and file APIs, and an optional user utility folder.

---

## Table of contents

- Project overview
- Features
- Repository layout
- Prerequisites
- Install & run (development)
- Production / build notes
- How it works (architecture)
- Contributing
- License

## Project overview

This project demonstrates a lightweight cloud IDE experience with:
- A React frontend (Vite) that hosts the UI (terminal, file tree, editor).
- A Node/Express server using Socket.IO and a PTY library to provide a real terminal to the browser.

Use this README to get the project running locally for development.

## Features

- Browser-based terminal backed by a PTY (node-pty / node-pty-like integration). 
- File tree UI and editor surface (React components).
- Socket.IO for real-time communication between client and server.

## Repository layout

Top-level folders:

- `client/` — Vite + React app. Contains UI, components, and client-side socket handling.
- `server/` — Express server which exposes terminal and file APIs and attaches Socket.IO.
- `user/` — small helper/service (optional) — may contain extra scripts or utilities.

Important client files (inside `client/src`):
- `main.jsx` — app entry
- `App.jsx` — main app component
- `socket.js` — socket helper
- `components/terminal.jsx` — terminal UI
- `components/tree.jsx` — file tree UI

Important server files (inside `server/`):
- `index.js` — server entry (starts Express + Socket.IO and handles PTY/terminal requests)

## Prerequisites

- Node.js (recommended >=16)
- npm (or yarn)

## Install & run (development)

Open two terminals (one for server, one for client). From the project root:

1) Install dependencies for server and client

```bash
# from repo root
cd server
npm install

cd ../client
npm install
```

2) Start the server (hot reload via nodemon)

```bash
cd server
npm run dev
# runs: nodemon index.js
```

3) Start the client (Vite dev server)

```bash
cd client
npm run dev
# opens Vite dev server (by default on http://localhost:5173)
```

Now open the client URL printed by Vite (commonly http://localhost:5173). The client will connect to the server via Socket.IO to provide the terminal and other live features.

Notes:
- The client package.json exposes scripts: `dev`, `build`, `preview`.
- The server package.json exposes `dev` (nodemon index.js).

The `user/` folder did not contain a readable `package.json` at the time of writing. If you rely on `user/` services, inspect that folder and run `npm install`/`npm run` inside it as appropriate.

## Production / build notes

To build the client for production:

```bash
cd client
npm run build
```

This generates a production bundle in `client/dist`. Serve those files with any static server (Nginx, Express static middleware, or a cloud provider). You will also need the server running if you want terminal features or real-time APIs.

## How it works (architecture)

- Client: React app uses Socket.IO client to connect to the server and send/receive terminal data and file events.
- Server: Express + Socket.IO listens for client connections. When a terminal session is requested, the server creates a PTY (via a node PTY library) and bridges IO to the socket.

This is a simple, modular structure that makes it easy to extend: add authentication, persistent file storage, or multi-tenant sessions.

## Development tips

- Use your browser devtools and the Vite overlay for quick feedback.
- If the terminal can't spawn, confirm the server logs and ensure required PTY/system binaries exist on the host.
- Add ESLint or Prettier configuration to the repo if you want consistent formatting.

## Contributing

1. Fork the repo
2. Create a feature branch
3. Add tests or verify the UI manually
4. Open a pull request with a short description of the change


