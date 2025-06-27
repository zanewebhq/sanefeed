import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export interface Inputs {
  password: string;
  newEmail: string;
}

const defaultValues: Inputs = {
  password: '',
  newEmail: '',
};

const schema = z.object({
  password: z.string().min(1, { message: 'Password is required.' }),
  newEmail: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Please enter a valid email address.' }),
});

const useRequestEmailChangeForm = () => {
  return useForm<Inputs>({
    defaultValues,
    resolver: zodResolver(schema),
  });
};

export default useRequestEmailChangeForm;
