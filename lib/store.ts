import * as SecureStore from 'expo-secure-store';

export async function setStore(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export async function getStore(key) {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log('Error');
  }
}
