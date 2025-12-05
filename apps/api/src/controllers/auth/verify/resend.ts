import { Response } from 'express';
import catchAsync from '../../../utils/catch-async';
import { StatusCodes } from 'http-status-codes';
import sendEmail from '../../../utils/send-email';
import { RequestWithUser } from '../../../types';
import { updateUser } from '../../../models/user';
import generateCode from '../../../utils/generate-code';
import sanitizeUser from '../../../utils/sanitize-user';

const resendVerification = catchAsync(
  async (req: RequestWithUser, res: Response) => {
    if (req.user.verified) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'error',
        message: 'User is already verified.',
      });
    }

    const { code, expiresAt } = generateCode();

    const user = await updateUser(req.user.id, {
      verification_code: code,
      verification_code_expires_at: expiresAt,
    });

    await sendEmail({
      email: req.user.email,
      subject: 'Verification code',
      text: `Your verification code is: ${code}.`,
    });

    const sanitizedUser = sanitizeUser(user);

    res.status(StatusCodes.OK).json({
      status: 'success',
      data: {
        user: sanitizedUser,
      },
    });
  },
);

export default resendVerification;
