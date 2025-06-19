import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export interface Inputs {
  email: string;
  code: string;
}

const defaultValues: Inputs = {
  email: '',
  code: '',
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
});

const usePasswordRecoveryForm = () => {
  return useForm<Inputs>({
    defaultValues,
    resolver: zodResolver(schema),
  });
};

export default usePasswordRecoveryForm;
