import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { getVariantName } from '@/utility/HelperUtils'
import Toast from 'react-native-root-toast';
import { router } from 'expo-router';
import VariantButton from '@/components/VariantButton'
import AddToCartButton from '@/components/AddToCartButton'
import SelectQuantityComp from '@/components/SelectQuantityComp'

const ProductPage = () => {
  const params = useLocalSearchParams()
  const product = JSON.parse(String(params.details))

  const [selectedVariant, setSelectedVariant] = React.useState(0)
  const [selectedVariantName, setSelectedVariantName] = React.useState<string>(getVariantName(product.variants.edges[0].node.title))
  const [quantity, setQuantity] = React.useState(1)
  const [imageLoading, setImageLoading] = React.useState(true)

  const productImage = product.variants.edges[selectedVariant].node.image.url

  const productPriceObj = product.variants.edges[selectedVariant].node.price
  const productPrice = productPriceObj.amount
  const productPriceUnit = productPriceObj.currencyCode
  const productPriceText = "$" + " " + productPrice + " " + productPriceUnit

  function handleOnVariantPress (item: string, index: number) {
    setSelectedVariant(index)
    setSelectedVariantName(getVariantName(item))
  }

  function handleOnQuantityIncreasePress () {
    setQuantity(prev => prev + 1)
  }

  function handleOnQuantityDecreasePress () {
    setQuantity(prev => prev > 1 ? prev - 1 : prev)
  }

  function handleOnAddToCartPress () {
    router.back()

    Toast.show(`Added to cart:  ${product.title}, Q - ${quantity}, Variant - ${selectedVariantName?.toUpperCase()}`, {
      backgroundColor: 'rgba(1,1,1,0.95)',
      textColor: 'white',
      textStyle: {fontSize: 13, paddingHorizontal: 10, includeFontPadding: false},
      containerStyle: {borderRadius: 100, paddingHorizontal: 8},
      duration: Toast.durations.LONG,
    });
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* product image */}
        <View style={styles.imageContainer}>
          <Image
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
            resizeMethod='resize'
            resizeMode='stretch'
            source={{ uri: productImage }}
            style={styles.productImage} 
          />

          {
            imageLoading &&
            <ActivityIndicator 
              size={35}
              color={'black'}
              style={styles.imageLoadingIndicator}
            />
          }
        </View>

        {/* product title */}
        <Text style={styles.title}>{product.title}</Text>
        
        {/* product price */}
        <Text style={styles.price}>{productPriceText}</Text>

        {/* product variants */}
        <View style={styles.variantsContainer}>
          {
            product.variants.edges.map((item: any, index: any) => {
              return <VariantButton key={index} text={item.node.title} index={index} isSelected={selectedVariant == index} onPress={handleOnVariantPress} />
            })
          }
          <Text style={styles.selectedVariantText}> Variant {selectedVariant + 1} - {selectedVariantName?.toUpperCase()}</Text>
        </View>

        {/* product description */}
        <Text style={styles.description}>{product.description}</Text>

        {/* quantity */}
        <SelectQuantityComp onDecreasePress={handleOnQuantityDecreasePress} quantity={quantity} onIncreasePress={handleOnQuantityIncreasePress} />
        
        <View style={{ marginVertical: 16 }} />
      </ScrollView>
      
      {/* add to cart */}
      <AddToCartButton onPress={handleOnAddToCartPress} />
    </View>
  )
}

export default ProductPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  imageContainer: {
    width: "100%",
    justifyContent: "center",
  },
  productImage: {
    width: "100%",
    aspectRatio: 1,
  },
  imageLoadingIndicator: {
    position: "absolute",
    right: 0,
    left: 0,
  },
  title: {
    marginTop: 16,
    paddingHorizontal: 16,
    fontSize: 24,
    fontWeight: "600",
  },
  price: {
    marginTop: 4,
    paddingHorizontal: 16,
    fontWeight: "600",
  },
  variantsContainer: {
    marginTop: 12,
    paddingHorizontal: 16,
    gap: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  selectedVariantText: {
    paddingLeft: 16,
  },
  description: {
    marginTop: 16,
    paddingHorizontal: 16,
    color: "gray",
  },
});