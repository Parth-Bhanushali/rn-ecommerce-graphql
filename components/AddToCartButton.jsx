import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const AddToCartButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={styles.button}
    >
      <Text style={styles.buttonText}>Add to cart</Text>
    </TouchableOpacity>
  )
}

export default AddToCartButton

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(1,1,1,0.9)', padding: 16, marginHorizontal: 16, marginVertical: 16, borderRadius: 6
  },
  buttonText: {
    includeFontPadding: false, fontSize: 16, color: 'white', fontWeight: '700', textAlign: 'center', fontFamily: 'monospace'
  }
})