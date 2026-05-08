import * as ImageManipulator from 'expo-image-manipulator';

export async function enhanceForReadability(uri: string): Promise<string> {
  const result = await ImageManipulator.manipulateAsync(
    uri,
    [{ rotate: 0 }],
    { compress: 1, format: ImageManipulator.SaveFormat.PNG }
  );
  return result.uri;
}

export async function applyPerspectiveCorrection(uri: string): Promise<string> {
  return uri;
}
