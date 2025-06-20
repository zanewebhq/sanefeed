import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export interface Inputs {
  password: string;
}

const defaultValues: Inputs = {
  password: '',
};

const schema = z.object({
  password: z
    .string()
    .min(1, { message: 'Password is required.' })
    .min(8, { message: 'Weak. Add a minimum of 8 characters.' })
    .max(128, { message: 'Password should not exceed 128 characters.' }),
});

const useUpdatePasswordForm = () => {
  return useForm<Inputs>({
    defaultValues,
    resolver: zodResolver(schema),
  });
};

export default useUpdatePasswordForm;
