import * as React from 'react';

import { Button, Input, Text, View } from '@/components/ui';
import { getFieldError } from '@/components/ui/form-utils';
import { translate } from '@/lib/i18n';
import { usePhoneInput } from './use-phone-input';

export function PhoneInputScreen() {
  const { form } = usePhoneInput();

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <View className="flex-1 justify-center px-6">
        {/* Header */}
        <View className="mb-8">
          <Text className="mb-2 text-3xl font-bold text-black dark:text-white">
            {translate('phoneAuth.title')}
          </Text>
          <Text className="text-base text-neutral-600 dark:text-neutral-400">
            {translate('phoneAuth.subtitle')}
          </Text>
        </View>

        {/* Phone Number Row */}
        <View className="mb-2">
          <Text className="mb-1 text-lg text-neutral-600 dark:text-neutral-100">
            {translate('phoneAuth.phoneNumber')}
          </Text>
          <View className="flex-row gap-2">
            {/* Country Code */}
            <form.Field
              name="countryCode"
              children={field => (
                <View className="w-20">
                  <Input
                    value={field.state.value}
                    onChangeText={field.handleChange}
                    onBlur={field.handleBlur}
                    editable={false}
                    className="rounded-xl border-[0.5px] border-neutral-300 bg-neutral-200 p-3 text-center text-base font-medium opacity-60 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                  />
                </View>
              )}
            />

            {/* Phone Number Input */}
            <form.Field
              name="phoneNumber"
              children={field => (
                <View className="flex-1">
                  <Input
                    placeholder="3001234567"
                    value={field.state.value}
                    onChangeText={field.handleChange}
                    onBlur={field.handleBlur}
                    keyboardType="phone-pad"
                    error={getFieldError(field)}
                    className="rounded-xl border-[0.5px] border-neutral-300 bg-neutral-100 px-4 py-3 text-base font-medium dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                  />
                </View>
              )}
            />
          </View>
        </View>

        {/* Submit Button */}
        <form.Subscribe
          selector={state => [state.isSubmitting, state.canSubmit]}
          children={([isSubmitting, canSubmit]) => (
            <Button
              label={translate('phoneAuth.sendOtp')}
              loading={isSubmitting}
              disabled={!canSubmit}
              onPress={form.handleSubmit}
              variant="default"
              size="lg"
            />
          )}
        />

        {/* Info Text */}
        <Text className="mt-4 text-center text-sm text-neutral-500 dark:text-neutral-400">
          {translate('phoneAuth.infoText')}
        </Text>
      </View>
    </View>
  );
}
