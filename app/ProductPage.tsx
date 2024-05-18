import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { getColorCode } from '@/utility/HelperUtils'
import Toast from 'react-native-root-toast';
import { router } from 'expo-router';

function getVarientName (text: string) {
  if (text.includes('Small') || text.includes('Medium' || text.includes('Large'))) {
    const toBreak = text.includes('Small') ? 'Small'
                    : text.includes('Medium') ? 'Medium'
                    : text.includes('Large') ? 'Large'
                    : null

    const split = text.split(toBreak + " / ")
    return split[1].toLowerCase()
  }
}

const VarientButton = ({ text, index, onPress, isSelected }: any) => {
  let color = getVarientName(text);

  return (
    <TouchableOpacity onPress={() => onPress(text, index)} activeOpacity={1} style={{ alignItems: 'center', justifyContent: 'center' }}>
      {
        !!color ?
          <View style={{ borderColor: !isSelected ? 'white' : getColorCode(color), borderRadius: 50, borderWidth: 1, padding: 3 }}>
            <View
              style={{
                backgroundColor: getColorCode(color), alignSelf: 'flex-start',
                padding: 12, borderRadius: 50
              }}
            />
          </View>
          :
        // <View
        //   style={{
        //     backgroundColor: !color ? 'rgba(1,1,1,0.1)' : getColorCode(color), alignSelf: 'flex-start',
        //     paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8
        //   }}
        // >
        //   <Text style={{ includeFontPadding: false, fontWeight: '600', fontSize: 12, color: 'white' }}>{text}</Text>
        // </View>
        null
      }
    </TouchableOpacity>
  )
}

const AddToCartButton = ({ onPress } : any) => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={{ 
        backgroundColor: 'rgba(1,1,1,0.9)', padding: 16, marginHorizontal: 16, marginVertical: 16, borderRadius: 6 
      }}
    >
      <Text style={{ includeFontPadding: false, fontSize: 16, color: 'white', fontWeight: '700', textAlign: 'center', fontFamily: 'monospace' }}>Add to cart</Text>
    </TouchableOpacity>
  )
}

const SelectQuantityComp = ({ onDecreasePress, quantity, onIncreasePress } : any) => {
  return (
    <View>
      <Text style={{ marginTop: 12, paddingHorizontal: 16 }}>Quantity</Text>

      <View
        style={{
          marginHorizontal: 16, marginTop: 12,
          borderWidth: 1, borderColor: 'lightgray', borderRadius: 4,
          alignSelf: 'flex-start', flexDirection: 'row'
        }}
      >
        <TouchableOpacity onPress={onDecreasePress} activeOpacity={0.55} style={{ width: 45, height: 45, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 30, includeFontPadding: false }}>-</Text>
        </TouchableOpacity>

        <View style={{ width: 45, height: 45, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 18, includeFontPadding: false }}>{quantity}</Text>
        </View>

        <TouchableOpacity onPress={onIncreasePress} activeOpacity={0.55} style={{ width: 45, height: 45, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 20, includeFontPadding: false }}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const ProductPage = () => {
  const params = useLocalSearchParams()
  const product = JSON.parse(String(params.details))

  const [selectedVarient, setSelectedVarient] = React.useState(0)
  const [selectedVarientName, setSelectedVarientName] = React.useState<string | undefined | null>(getVarientName(product.variants.edges[0].node.title))
  const [quantity, setQuantity] = React.useState(1)
  const [imageLoading, setImageLoading] = React.useState(true)

  const productImage = product.variants.edges[selectedVarient].node.image.url

  const productPriceObj = product.variants.edges[0].node.price
  const productPrice = productPriceObj.amount
  const productPriceUnit = productPriceObj.currencyCode
  const productPriceText = "$" + " " + productPrice + " " + productPriceUnit

  function handleOnVarientPress (item: string, index: number) {
    setSelectedVarient(index)
    setSelectedVarientName(getVarientName(item))
  }

  function handleOnQuantityIncreasePress () {
    setQuantity(prev => prev + 1)
  }

  function handleOnQuantityDecreasePress () {
    setQuantity(prev => prev > 1 ? prev - 1 : prev)
  }

  function handleOnAddToCartPress () {
    router.back()

    Toast.show(`Added to cart:  ${product.title}, Q - ${quantity}, Variant - ${selectedVarientName?.toUpperCase()}`, {
      backgroundColor: 'rgba(1,1,1,0.95)',
      textColor: 'white',
      textStyle: {fontSize: 13, paddingHorizontal: 10, includeFontPadding: false},
      containerStyle: {borderRadius: 100, paddingHorizontal: 8},
      duration: Toast.durations.LONG,
    });
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}>
        {/* image */}
        <View style={{ width: '100%', justifyContent: 'center' }}>
          <Image
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
            resizeMethod='resize'
            resizeMode='stretch'
            source={{ uri: productImage }}
            style={{ width: '100%', aspectRatio: 1 }} 
          />

          {
            imageLoading &&
            <ActivityIndicator 
              size={35}
              color={'black'}
              style={{ position: 'absolute', right: 0, left: 0 }}
            />
          }
        </View>

        {/* title */}
        <Text style={{ marginTop: 16, paddingHorizontal: 16, fontSize: 24, fontWeight: '600' }}>{product.title}</Text>
        
        {/* price */}
        <Text style={{ marginTop: 4, paddingHorizontal: 16, fontWeight: '600' }}>{productPriceText}</Text>

        {/* variants */}
        <View style={{ marginTop: 12, paddingHorizontal: 16, gap: 4, flexDirection: 'row', alignItems: 'center' }}>
          {
            product.variants.edges.map((item: any, index: any) => {
              return <VarientButton key={index} text={item.node.title} index={index} isSelected={selectedVarient == index} onPress={handleOnVarientPress} />
            })
          }
          <Text style={{ paddingLeft: 16 }}> Varient {selectedVarient + 1} - {selectedVarientName?.toUpperCase()}</Text>
        </View>

        {/* description */}
        <Text style={{ marginTop: 16, paddingHorizontal: 16, color: 'gray' }}>{product.description}</Text>

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

const styles = StyleSheet.create({})