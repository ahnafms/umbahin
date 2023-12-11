import React, { useEffect, useState } from 'react';
import {
  YStack,
  Text,
  XStack,
  useMedia,
  Form,
  Button,
  Input,
  Label,
  Spacer,
  Theme,
  Image,
  ScrollView,
} from 'tamagui';
import { Entypo } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { getLaundryDetail } from '../../../lib/store/laundry';
import api from '../../../lib/api';
import { router } from 'expo-router';

export default function CreateOrderPage() {
  const { index } = useLocalSearchParams();
  const media = useMedia();

  const [selectedFeature, setSelectedFeature] = useState(null);
  const [service, setService] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getLaundryDetail(index);
      setService(data);
    })();
  }, []);

  const features = [
    { id: 1, name: 'Cuci Kering', type: 'CUCI_SETRIKA' },
    { id: 2, name: 'Cuci Basah', type: 'CUCI_BASAH' },
    { id: 3, name: 'Cuci Setrika', type: 'CUCI_KERING' },
  ];

  const getServiceName = (str: string) => {
    const find = features.find((f) => f.type == str);
    return find.name;
  };

  const submitOrder = async () => {
    const data  = {
      "estimatedTime" : "2023-12-12T18:06:51Z", 
      "serviceId" : String(service[selectedFeature].id)
    }

    console.log(data)

    const res = await api
      .post('/order', data, {
        toastify: true,
        errorMessage: 'failed to create order...',
        successMessage: 'Order successful',
      })
      .then((res) => {
          router.push('/(homepage)/customer/home');
      })
      .catch((err) => {
        return err;
      });
  };

  return (
    // <YStack>
    //   <Text>Select a feature:</Text>
    //   <XStack>
    //     {features.map((feature) => (
    //       <Button key={feature.id} onPress={() => chooseFeature(feature.id)}>
    //         <Text>{feature.name}</Text>
    //       </Button>
    //     ))}
    //   </XStack>
    //   <Text>Selected feature: {selectedFeature}</Text>
    //   <Button onPress={submitOrder}>
    //     <Text >Submit Order</Text>
    //   </Button>
    // </YStack>
    <Theme name="light">
      <ScrollView>
        <YStack pt="$11" width="100%" height="100%" bg="$gray3">
          <XStack px="$5" py="$3" alignContent="center" justifyContent="center">
            <Text fontSize={24} fontWeight={700}>
              Roumah Laundry
            </Text>
          </XStack>
          <XStack px="$5" py="$3">
            <XStack
              flex={1}
              bg="white"
              gap={2}
              padding={12}
              borderRadius={14}
              alignContent="center">
              <Entypo name="location-pin" size={24} color="#34ABEF" />
              <Text marginStart="$2" fontSize="$6" color="#929292">
                Jl. Sempit
              </Text>
            </XStack>
          </XStack>
          <XStack height="$15" backgroundColor="#222222" mx="$5" borderRadius={10}>
            <Image
              source={{
                uri: 'https://laundry8plm.b-cdn.net/wp-content/uploads/2023/02/apa-itu-laundry.jpg',
              }}
              style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: 10 }}
            />
          </XStack>
          <XStack px="$5" py="$3" mt="$5">
            <Text fontSize={20} fontWeight={500}>
              Pilih Layanan
            </Text>
          </XStack>
          <YStack px="$5" py="$3" gap="$2">
            {service &&
              service.map((feature, idx) => {
                const name = getServiceName(feature.type) ?? '';
                return (
                  <Button
                    key={idx}
                    backgroundColor={selectedFeature === idx ? '#34ABEF' : '#ffffff'}
                    onPress={(focused) => {
                      console.log(idx)
                      console.log(service)
                      setSelectedFeature(idx)
                    }}
                    borderColor={selectedFeature === idx ? '#34ABEF' : '#ffffff'}>
                    <Text fontWeight={600} color={selectedFeature === idx ? '#ffffff' : '#000000'}>
                      {name}
                    </Text>
                  </Button>
                );
              })}
          </YStack>
          <YStack px="$5" py="$3" mt="$5" height="100%" backgroundColor="#ffffff">
            <XStack mt="$5">
              <YStack flex={1} gap={2}>
                {/* <Text fontSize={20}>Berat</Text>
                <Text fontSize={24} fontWeight={700}>
                  2 Kg
                </Text> */}
              </YStack>
              <YStack gap={2}>
                <Text fontSize={20}>Harga</Text>
                <Text fontSize={24} fontWeight={700}>
                  {(selectedFeature || selectedFeature == 0) ? ("Rp. " + service[selectedFeature].price) : "Rp. 0"}
                </Text>
              </YStack>
            </XStack>
            <YStack py="$3" mt="$5">
              <Button backgroundColor="#34ABEF" onPress={submitOrder}>
                <Text fontWeight={600} fontSize={20} color="#ffffff">
                  Pesan Sekarang
                </Text>
              </Button>
            </YStack>
          </YStack>
        </YStack>
      </ScrollView>
    </Theme>
  );
}
