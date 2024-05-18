import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const HeaderLeft = ({ onBackPress }) => {
  return (
    <TouchableOpacity
      onPress={onBackPress}
      activeOpacity={0.8}
      style={{ paddingLeft: 16, paddingRight: 8 }}
    >
      <Image
        resizeMode='contain'
        source={require("@/assets/images/menu_icon.png")}
        style={{ width: 22, height: 22, tintColor: 'black' }}
      />
    </TouchableOpacity>
  )
}

const HeaderHome = ({ title, onBackPress }) => {
  return (
    <SafeAreaView>
      <View
        style={{
          height: 56, backgroundColor: 'white', flexDirection: "row",
        }}
      >
        <View style={{ position: "absolute", left: 0, height: "100%", justifyContent: "center" }}>
          <HeaderLeft onBackPress={onBackPress} />
        </View>

        <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>{title}</Text>
          <Text style={{ fontSize: 10, color: 'gray' }}>{"by Parth Bhanushali"}</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default HeaderHome

const styles = StyleSheet.create({})