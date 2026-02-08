import * as React from 'react';
import { Pressable } from 'react-native';

import { Button, Input, Text, View } from '@/components/ui';
import { getFieldError } from '@/components/ui/form-utils';
import { translate } from '@/lib/i18n';
import { useOtpVerification } from './use-otp-verification';

export function OtpVerificationScreen() {
  const { form, phoneNumber, resendTimer, handleResendOtp, handleEditNumber }
    = useOtpVerification();

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
            <Pressable
              onPress={handleEditNumber}
              className="mt-3 flex-row items-center justify-center gap-2"
            >
              <Text className="text-center text-lg font-semibold text-black dark:text-white">
                {phoneNumber}
              </Text>
              <Text className="text-base font-medium text-blue-600 dark:text-blue-400">
                {translate('otpVerification.editNumber')}
              </Text>
            </Pressable>
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
            label={
              resendTimer > 0
                ? `${translate('otpVerification.resend')} (${resendTimer}s)`
                : translate('otpVerification.resend')
            }
            onPress={handleResendOtp}
            variant="link"
            disabled={resendTimer > 0}
          />
        </View>
      </View>
    </View>
  );
}
