import crypto from 'crypto';
import dayjs from 'dayjs';

const generateCode = () => {
  const code = crypto.randomBytes(3).toString('hex').toUpperCase();
  const expiresAt = dayjs().add(1, 'hour').toDate();

  return { code, expiresAt };
};

export default generateCode;
