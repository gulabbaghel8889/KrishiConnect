// require('dotenv').config();

// const express     = require('express');
// const cors        = require('cors');
// const helmet      = require('helmet');
// const morgan      = require('morgan');
// const rateLimit   = require('express-rate-limit');
// const mongoSanitize = require('express-mongo-sanitize');
// const path        = require('path');
// const fs          = require('fs');

// const connectDB   = require('./config/db');
// const logger      = require('./utils/logger');
// const { errorHandler, notFoundHandler } = require('./middlewares/errorHandler');

// /* ── Route Imports ─────────────────────────────────────────────────────── */
// const authRoutes     = require('./routes/authRoutes');
// const farmerRoutes   = require('./routes/farmerRoutes');
// const providerRoutes = require('./routes/providerRoutes');
// const buyerRoutes    = require('./routes/buyerRoutes');
// const adminRoutes    = require('./routes/adminRoutes');
// const feedbackRoutes = require('./routes/feedbackRoutes');

// /* ── Create upload dirs if they don't exist ────────────────────────────── */
// ['uploads/crops', 'uploads/receipts', 'logs'].forEach(dir => {
//   if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
// });

// /* ── Connect DB ─────────────────────────────────────────────────────────── */
// connectDB();

// /* ── App Setup ──────────────────────────────────────────────────────────── */
// const app = express();

// /* Security headers */
// app.use(helmet({
//   crossOriginResourcePolicy: { policy: 'cross-origin' },  // allow serving uploads
// }));

// /* CORS */
// const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173').split(',');
// app.use(cors({
//   origin: (origin, cb) => {
//     if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
//     cb(new Error(`CORS blocked: origin ${origin} not allowed`));
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
// }));

// /* Rate limiting */
// const limiter = rateLimit({
//   windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,  // 15 min
//   max:      parseInt(process.env.RATE_LIMIT_MAX)        || 100,
//   standardHeaders: true,
//   legacyHeaders:   false,
//   message: { success: false, message: 'Too many requests, please try again later.' },
// });
// app.use('/api/', limiter);
// //gulab
// app.use('/api/buyer', buyerRoutes);


// /* Stricter limit for auth endpoints */
// app.use('/api/auth/', rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 20,
//   message: { success: false, message: 'Too many login attempts. Please wait 15 minutes.' },
// }));

// /* Body parsing */
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// /* Sanitise MongoDB operators in body/query */
// app.use(mongoSanitize());

// /* Request logging */
// if (process.env.NODE_ENV !== 'production') {
//   app.use(morgan('dev'));
// } else {
//   app.use(morgan('combined', {
//     stream: { write: msg => logger.info(msg.trim()) },
//   }));
// }

// /* Static files — uploaded assets */
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// /* ── Health Check ───────────────────────────────────────────────────────── */
// app.get('/health', (_req, res) => {
//   res.json({
//     status:      'ok',
//     environment: process.env.NODE_ENV,
//     timestamp:   new Date().toISOString(),
//     uptime:      `${Math.floor(process.uptime())}s`,
//   });
// });

// /* ── API Routes ─────────────────────────────────────────────────────────── */
// const API = '/api';
// app.use(`${API}/auth`,     authRoutes);
// app.use(`${API}/farmer`,   farmerRoutes);
// app.use(`${API}/provider`, providerRoutes);
// app.use(`${API}/buyer`,    buyerRoutes);
// app.use(`${API}/admin`,    adminRoutes);
// app.use(`${API}/feedback`, feedbackRoutes);

// /* ── 404 & Error Handlers ───────────────────────────────────────────────── */
// app.use(notFoundHandler);
// app.use(errorHandler);

// /* ── Start Server ───────────────────────────────────────────────────────── */
// const PORT = parseInt(process.env.PORT) || 5000;
// const server = app.listen(PORT, () => {
//   logger.info(`
//   ╔══════════════════════════════════════════════════════╗
//   ║        🌾 Farmer Harvest Connect — API Server        ║
//   ╠══════════════════════════════════════════════════════╣
//   ║  Port:        ${String(PORT).padEnd(36)}║
//   ║  Environment: ${(process.env.NODE_ENV || 'development').padEnd(36)}║
//   ║  Health:      http://localhost:${PORT}/health${' '.repeat(19)}║
//   ╚══════════════════════════════════════════════════════╝
//   `);
// });

// /* ── Graceful Shutdown ──────────────────────────────────────────────────── */
// const gracefulShutdown = (signal) => {
//   logger.info(`${signal} received. Shutting down gracefully...`);
//   server.close(() => {
//     logger.info('HTTP server closed');
//     require('mongoose').connection.close(false, () => {
//       logger.info('MongoDB connection closed');
//       process.exit(0);
//     });
//   });
//   setTimeout(() => { process.exit(1); }, 10000);
// };

