import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const HeaderLeft = ({ onBackPress }) => {
  return (
    <TouchableOpacity
      onPress={onBackPress}
      activeOpacity={0.8}
      style={styles.headerLeftContainer}
    >
      <Image
        resizeMode='contain'
        source={require("@/assets/images/menu_icon.png")}
        style={styles.headerLeftIcon}
      />
    </TouchableOpacity>
  )
}

const HeaderHome = ({ title, onBackPress }) => {
  return (
    <SafeAreaView>
      <View
        style={styles.headerContainer}
      >
        <View style={styles.headerLeftWrapper}>
          <HeaderLeft onBackPress={onBackPress} />
        </View>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{title}</Text>
          <Text style={styles.headerSubTitle}>{"by Parth Bhanushali"}</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default HeaderHome

const styles = StyleSheet.create({
  headerContainer: {
    height: 56,
    backgroundColor: "white",
    flexDirection: "row",
  },
  headerLeftWrapper: {
    position: "absolute",
    left: 0,
    height: "100%",
    justifyContent: "center",
  },
  headerTitleContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  headerSubTitle: {
    fontSize: 10,
    color: "gray",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  headerLeftContainer: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  headerLeftIcon: {
    width: 22,
    height: 22,
    tintColor: "black",
  },
});