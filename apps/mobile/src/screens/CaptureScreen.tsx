import { CameraView, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { useRef, useState } from 'react';
import { Alert, Button, Text, View } from 'react-native';
import { enhanceForReadability } from '../services/imagePipeline';
import { runLocalOcr } from '../services/ocr';
import { saveScan } from '../store/scanStore';

export function CaptureScreen({ navigation }: any) {
  const [permission, requestPermission] = useCameraPermissions();
  const camRef = useRef<CameraView>(null);
  const [busy, setBusy] = useState(false);

  if (!permission?.granted) {
    return <Button title="Grant camera" onPress={requestPermission} />;
  }

  const onCapture = async () => {
    try {
      setBusy(true);
      const photo = await camRef.current?.takePictureAsync({ quality: 1, skipProcessing: false });
      if (!photo?.uri) throw new Error('Capture failed');
      const enhancedUri = await enhanceForReadability(photo.uri);
      const ocrText = await runLocalOcr(enhancedUri);
      const id = `${Date.now()}`;
      const target = `${FileSystem.documentDirectory}${id}.png`;
      await FileSystem.copyAsync({ from: enhancedUri, to: target });
      await saveScan({
        id,
        projectId: 'default',
        originalUri: photo.uri,
        enhancedUri: target,
        ocrText,
        tags: [],
        createdAt: new Date().toISOString()
      });
      navigation.navigate('Library');
    } catch (e) {
      Alert.alert('Capture error', e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView ref={camRef} style={{ flex: 1 }} />
      <Text>{busy ? 'Processing scan…' : 'Ready for blueprint capture'}</Text>
      <Button title="Capture High-Res" onPress={onCapture} disabled={busy} />
      <Button title="View Library" onPress={() => navigation.navigate('Library')} />
    </View>
  );
}