// process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
// process.on('SIGINT',  () => gracefulShutdown('SIGINT'));

// /* Unhandled promise rejections */
// process.on('unhandledRejection', (reason) => {
//   logger.error('Unhandled Rejection:', reason);
//   server.close(() => process.exit(1));
// });

// module.exports = app;   // for testing

// //gulab

// const buyerRoutes = require('./routes/buyerRoutes');


// // const orderRoutes = require("./routes/orderRoutes");

// // app.use("/api/orders", orderRoutes);

// // const cartRoutes = require("./routes/cartRoutes");

// // app.use("/api/cart", cartRoutes);

// // const reviewRoutes = require("./routes/reviewRoutes");

// // app.use("/api/reviews", reviewRoutes);
// // const paymentRoutes = require("./routes/paymentRoutes");

// // app.use("/api/payments", paymentRoutes);
// // const notificationRoutes = require("./routes/notificationRoutes");

// // app.use("/api/notifications", notificationRoutes);


require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const path = require('path');
const fs = require('fs');
const http = require('http');
const { Server } = require('socket.io');

const connectDB = require('./config/db');
const logger = require('./utils/logger');
const {
  errorHandler,
  notFoundHandler,
} = require('./middlewares/errorHandler');

/* ROUTES */
const authRoutes = require('./routes/authRoutes');
const farmerRoutes = require('./routes/farmerRoutes');
const providerRoutes = require('./routes/providerRoutes');
const buyerRoutes = require('./routes/buyerRoutes');
const adminRoutes = require('./routes/adminRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const notificationRoutes = require("./routes/notificationRoutes");
const farmerOrderRoutes = require("./routes/farmerOrderRoutes");
/* CREATE DIRECTORIES */
['uploads/crops', 'uploads/receipts', 'logs'].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});
const messageRoutes = require("./routes/messageRoutes");
/* CONNECT DATABASE */
connectDB();

/* APP */
const app = express();

/* SECURITY */
app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: 'cross-origin',
    },
  })
);

/* CORS */
const allowedOrigins = (
  process.env.ALLOWED_ORIGINS || 'http://localhost:5173'
).split(',');

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return cb(null, true);
      }

      cb(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  })
);

/* RATE LIMIT */
const limiter = rateLimit({
  windowMs:
    parseInt(process.env.RATE_LIMIT_WINDOW_MS) ||
    15 * 60 * 1000,
  max:
    parseInt(process.env.RATE_LIMIT_MAX) ||
    100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests. Try later.',
  },
});

app.use('/api/', limiter);

/* AUTH LIMITER */
app.use(
  '/api/auth/',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: {
      success: false,
      message: 'Too many login attempts.',
    },
  })
);

/* BODY PARSER */
app.use(express.json({ limit: '10mb' }));
app.use(
  express.urlencoded({
    extended: true,
    limit: '10mb',
  })
);

/* SANITIZE */
app.use(mongoSanitize());

/* LOGGING */
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
} else {
  app.use(
    morgan('combined', {
      stream: {
        write: (msg) => logger.info(msg.trim()),
      },
    })
  );
}

/* STATIC FILES */
app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'))
);

/* HEALTH */
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

/* API ROUTES */
const API = '/api';
app.use(`${API}/auth`, authRoutes);
app.use(`${API}/farmer`, farmerRoutes);
app.use(`${API}/provider`, providerRoutes);
app.use(`${API}/buyer`, buyerRoutes);
app.use(`${API}/admin`, adminRoutes);
app.use(`${API}/feedback`, feedbackRoutes);
app.use(`${API}/notifications`, notificationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/farmer-orders", farmerOrderRoutes);

/* 404 */
app.use(notFoundHandler);

/* ERROR HANDLER */
app.use(errorHandler);

/* START SERVER */
// const PORT = process.env.PORT || 5000;

// const server = app.listen(PORT, () => {
//   logger.info(`Server running on port ${PORT}`);
// });

/* SOCKET + SERVER */
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  socket.on('joinRoom', (userId) => {
    socket.join(userId);
  });

  socket.on('sendMessage', (data) => {
    io.to(data.receiverId).emit(
      'receiveMessage',
      data
    );
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });
});

/* START SERVER */
const PORT = process.env.PORT || 5000;

const server = httpServer.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

/* GRACEFUL SHUTDOWN */
const gracefulShutdown = (signal) => {
  logger.info(`${signal} received`);

  server.close(() => {
    require('mongoose').connection.close(false, () => {
      process.exit(0);
    });
  });
};

process.on('SIGTERM', () =>
  gracefulShutdown('SIGTERM')
);

process.on('SIGINT', () =>
  gracefulShutdown('SIGINT')
);

process.on('unhandledRejection', (err) => {
  logger.error(err);
  server.close(() => process.exit(1));
});

module.exports = app;