import passport from 'passport';

const protect = passport.authenticate('jwt', {
  failWithError: true,
  session: false,
});

export default protect;
