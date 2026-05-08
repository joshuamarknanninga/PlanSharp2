import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CaptureScreen } from '../screens/CaptureScreen';
import { LibraryScreen } from '../screens/LibraryScreen';
import { ScanDetailScreen } from '../screens/ScanDetailScreen';

export type RootStackParamList = {
  Capture: undefined;
  Library: undefined;
  ScanDetail: { scanId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Capture" component={CaptureScreen} />
      <Stack.Screen name="Library" component={LibraryScreen} />
      <Stack.Screen name="ScanDetail" component={ScanDetailScreen} />
    </Stack.Navigator>
  );
}
