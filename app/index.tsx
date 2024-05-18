import React from 'react';
import {FlatList, Text, View, StyleSheet, Image, ActivityIndicator, Alert} from 'react-native';
import { useQuery } from '@apollo/client';
import { COLLECTIONS_QUERY } from '../network/query'
import { Colors } from '@/constants/Colors';
import { useNavigation } from 'expo-router';
import HeaderHome from '@/components/HeaderHome'

const CollectionItem = ({ collection, onPress } : any) => {
  const { node } = collection
  const { title, description, handle } = node
  const products = node.products.edges

  const header = title

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: '700', color: 'rgba(1,1,1,0.95)' }}>{header}</Text>
      <Text style={{ color: 'rgba(1,1,1,0.6)' }}>{description}</Text>

      <View style={{ marginVertical: 8 }} />

      <View style={{ flexDirection: 'row', gap: 16, flex: 1 }}>
        {
          products.map((item: any, index: any) => {
            const product = item.node

            const productTitle = product.title
            const productDescription = product.description
            const productImage = product.images.edges[0].node.url
            const productPriceObj = product.variants.edges[0].node.price
            const productPrice = productPriceObj.amount
            const productPriceUnit = productPriceObj.currencyCode
            const productPriceText = "$" + " " + productPrice + " " + productPriceUnit

            return (
              <View key={index} style={{ flex: 1, gap: 8 }}>
                <Image 
                  resizeMethod='resize'
                  source={{ uri: productImage }}
                  style={{ aspectRatio: 1, flex: 1 }}
                />

                <View>
                  <Text style={{ fontSize: 13 }}>{productTitle}</Text>
                  <Text style={{ fontSize: 15, fontWeight: '600' }}>{productPriceText}</Text>
                </View>
              </View>
            )
          })
        }
      </View>
    </View>
  )
}

export default function Index() {
  const {data, loading, error} = useQuery(COLLECTIONS_QUERY);
  const navigation = useNavigation();

  function onMenuPress () {
    Alert.alert('Alert', "This has not been implemented.")
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
        <View style={{ gap: 16 }}>
          <Image 
            resizeMode='cover'
            source={require('../assets/images/hero.jpg')}
            style={{ width: '120%', backgroundColor: 'lightgray', height: 225, alignSelf: 'center' }}
          />

          <Text style={{ fontSize: 30, fontWeight: '300', marginBottom: 16 }}>Browse Collections</Text>
        </View>
      }
      renderItem={({ item, index }) => (
        <CollectionItem
          collection={item}
          onPress={() => {}}
        />
      )}
      keyExtractor={(item, index) => index + ""}
      contentContainerStyle={{ backgroundColor: 'white', flexGrow: 1, padding: 16, paddingTop: 0, }}
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
});
