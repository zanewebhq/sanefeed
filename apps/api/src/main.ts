import express from 'express';
import passport from 'passport';
import cors from 'cors';
import routes from './routes';
import './config/passport';
import AppError from './utils/app-error';
import errorHandler from './middleware/error';

const app = express();

app.use(express.json());
app.use(passport.initialize());
app.use(cors());

app.use('/api', routes.auth);
app.use('/api', routes.user);

app.all('*', (req, res, next) => {
  next(new AppError('Route not found', 404));
});

app.use(errorHandler);

const server = app.listen(3333, () => {
  console.log(`Listening at http://localhost:3333/api`);
});

server.on('error', console.error);
