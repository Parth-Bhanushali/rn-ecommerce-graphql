import { Stack } from "expo-router";
import { ApolloProvider } from '@apollo/client';
import client from '../network/client'
import { RootSiblingParent } from 'react-native-root-siblings';

// root of the application
export default function RootLayout() {
  return (
    <RootSiblingParent>
      <ApolloProvider client={client}>
        <Stack>
          {/* home page */}
          <Stack.Screen name="index" />
          
          {/* product page */}
          <Stack.Screen name="ProductPage" options={{ headerTitle: "Product details", headerBackTitle: "Home" }} />
        </Stack>
      </ApolloProvider>
    </RootSiblingParent>
  );
}
