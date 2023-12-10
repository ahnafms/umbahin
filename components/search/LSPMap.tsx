import { YStack, H3, ZStack, XStack, Text } from 'tamagui';
import MapView, { Marker } from 'react-native-maps';
import { Pressable, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { getRegionForCoordinates } from '../../lib/helper.js';
import axios from 'axios';
import { Link } from 'expo-router';

export default function LspMap() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [lsp, setLsp] = useState(null);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });
  const getNearest = async () => {
    const res = await axios.get('https://laundry-app-backend.vercel.app/api/service/lsp');
    setLsp(res.data.data);
  };

  const [status, requestPermission] = Location.useForegroundPermissions();

  useEffect(() => {
    requestPermission().then((status) => {
      if (status && status.status != 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      } else {
        (async () => {
          let location = await Location.getCurrentPositionAsync({});
          if (location) setLocation(location);
        })();
      }

      getNearest();
    });
  }, [status]);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <ZStack width="100%" height="100%">
      <YStack width="100%" height="100%" style={styles.container}></YStack>
      {location ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={getRegionForCoordinates(
            location.coords.latitude ?? 0,
            location.coords.longitude ?? 0,
            1000
          )}>
          {lsp &&
            lsp.map((data, index) => {
              if (data.lat != null) {
                return (
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: data.lat,
                      longitude: data.long,
                    }}
                    title={data.name ?? ''}
                    description={data.address ?? ''}
                  />
                );
              }
            })}
          <Marker
            onPress={() => {
              console.log(location.coords.latitude, location.coords.longitude);
            }}
            coordinate={{
              latitude: location.coords.latitude ?? 0,
              longitude: location.coords.longitude ?? 0,
            }}
            title={'Home'}
            description={'Current Location'}
          />
        </MapView>
      ) : (
        <Text>Identifying current location ...</Text>
      )}
      <XStack
        height="$space.12"
        pt="$space.6"
        alignItems="center"
        space="$space.3"
        paddingHorizontal="$space.4"
        width="100%"
        bg="#ffffff">
        <XStack justifyContent="space-between" flex={1}>
          <Link href="/(homepage)/customer/home" asChild>
            <Pressable>
              <Ionicons name="arrow-back" size={24} color="black" />
            </Pressable>
          </Link>
          <H3 color="$blue8">Nearest Laundry</H3>
        </XStack>
      </XStack>
    </ZStack>
  );
}
