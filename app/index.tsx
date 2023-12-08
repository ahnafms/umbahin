// @ts-nocheck

import { Link, router } from 'expo-router';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Pressable } from 'react-native';
import { YStack, Spinner, Text, XStack, useMedia, Button, Input, Label } from 'tamagui';

import api from '../lib/api';
import { setStore } from '../lib/store';

export default function Page() {
  const media = useMedia();
  const [status, setStatus] = useState('off');
  const { control, handleSubmit } = useForm({ mode: 'onBlur' });

  const onSubmit = async (data) => {
    setStatus('submitting');
    const res = await api
      .post('/user/login', data, {
        toastify: true,
        errorMessage: 'failed to login...',
        successMessage: 'login successful',
      })
      .then((data) => {
        setStore('token', data.data.data.token);
        router.push('/(homepage)/');
      })
      .catch((err) => {
        return err;
      });
    setStatus('');
  };

  return (
    <YStack flex={1} justifyContent='center' height="100%" alignItems='center' px="$5" bg="#ffffff" position="relative">
      <YStack
        animation="quick"
        enterStyle={{ scale: 1.2, y: -8, opacity: 0 }}
        space="$6"
        width="100%">
        <YStack space="$2" height={100}>
          <Text fontWeight="700" fontSize={media.md ? 36 : 18} marginBottom={10}>
            Let's get started
          </Text>
          <Text fontSize={20}>Login into your account</Text>
        </YStack>
        <YStack width="100%">
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
                  id="email"
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
                  id="password"
                  placeholder="password"
                  onChangeText={(value) => onChange(value)}
                />
              )}
            />
          </YStack>
          <Text textAlign="right" mb="$3" fontWeight="700">
            Forget password?
          </Text>
          <Button
            onPress={handleSubmit(onSubmit)}
            icon={status === 'submitting' ? () => <Spinner /> : undefined}>
            Login
          </Button>
        </YStack>
      </YStack>
      <XStack
        gap={5}
        paddingTop={40}
        // position="absolute"
        // left={0}
        // right={0}
        // bottom="$10"
        justifyContent="center"
        alignItems="center">
        <Text>Don't have an account?</Text>
        <Link href="/register/" asChild>
          <Pressable>
            <Text fontWeight="bold">Register</Text>
          </Pressable>
        </Link>
      </XStack>
    </YStack>
  );
}
