import { useForm } from '@tanstack/react-form';
import { router } from 'expo-router';
import * as z from 'zod';

const schema = z.object({
  countryCode: z.string(),
  phoneNumber: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^\d+$/, 'Phone number must contain only digits'),
});

export function usePhoneInput() {
  const form = useForm({
    defaultValues: {
      countryCode: '+92',
      phoneNumber: '',
    },
    validators: {
      onBlur: schema as any,
      onChange: schema as any,
    },
    onSubmit: async ({ value }) => {
      // Navigate to OTP verification screen
      router.push({
        pathname: '/verify-otp',
        params: {
          phoneNumber: `${value.countryCode}${value.phoneNumber}`,
        },
      });
    },
  });

  return {
    form,
  };
}
