import { Stack } from "expo-router";
import {ApolloProvider} from '@apollo/client';
import client from '../network/client'

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="ProductPage" options={{ headerTitle: "Product details" }} />
      </Stack>
    </ApolloProvider>
  );
}
