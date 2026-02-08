import { useForm } from '@tanstack/react-form';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import * as z from 'zod';

const schema = z.object({
  otp: z
    .string()
    .length(6, 'OTP must be exactly 6 digits')
    .regex(/^\d+$/, 'OTP must contain only digits'),
});

export function useOtpVerification() {
  const { phoneNumber } = useLocalSearchParams<{ phoneNumber: string }>();
  const [resendTimer, setResendTimer] = useState(60);

  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resendTimer]);

  const form = useForm({
    defaultValues: {
      otp: '',
    },
    validators: {
      onBlur: schema as any,
      onChange: schema as any,
    },
    onSubmit: async ({ value }) => {
      // TODO: Add backend verification logic here
      console.log('Verifying OTP:', value.otp, 'for phone:', phoneNumber);

      // For now, just navigate to the app
      // Replace with actual verification and navigation logic
      router.replace('/(app)');
    },
  });

  const handleResendOtp = () => {
    // TODO: Add resend OTP logic
    console.log('Resending OTP to:', phoneNumber);
    setResendTimer(60); // Reset timer to 60 seconds
  };

  const handleEditNumber = () => {
    router.back();
  };

  return {
    form,
    phoneNumber,
    resendTimer,
    handleResendOtp,
    handleEditNumber,
  };
}
