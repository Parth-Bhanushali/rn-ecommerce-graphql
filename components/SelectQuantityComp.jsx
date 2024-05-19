import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const SelectQuantityComp = ({ onDecreasePress, quantity, onIncreasePress }) => {
  return (
    <View>
      <Text style={styles.label}>Quantity</Text>

      <View
        style={styles.quantityBoxContainer}
      >
        <TouchableOpacity onPress={onDecreasePress} activeOpacity={0.55} style={styles.button}>
          <Text style={styles.minusButtonText}>-</Text>
        </TouchableOpacity>

        <View style={styles.button}>
          <Text style={styles.quantityText}>{quantity}</Text>
        </View>

        <TouchableOpacity onPress={onIncreasePress} activeOpacity={0.55} style={styles.button}>
          <Text style={styles.plusButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SelectQuantityComp

const styles = StyleSheet.create({
  label: {
    marginTop: 12,
    paddingHorizontal: 16,
  },
  quantityBoxContainer: {
    marginHorizontal: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 4,
    alignSelf: "flex-start",
    flexDirection: "row",
  },
  button: {
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  minusButtonText: {
    fontSize: 30,
    includeFontPadding: false,
  },
  quantityText: {
    fontSize: 18,
    includeFontPadding: false,
  },
  plusButtonText: {
    fontSize: 20,
    includeFontPadding: false,
  },
});