import passport from 'passport';
import passportJWT from 'passport-jwt';
import { pool } from '../database';
import cookieExtractor from '../utils/cookie-extractor';

const { Strategy: JwtStrategy } = passportJWT;
const jwtOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const res = await pool.query('SELECT * FROM users WHERE id = $1', [
        jwtPayload.id,
      ]);

      const user = res.rows.at(0);

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);
