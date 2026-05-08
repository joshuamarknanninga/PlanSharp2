import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { loadScans } from '../store/scanStore';
import { Scan } from '../types/scan';

export function LibraryScreen({ navigation }: any) {
  const [scans, setScans] = useState<Scan[]>([]);
  useFocusEffect(useCallback(() => { loadScans().then(setScans); }, []));

  return (
    <FlatList
      data={scans}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigation.navigate('ScanDetail', { scanId: item.id })}>
          <View style={{ padding: 12 }}>
            <Text>{item.createdAt}</Text>
            <Text numberOfLines={2}>{item.ocrText}</Text>
          </View>
        </Pressable>
      )}
    />
  );
}
