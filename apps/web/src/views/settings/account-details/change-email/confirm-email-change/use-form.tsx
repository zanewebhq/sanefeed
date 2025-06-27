import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export interface Inputs {
  code: string;
}

const defaultValues: Inputs = {
  code: '',
};

const schema = z.object({
  code: z
    .string()
    .min(1, 'Verification code is required.')
    .min(6, 'Verification code must be 6 characters.')
    .max(6, 'Verification code must be 6 characters.'),
});

const useConfirmEmailChangeForm = () => {
  return useForm<Inputs>({
    defaultValues,
    resolver: zodResolver(schema),
  });
};

export default useConfirmEmailChangeForm;
