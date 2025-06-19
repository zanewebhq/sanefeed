import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export interface Inputs {
  email: string;
}

const defaultValues: Inputs = {
  email: '',
};

const schema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Please enter a valid email address.' }),
});

const useSendRecoveryCodeForm = () => {
  return useForm<Inputs>({
    defaultValues,
    resolver: zodResolver(schema),
  });
};

export default useSendRecoveryCodeForm;
