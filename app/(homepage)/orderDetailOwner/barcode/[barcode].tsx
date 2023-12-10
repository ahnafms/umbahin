import { router, Link, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import QRCode from 'react-native-qrcode-svg';
import { View } from 'tamagui';

export default function Barcode() {
  const { barcode } = useLocalSearchParams();
  console.log(barcode);
  const isPresented = router.canGoBack();
  return (
    <View flex={1} ai="center" jc="center">
      {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
      {!isPresented && <Link href="../">Dismiss</Link>}
      {/* Native modals have dark backgrounds on iOS, set the status bar to light content. */}
      <QRCode size={200} value={barcode} />
      <StatusBar style="light" />
    </View>
  );
}
