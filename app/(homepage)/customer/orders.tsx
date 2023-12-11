import { useEffect, useState } from 'react';
import { YStack, H6, ScrollView, Text, Spinner, XStack } from 'tamagui';
import { MaterialIcons } from '@expo/vector-icons';

import CardOrder from '../../../components/CardOrder';
import api from '../../../lib/api';
import { Link } from 'expo-router';

export default function Orders() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    const data = await api.get('/order');
    setData(data.data.data);
    console.log(data.data.data)
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {isLoading ? (
        <YStack jc="center" ai="center" flex={1}>
          <Spinner size="large" />
        </YStack>
      ) : (
        <YStack
          backgroundColor="#EDEFF2"
          flex={1}
          alignItems="flex-start"
          justifyContent="flex-start"
          gap="$4">
          <ScrollView px={16} paddingTop="$11">
            <YStack flex={1} paddingBottom="$12" flexDirection="column" gap={24} ai="flex-start">
              {data ? (
                data.map((item, index) => {
                  return (
                    item.status !== 'COMPLETE' && (
                      <CardOrder
                        key={index}
                        id={item.id}
                        name={item.Service.Owner.User.name}
                        status={item.status}
                        laundryIn={item.laundryIn}
                      />
                    )
                  );
                })
              ) : (
                <Text>No order yet.</Text>
              )}
            </YStack>
          </ScrollView>
        </YStack>
      )}
    </>
  );
}
