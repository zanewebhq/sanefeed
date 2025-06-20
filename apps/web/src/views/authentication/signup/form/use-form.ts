import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export interface Inputs {
  email: string;
  password: string;
}

const defaultValues: Inputs = {
  email: '',
  password: '',
};

export const schema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Please enter a valid email address.' }),
  password: z
    .string()
    .min(1, { message: 'Password is required.' })
    .min(8, { message: 'Weak. Add a minimum of 8 characters.' })
    .max(128, { message: 'Password should not exceed 128 characters.' }),
});

const useSignupForm = () => {
  return useForm<Inputs>({
    defaultValues,
    resolver: zodResolver(schema),
  });
};

export default useSignupForm;
