import React from 'react';
import {FlatList, Text, View, StyleSheet, Image, ActivityIndicator, Alert} from 'react-native';
import { useQuery } from '@apollo/client';
import { COLLECTIONS_QUERY } from '../network/query'
import { Colors } from '@/constants/Colors';
import { useNavigation, router } from 'expo-router';
import HeaderHome from '@/components/HeaderHome'
import CollectionItem from '@/components/CollectionItem'

export default function Index() {
  const {data, loading, error} = useQuery(COLLECTIONS_QUERY);
  const navigation = useNavigation();

  function onMenuPress () {
    Alert.alert('Alert', "Clicked on menu icon.")
  }

  function onProductPress (product: any, index: number) {
    router.navigate({pathname: "ProductPage", params: {
      details: JSON.stringify(product.node)
    }})
  }

  React.useEffect(() => {
    navigation.setOptions({
      header: () => <HeaderHome title="E-commerce App" onBackPress={() => onMenuPress()} />,
    });
  }, [])

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator 
          color={Colors.text}
          size={45}
          style={{ width: 45, height: 45 }}
        />
      </View>
    );
  }

  if (error) {
    console.log("error: ", JSON.stringify(error))
    return (
      <View style={styles.container}>
        <Text style={[styles.infoText, styles.errorText]}>
          Error: {error.message}
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data.collections.edges}
      ListHeaderComponent={
        // hero
        <View style={styles.heroContainer}>
          <Image 
            resizeMode='cover'
            source={require('../assets/images/hero.jpg')}
            style={styles.heroImage}
          />

          <Text style={styles.heroHeader}>Browse Collections</Text>
        </View>
      }
      renderItem={({ item, index }) => (
        <CollectionItem
          collection={item}
          onProductPress={onProductPress}
        />
      )}
      keyExtractor={(item, index) => index + ""}
      contentContainerStyle={styles.contentContainer}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  list: {
    flex: 1,
    width: '100%',
  },
  infoText: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
  },
  errorText: {
    color: '#ce2727',
  },
  heroContainer: {
    gap: 16
  },
  heroImage: {
    width: '120%', backgroundColor: 'lightgray', height: 225, alignSelf: 'center'
  },
  heroHeader: {
    fontSize: 30, fontWeight: '300', marginBottom: 16
  },
  contentContainer: {
    backgroundColor: 'white', flexGrow: 1, padding: 16, paddingTop: 0
  }
});
