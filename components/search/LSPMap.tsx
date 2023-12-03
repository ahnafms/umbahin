import { YStack, H3, ZStack, XStack, Text } from 'tamagui';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { getRegionForCoordinates } from '../../lib/helper.js';
import axios from 'axios';

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
    console.log(res.data.data);
    setLsp(res.data.data);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      if (location) setLocation(location);
    })();

    getNearest();
  }, []);

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
              if (data.lat) {
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
        </MapView>
      ) : (
        <Text>Identifying current location ...</Text>
      )}
      <XStack
        height="$space.12"
        pt="$space.6"
        alignItems="center"
        space="$space.3"
        pl="$space.4"
        width="100%"
        bg="#ffffff">
        <Ionicons name="arrow-back" size={24} color="black" />
        <H3 color="$blue8">Nearest Laundry</H3>
      </XStack>
    </ZStack>
  );
}
