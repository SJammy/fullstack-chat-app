import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import path from "path"

import { connectDB } from './lib/db.js'

import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import { app, server } from "./lib/socket.js";

dotenv.config()

// REMOVE Express server app & REPLACE with Socket.io server app
// const app = express()


const PORT = process.env.PORT
const __dirname  = path.resolve()

app.use(express.json({ limit: '10mb' }));

app.use(cookieParser())
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)

if (process.env.NODE_ENV==="production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")))

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  })
}

// REPLACE express app.listen with socket server.listen
// app.listen(PORT, () => {
server.listen(PORT, () => {
  console.log('server is running on PORT: ' + PORT)
  connectDB()
})
