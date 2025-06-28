import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export interface Inputs {
  currentPassword: string;
  newPassword: string;
}

const defaultValues: Inputs = {
  currentPassword: '',
  newPassword: '',
};

const schema = z.object({
  currentPassword: z
    .string()
    .min(1, { message: 'Current password is required.' }),
  newPassword: z
    .string()
    .min(1, { message: 'New password is required.' })
    .min(8, { message: 'Weak. Add a minimum of 8 characters.' })
    .max(128, { message: 'New password should not exceed 128 characters.' }),
});

const useRequestPasswordChangeForm = () => {
  return useForm<Inputs>({
    defaultValues,
    resolver: zodResolver(schema),
  });
};

export default useRequestPasswordChangeForm;
