import AsyncStorage from '@react-native-async-storage/async-storage';
import { Scan } from '../types/scan';

const KEY = 'plansharp-scans-v1';

export async function loadScans(): Promise<Scan[]> {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? (JSON.parse(raw) as Scan[]) : [];
}

export async function saveScan(scan: Scan): Promise<void> {
  const scans = await loadScans();
  scans.unshift(scan);
  await AsyncStorage.setItem(KEY, JSON.stringify(scans));
}
