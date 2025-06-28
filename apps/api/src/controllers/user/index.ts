import changeEmail from './change-email';
import confirmEmailChange from './change-email/confirm';
import changePassword from './change-password';
import confirmPasswordChange from './change-password/confirm';
import me from './me';

const user = {
  me,
  changeEmail,
  confirmEmailChange,
  changePassword,
  confirmPasswordChange,
};

export default user;
