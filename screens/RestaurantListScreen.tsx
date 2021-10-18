import React, { useEffect, useState } from 'react'
import {
    StyleSheet, View, Text,
} from 'react-native'
import { Button, useTheme } from 'react-native-paper'
import { StackScreenProps } from '@react-navigation/stack'
import Restaurant from '../components/Restaurant'
import { RestaurantData } from '../types/common'
import { getRestaurantsAsync } from '../services/fetch'
import { TabTwoParamList } from '../types/common'
import { PartiesContext } from '../context/PartiesContext'

export default function RestaurantListScreen({
  navigation,
}: StackScreenProps<TabTwoParamList, 'RestaurantListScreen'>): JSX.Element {
  const [restaurants, setRestaurants] = useState<Array<RestaurantData>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { colors } = useTheme()
  const { party, addRestaurant } = React.useContext(PartiesContext)

  useEffect(() => {
    getRestaurantsAsync(setRestaurants, setError, setLoading)
  }, [])

  return (
    <View>
      {loading && <Text>Loading...</Text>}
      {!loading && party && !restaurants.length && <Text>No more restaurants!</Text>}
      {!loading && !party && (
        <Text>Join a party to begin swiping!</Text>
      )}
      {party && restaurants &&
        restaurants.map((restaurant) => (
          <View key={`${restaurant.name}-${restaurant.id}`}>
            <Restaurant restaurant={restaurant} />
          </View>
        ))}
        <Text style={{ color: colors.error }}>{error}</Text>
    </View>
  )
}
