/* eslint-disable no-console */
import express, { NextFunction, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';
import accountRouter from './routes/account';
import questionRouter from './routes/questions';

const app = express();
app.use(express.json());

dotenv.config();
const PORT = process.env.PORT ?? 8003;
const key1 = process.env.SESSION_KEY1;

mongoose.connect('mongodb+srv://jhayaly:otYJmzQ19fKp5FQS@cluster0.ki0ozef.mongodb.net/?tls=true')
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

const MongoDBStoreInstance = MongoDBStore(session);
const store = new MongoDBStoreInstance({
  uri: 'mongodb+srv://jhayaly:otYJmzQ19fKp5FQS@cluster0.ki0ozef.mongodb.net/?tls=true', 
  collection: 'sessions' 
});

app.use(session({
  secret: key1 ?? 'janas-secret-key', 
  resave: false,
  saveUninitialized: false,
  store: store, 
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 
  }
}));

app.use(cors({
  origin: 'http://localhost:3003', 
  credentials: true 
}));

app.use('/api/account', accountRouter);
app.use('/api/questions', questionRouter);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errorHandler(err: Error, req: express.Request, res: Response, next: NextFunction) {
  res.status(500).json({ message: err.message });
}
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}.`);
});
