import dayjs from 'dayjs';

const validateCode = (
  providedCode: string,
  storedCode: string,
  expiresAt: Date
) => {
  const currentTime = dayjs();
  const expiresAtTime = dayjs(expiresAt);

  const isActive = currentTime.isBefore(expiresAtTime);
  const isMatching = providedCode === storedCode;

  return isActive && isMatching;
};

export default validateCode;
