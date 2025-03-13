import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{
        title: "Início",
        headerShown: true,
        headerStyle: { backgroundColor: '#121212' },
        headerTintColor: '#FFD700',
        headerTitleStyle: { fontWeight: 'bold' },
        gestureEnabled: true,
        animation: "slide_from_right"
      }} />
      <Stack.Screen name="about" options={{
        title: "Sobre",
        headerShown: true,
        headerStyle: { backgroundColor: '#121212' },
        headerTintColor: '#FFD700',
        headerTitleStyle: { fontWeight: 'bold' },
        gestureEnabled: true,
        animation: "slide_from_right"
      }} />
    </Stack>
  );
}
