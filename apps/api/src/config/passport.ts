import passport from 'passport';
import passportJWT from 'passport-jwt';
import cookieExtractor from '../utils/cookie-extractor';
import { getUserById } from '../models/user';

const { Strategy: JwtStrategy } = passportJWT;
const jwtOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await getUserById(jwtPayload.id);

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
