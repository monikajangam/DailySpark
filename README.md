# Habit Tracker - Full Stack Application

A modern, full-stack habit tracking application built with React, Node.js, and MongoDB. Track your daily habits, monitor streaks, and visualize your progress with interactive charts.

## 🚀 Features

- **User Authentication**: Secure JWT-based registration and login
- **Habit Management**: Create, track, and manage daily habits
- **Progress Tracking**: Monitor completion percentages and streaks
- **Data Visualization**: Interactive charts showing monthly progress
- **Responsive Design**: Modern, clean UI that works on all devices
- **Real-time Updates**: Instant feedback on habit completion

## 🛠️ Technology Stack

### Frontend
- **React 19** - Modern React with hooks
- **React Router** - Client-side routing
- **Chart.js** - Interactive data visualization
- **Axios** - HTTP client for API calls
- **CSS3** - Custom styling with modern design

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/habittracker
JWT_SECRET=your_jwt_secret_here
```

Start the backend server:
```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## 🏗️ Project Structure

```
HabitTracker/
├── backend/
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Authentication middleware
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions
│   └── server.js       # Express server
├── frontend/
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/      # Page components
│   │   ├── api/        # API configuration
│   │   ├── utils/      # Utility functions
│   │   └── styles.css  # Global styles
│   └── public/         # Static assets
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Habits
- `GET /api/habits` - Get user's habits
- `POST /api/habits/complete` - Mark habit as complete
- `GET /api/habits/stats` - Get habit statistics

## 🎯 Usage

1. **Register/Login**: Create an account or sign in
2. **View Dashboard**: See your habits and progress
3. **Track Habits**: Mark habits as complete for the day
4. **Monitor Progress**: View streaks and completion percentages
5. **Analyze Data**: Check charts for monthly progress

## 🚀 Deployment

### Backend Deployment
- Deploy to platforms like Heroku, Railway, or DigitalOcean
- Set environment variables for production
- Use MongoDB Atlas for database

### Frontend Deployment
- Build the application: `npm run build`
- Deploy to Netlify, Vercel, or similar platforms
- Update API base URL for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Created as a portfolio project demonstrating full-stack development skills.

---

**Note**: This is a production-ready application suitable for resume projects and portfolio demonstrations. 