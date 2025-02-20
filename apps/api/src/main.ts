import express from 'express';
import passport from 'passport';
import cors from 'cors';
import routes from './routes';
import './config/passport';

const app = express();

app.use(express.json());
app.use(passport.initialize());
app.use(cors());

app.use('/api', routes.auth);
app.use('/api', routes.user);

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    data: null,
    message: 'Route not found',
  });
});

const server = app.listen(3333, () => {
  console.log(`Listening at http://localhost:3333/api`);
});

server.on('error', console.error);
