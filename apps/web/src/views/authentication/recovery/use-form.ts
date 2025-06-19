import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export interface Inputs {
  email: string;
  code: string;
  password: string;
}

const defaultValues: Inputs = {
  email: '',
  code: '',
  password: '',
};

const schema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Please enter a valid email address.' }),
  code: z
    .string()
    .min(1, 'Verification code is required.')
    .min(6, 'Verification code must be 6 characters.')
    .max(6, 'Verification code must be 6 characters.'),
  password: z
    .string()
    .min(1, { message: 'Password is required.' })
    .min(8, { message: 'Weak. Add a minimum of 8 characters.' })
    .max(128, { message: 'Password should not exceed 128 characters.' }),
});

const usePasswordRecoveryForm = () => {
  return useForm<Inputs>({
    defaultValues,
    resolver: zodResolver(schema),
  });
};

export default usePasswordRecoveryForm;
