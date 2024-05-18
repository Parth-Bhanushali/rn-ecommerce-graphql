import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const CollectionItem = ({ collection, onProductPress }) => {
  const { node } = collection
  const { title, description, handle } = node
  const products = node.products.edges

  const header = title

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{header}</Text>
      <Text style={styles.descriptionText}>{description}</Text>


      <View style={styles.productsContainer}>
        {
          products.map((item, index) => {
            const product = item.node

            const productTitle = product.title
            const productImage = product.images.edges[0].node.url
            const productPriceObj = product.variants.edges[0].node.price
            const productPrice = productPriceObj.amount
            const productPriceUnit = productPriceObj.currencyCode
            const productPriceText = "$" + " " + productPrice + " " + productPriceUnit

            return (
              <TouchableOpacity
                activeOpacity={0.75}
                key={index}
                onPress={() => onProductPress(item, index)}
                style={styles.productItem}
              >
                <Image
                  resizeMethod='resize'
                  source={{ uri: productImage }}
                  style={styles.productImage}
                />

                <View>
                  <Text style={styles.productTitleText}>{productTitle}</Text>
                  <Text style={styles.productPriceText}>{productPriceText}</Text>
                </View>
              </TouchableOpacity>
            )
          })
        }
      </View>
    </View>
  )
}

export default CollectionItem

const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },
  headerText: {
    fontSize: 24, fontWeight: '700', color: 'rgba(1,1,1,0.95)'
  },
  descriptionText: {
    color: 'rgba(1,1,1,0.6)'
  },
  productsContainer: {
    flexDirection: 'row', gap: 16, flex: 1, marginTop: 16
  },
  productItem: {
    flex: 1, gap: 8
  },
  productImage: {
    aspectRatio: 1, flex: 1
  },
  productTitleText: {
    fontSize: 13
  },
  productPriceText: {
    fontSize: 15, fontWeight: '600'
  }
})