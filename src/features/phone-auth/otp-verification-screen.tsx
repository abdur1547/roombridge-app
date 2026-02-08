import { useForm } from '@tanstack/react-form';
import { router, useLocalSearchParams } from 'expo-router';
import * as React from 'react';
import * as z from 'zod';

import { Button, Input, Text, View } from '@/components/ui';
import { getFieldError } from '@/components/ui/form-utils';
import { translate } from '@/lib/i18n';

const schema = z.object({
  otp: z
    .string()
    .length(6, 'OTP must be exactly 6 digits')
    .regex(/^\d+$/, 'OTP must contain only digits'),
});

export function OtpVerificationScreen() {
  const { phoneNumber } = useLocalSearchParams<{ phoneNumber: string }>();

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
  };

  const handleEditNumber = () => {
    router.back();
  };

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <View className="flex-1 justify-center px-6">
        {/* Header */}
        <View className="mb-8">
          <Text className="mb-2 text-3xl font-bold text-black dark:text-white">
            {translate('otpVerification.title')}
          </Text>
          <Text className="text-base text-neutral-600 dark:text-neutral-400">
            {translate('otpVerification.subtitle')}
          </Text>
          {phoneNumber && (
            <View className="mt-3">
              <Text className="text-center text-lg font-semibold text-black dark:text-white">
                {phoneNumber}
              </Text>
              <Button
                label={translate('otpVerification.editNumber')}
                onPress={handleEditNumber}
                variant="link"
                className="mt-1"
              />
            </View>
          )}
        </View>

        {/* OTP Input */}
        <form.Field
          name="otp"
          children={field => (
            <Input
              label={translate('otpVerification.otpLabel')}
              placeholder="000000"
              value={field.state.value}
              onChangeText={field.handleChange}
              onBlur={field.handleBlur}
              keyboardType="number-pad"
              maxLength={6}
              error={getFieldError(field)}
              style={{ textAlign: 'center', fontSize: 24, letterSpacing: 8 }}
              className="mb-6 rounded-xl border-2 border-neutral-300 dark:border-neutral-700"
            />
          )}
        />

        {/* Verify Button */}
        <form.Subscribe
          selector={state => [state.isSubmitting, state.canSubmit]}
          children={([isSubmitting, canSubmit]) => (
            <Button
              label={translate('otpVerification.verify')}
              loading={isSubmitting}
              disabled={!canSubmit}
              onPress={form.handleSubmit}
              variant="default"
              size="lg"
            />
          )}
        />

        {/* Resend OTP */}
        <View className="mt-6 flex-row items-center justify-center">
          <Text className="text-sm text-neutral-600 dark:text-neutral-400">
            {translate('otpVerification.didntReceive')}
            {' '}
          </Text>
          <Button
            label={translate('otpVerification.resend')}
            onPress={handleResendOtp}
            variant="link"
          />
        </View>
      </View>
    </View>
  );
}
