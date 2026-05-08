import * as Sharing from 'expo-sharing';
import { Image, ScrollView, Text, View, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { loadScans } from '../store/scanStore';
import { Scan } from '../types/scan';

export function ScanDetailScreen({ route }: any) {
  const [scan, setScan] = useState<Scan | null>(null);
  useEffect(() => { loadScans().then((s) => setScan(s.find((x) => x.id === route.params.scanId) ?? null)); }, [route.params.scanId]);
  if (!scan) return <Text>Not found</Text>;

  return (
    <ScrollView>
      <Image source={{ uri: scan.enhancedUri }} style={{ width: '100%', height: 500 }} resizeMode="contain" />
      <View style={{ padding: 12 }}>
        <Text selectable>{scan.ocrText}</Text>
        <Button title="Share Export" onPress={() => Sharing.shareAsync(scan.enhancedUri)} />
      </View>
    </ScrollView>
  );
}
