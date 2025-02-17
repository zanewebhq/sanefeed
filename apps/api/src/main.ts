import express from 'express';
import passport from 'passport';
import passportJWT from 'passport-jwt';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Pool } from 'pg';
import cors from 'cors';

const app = express();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const { Strategy: JwtStrategy, ExtractJwt } = passportJWT;
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const res = await pool.query('SELECT * FROM users WHERE id = $1', [
        jwtPayload.id,
      ]);
      if (res.rows.length > 0) {
        return done(null, res.rows[0]);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

app.use(express.json());
app.use(passport.initialize());
app.use(cors());

app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      [email, hashedPassword]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'User registration failed' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, jwtOptions.secretOrKey);
    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);

    res.status(500).json({ error: 'Login failed' });
  }
});

app.get(
  '/api/protected',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      message: 'You have accessed a protected route!',
      user: req.user,
    });
  }
);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
