import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, Text, useTheme } from 'react-native-paper'
import { RestaurantProps } from '../types/common'

const Restaurant = (props: RestaurantProps): JSX.Element => {
  const { restaurant } = props
  const { colors } = useTheme()

  return (
    <View>
      <Card>
        <Card.Title
          title={restaurant.name}
        />
        <Card.Cover source={{ uri: restaurant.image.url }} />
      </Card>
    </View>
  )
}

export default Restaurant