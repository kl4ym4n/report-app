# App Report

A web application for managing tasks and projects usingcharts with real-time progress tracking.

## Features

- 📊 Interactive chart visualization
- 🔐 Google OAuth authentication
- 📱 Responsive design
- 📈 Task progress tracking
- 🕒 Change history for each task
- 🔄 Real-time updates

## Tech Stack

- Frontend:
  - React
  - TypeScript
  - Styled Components
  - React Gantt Timeline Calendar
  - Google OAuth

- Backend:
  - Node.js
  - Express
  - TypeScript
  - MongoDB
  - JWT Authentication

- Infrastructure:
  - Docker
  - Docker Compose

## Prerequisites

- Node.js 18+
- Docker Desktop
- Google OAuth credentials

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/gantt-report.git
cd gantt-report
```

2. Create environment files:

Create `docker/.env`:
```env
GOOGLE_CLIENT_ID=your_google_client_id
JWT_SECRET=your_jwt_secret
```

3. Start the application using Docker:
```bash
docker compose -f docker/docker-compose.yml up --build
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- MongoDB: localhost:27017

## Development

### Project Structure
```
gantt-report/
├── src/                    # Frontend source code
│   ├── components/        # React components
│   ├── services/         # API services
│   └── modals/          # Modal components
├── server/               # Backend source code
│   ├── src/
│   │   ├── controllers/  # Route controllers
│   │   ├── models/      # MongoDB models
│   │   ├── routes/      # API routes
│   │   └── middleware/  # Express middleware
├── docker/              # Docker configuration
│   ├── client/         # Frontend Docker config
│   ├── server/         # Backend Docker config
│   └── docker-compose.yml
```

### Running Locally

1. Install frontend dependencies:
```bash
npm install
```

2. Install backend dependencies:
```bash
cd server
npm install
```

3. Start the development servers:
```bash
# Frontend
npm start

# Backend
cd server
npm run dev
```

## API Documentation

### Authentication
- `POST /api/auth/google` - Google OAuth authentication

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
