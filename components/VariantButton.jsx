import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { getColorCode, getVariantName } from '../utility/HelperUtils'

const VariantButton = ({ text, index, onPress, isSelected }) => {
  let color = getVariantName(text);

  return (
    <TouchableOpacity onPress={() => onPress(text, index)} activeOpacity={1} style={styles.button}>
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
          null
      }
    </TouchableOpacity>
  )
}

export default VariantButton

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
});