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

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
