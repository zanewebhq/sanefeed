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
  password: z.string().min(1, { message: 'Current password is required.' }),
});

const useRequestPasswordChangeForm = () => {
  return useForm<Inputs>({
    defaultValues,
    resolver: zodResolver(schema),
  });
};

export default useRequestPasswordChangeForm;
