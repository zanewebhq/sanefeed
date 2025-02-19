import passport from 'passport';
import passportJWT from 'passport-jwt';
import { pool } from '../database';

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
