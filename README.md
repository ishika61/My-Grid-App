# Grid Conquest

A real-time shared grid app where players join with a username, receive a color, and capture cells on a shared 20x20 board. Every capture is persisted in MongoDB and broadcast to all connected clients with Socket.io.

## Tech Choices

- Frontend: Next.js and React for a responsive interactive UI.
- Backend: Express for REST endpoints and Socket.io for real-time updates.
- Database: MongoDB Atlas through Mongoose for persistent cell ownership and activity history.
- Real-time model: clients load the initial state through REST, then subscribe to Socket.io events for grid, stats, leaderboard, activity, and online-user updates.

## Completed Features

- 400-cell shared grid initialized in MongoDB.
- Username join flow with server-assigned player colors.
- Live online-user list.
- Click-to-capture behavior for unclaimed cells.
- Atomic backend conflict handling so only one user can capture a cell.
- Real-time broadcasts for captured cells, activity feed, stats, and leaderboard.
- Zoom and pan controls for navigating the board.
- 3-second backend-enforced capture cooldown per connected player.
- Enhanced stats for captured cells, capture percentage, captures per minute, online users, current rank, and most active player.
- Responsive UI with capture feedback, progress indicator, improved stats, leaderboard, and recent activity.
- Reconnect handling that rejoins a previously joined player session by username.

## Conflict Handling

Captures are processed on the server, not trusted from the client. The backend uses an atomic MongoDB update:

```js
Cell.findOneAndUpdate({ index: cellIndex, ownerName: null }, update)
```

If two users click the same cell at the same time, only the first update can match `ownerName: null`. The other user receives a rejected capture result and the client reconciles its local state with the already-owned cell returned by the server.

After a successful capture, the server sets `cooldownUntil` on the connected player for 3 seconds. The client shows the timer, but the backend remains authoritative.

## Run Locally

Start the backend:

```bash
cd server
npm run dev
```

Start the frontend:

```bash
cd client
npm run dev
```

By default the frontend expects the backend at `http://localhost:5000`. Override with `NEXT_PUBLIC_API_URL` if needed. The backend allows `CLIENT_URL` for CORS and uses the existing MongoDB connection from the server environment.

## API and Socket Overview

REST endpoints:

- `GET /api/grid` returns all cells.
- `GET /api/stats/stats` returns grid totals and claim percentage.
- `GET /api/stats/leaderboard` returns top players.
- `GET /api/stats/activity` returns recent captures.
- `GET /api/stats/online` returns currently connected players.

Socket events:

- Client sends `user:join` and `cell:capture`.
- Server emits `user:joined`, `online:update`, `cell:update`, `cell:capture:result`, `activity:update`, `leaderboard:update`, and `stats:update`.
