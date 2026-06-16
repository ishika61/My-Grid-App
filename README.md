# Grid Conquest

Grid Conquest is a real-time multiplayer grid application built as a shared board where users can capture cells on a 20×20 grid. Each capture is persisted in MongoDB and instantly synchronized across all connected clients using Socket.io.

## Live Demo

**Frontend:** https://my-grid-app-1.onrender.com
**Backend:** https://my-grid-app.onrender.com
## Repository



---

## Assignment Overview

The goal of this project was to build a real-time shared grid application where multiple users can interact with the same board simultaneously.

Features implemented:

* Shared 20×20 grid (400 cells)
* Cell ownership system
* Real-time updates across all connected users
* Persistent data storage with MongoDB
* Conflict-safe cell capturing
* Live leaderboard and statistics
* Responsive and interactive UI

---

## Tech Stack

### Frontend

* Next.js
* React
* Socket.io Client

### Backend

* Node.js
* Express.js
* Socket.io

### Database

* MongoDB Atlas
* Mongoose

### Deployment

* Render

---

## Core Features

### Shared Grid

* 20×20 board containing 400 cells
* Cells start as unclaimed
* Users can capture available cells

### Real-Time Updates

* Changes are broadcast instantly to all connected clients
* No page refresh required
* Grid ownership, activity, leaderboard, and statistics stay synchronized

### Persistent Storage

* Cell ownership is stored in MongoDB
* Activity history is persisted
* Grid state survives server restarts

### Multiplayer Support

* Multiple users can join simultaneously
* Online user tracking
* Live synchronization between clients

### Conflict Handling

Cell captures are processed on the server to prevent race conditions.

The backend performs an atomic MongoDB update:

```js
Cell.findOneAndUpdate(
  { index: cellIndex, ownerName: null },
  update
)
```

This guarantees that only one user can successfully claim an unowned cell, even if multiple users click it at the same time.

---

## Bonus Features Implemented

### User Names and Colors

* Username selection before joining
* Unique color assigned to each player

### Gameplay Rules

* 3-second capture cooldown
* Backend-enforced validation

### Leaderboard and Statistics

* Live leaderboard
* Captured cells count
* Capture percentage
* Online users count
* Captures per minute
* Current rank
* Most active player

### Zoom and Pan

* Zoom controls
* Pan support
* Reset view option

### Animations and Micro-Interactions

* Capture animations
* Hover effects
* Status indicators
* Smooth transitions
* Activity feed updates

---

## Real-Time Architecture

### Initial Load

The client fetches:

* Grid data
* Statistics
* Leaderboard
* Activity feed
* Online users

through REST endpoints.

### Live Updates

After loading, the client establishes a Socket.io connection and listens for:

* `cell:update`
* `activity:update`
* `leaderboard:update`
* `stats:update`
* `online:update`

This allows all connected users to stay synchronized in real time.

---

## API Endpoints

### Grid

```http
GET /api/grid
```

Returns all cells.

### Statistics

```http
GET /api/stats/stats
```

Returns grid statistics.

### Leaderboard

```http
GET /api/stats/leaderboard
```

Returns top players.

### Activity

```http
GET /api/stats/activity
```

Returns recent captures.

### Online Users

```http
GET /api/stats/online
```

Returns currently connected users.

---

## Socket Events

### Client → Server

* `user:join`
* `cell:capture`

### Server → Client

* `user:joined`
* `online:update`
* `cell:update`
* `cell:capture:result`
* `activity:update`
* `leaderboard:update`
* `stats:update`

---

## Local Setup

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:3000
```

Backend runs on:

```text
http://localhost:5000
```

---

## Design Decisions and Trade-offs

* Kept the grid size fixed at 20×20 to focus on reliability and real-time synchronization.
* Prioritized conflict handling and multiplayer consistency over complex territory-control mechanics.
* Used REST for initial data loading and Socket.io for live updates to keep the architecture simple and scalable.
* Focused on a clean, responsive UI with real-time feedback rather than implementing advanced game rules.

---

## Future Improvements

* Territory control mechanics
* Cell locking system
* Larger dynamic maps
* Match history
* User authentication
* Global rankings

