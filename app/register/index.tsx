// @ts-nocheck
import { router } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable } from 'react-native';
import DropdownSelect from 'react-native-input-select';
import { YStack, Spinner, Text, XStack, useMedia, Form, Button, Input, Label } from 'tamagui';

import api from '../../lib/api';

export default function Page() {
  const media = useMedia();
  const [status, setStatus] = useState('off');
  const { control, handleSubmit } = useForm({ mode: 'onBlur' });
  const [isCustomer, setIsCustomer] = useState();

  const onSubmit = async (data) => {
    setStatus('submitting');
    if (isCustomer) {
      const res = await api
        .post('/user/register/customer', data, {
          toastify: true,
          errorMessage: 'Failed to register!',
          successMessage: 'Register successful',
        })
        .then(() => {
          router.push('/');
        })
        .catch((err) => {
          return err;
        });
    } else {
      const res = await api
        .post('/user/register/owner', data, {
          toastify: true,
          errorMessage: 'Failed to register!',
          successMessage: 'Register successful',
        })
        .then(() => {
          router.push('/');
        })
        .catch((err) => {
          return err;
        });
    }
    setStatus('');
  };

  return (
    <XStack flex={1} ai="center" px="$5" bg="#ffffff" >
      <YStack
        animation="quick"
        enterStyle={{ scale: 1.2, y: -8, opacity: 0 }}
        space="$6"
        width="100%">
        <YStack space="$2" height={100}>
          <Text fontWeight="700" fontSize={media.md ? 36 : 18} marginBottom={10}>
            Register
          </Text>
          <Text fontSize={20}>Create new account for you</Text>
        </YStack>
        <YStack space="$1" width="100%">
          <Form onSubmit={() => setStatus('submitting')}>
            <YStack space="$2" height={100}>
              <Label color="black">Name</Label>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value}
                    color="black"
                    backgroundColor="white"
                    autoCapitalize="none"
                    placeholder="name"
                    onChangeText={(value) => onChange(value)}
                  />
                )}
              />
            </YStack>
            <YStack space="$2" height={100}>
              <Label color="black" htmlFor="email">
                Email
              </Label>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value}
                    color="black"
                    backgroundColor="white"
                    autoCapitalize="none"
                    placeholder="email"
                    onChangeText={(value) => onChange(value)}
                  />
                )}
              />
            </YStack>
            <YStack space="$2" height={100}>
              <Label color="black" htmlFor="password">
                Password
              </Label>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value}
                    secureTextEntry
                    color="black"
                    backgroundColor="white"
                    autoCapitalize="none"
                    placeholder="password"
                    onChangeText={(value) => onChange(value)}
                  />
                )}
              />
            </YStack>
            <YStack space="$2" height={100}>
              <Label color="black">Role</Label>
              <DropdownSelect
                placeholder="Choose your role"
                options={[
                  { name: 'Customer', value: true },
                  { name: 'Owner', value: false },
                ]}
                optionLabel="name"
                optionValue="value"
                selectedValue={isCustomer}
                onValueChange={(itemValue: any) => setIsCustomer(itemValue)}
                dropdownErrorTextStyle={{ color: 'red', fontWeight: '500' }}
                dropdownStyle={{
                  height: 10,
                }}
                primaryColor="green"
              />
            </YStack>
            <Form.Trigger marginTop="$4" asChild disabled={status !== 'off'}>
              <Button
                onPress={handleSubmit(onSubmit)}
                icon={status === 'submitting' ? () => <Spinner /> : undefined}>
                Register
              </Button>
            </Form.Trigger>
          </Form>
        </YStack>
      </YStack>
      <XStack
        gap={5}
        paddingTop={40}
        position="absolute"
        left={0}
        right={0}
        bottom="$10"
        justifyContent="center"
        alignItems="center">
        <Text>Already have an account?</Text>
        <Pressable onPress={() => router.push('/')}>
          <Text fontWeight="bold">Login</Text>
        </Pressable>
      </XStack>
    </XStack>
  );
}