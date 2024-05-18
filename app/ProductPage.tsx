import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const ProductPage = () => {
  const params = useLocalSearchParams()
  const product = params

  return (
    <View>
      <Text>Product details: {product.title}</Text>
    </View>
  )
}

export default ProductPage

const styles = StyleSheet.create({})