import login from './login';
import logout from './logout';
import signup from './signup';
import verify from './verify';
import resendVerification from './resend-verification';
import recover from './recover';
import sendRecovery from './send-recovery';

const auth = {
  login,
  logout,
  signup,
  verify,
  resendVerification,
  recover,
  sendRecovery,
};

export default auth;
