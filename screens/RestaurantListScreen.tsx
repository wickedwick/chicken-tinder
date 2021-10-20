import React, { useEffect, useState } from 'react'
import {
    StyleSheet, View, Text, Animated, FlatList
} from 'react-native'
import { Button, useTheme } from 'react-native-paper'
import { StackScreenProps } from '@react-navigation/stack'
import Restaurant from '../components/Restaurant'
import { Member, RestaurantData } from '../types/common'
import { getRestaurantsAsync } from '../services/fetch'
import { TabTwoParamList } from '../types/common'
import { PartyContext } from '../context/PartyContext'
import { Swipeable } from 'react-native-gesture-handler'

export default function RestaurantListScreen({
  navigation,
}: StackScreenProps<TabTwoParamList, 'RestaurantListScreen'>): JSX.Element {
  const [restaurants, setRestaurants] = useState<Array<RestaurantData>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { colors } = useTheme()
  const [translateX, setTranslateX] = useState(new Animated.Value(0))

  useEffect(() => {
    getRestaurantsAsync(setRestaurants, setError, setLoading)
  }, [])

  const leftAction = (): JSX.Element => {
    return (
      <View>
        <Text>NOPE</Text>
      </View>
    )
  }

  const rightAction = (): JSX.Element => {
    return (
      <View>
        <Text>YEP</Text>
      </View>
    )
  }

  const removeFromArray = (index: number) => {
    const restaurantList: RestaurantData[] = Array.from(restaurants)
    restaurantList.splice(index, 1)

    setRestaurants(restaurantList)
  }

  const restaurantVote = (index: number, setter: (restaurant: RestaurantData, member: Member) => void) => {
    const restaurant = restaurants[index]
    // setter(restaurant, member)
    console.log('swiped yes')
    removeFromArray(index)
  }

  return (
    <PartyContext.Consumer>
      {({ party, addRestaurant }) => (
        <View>
          {loading && <Text>Loading...</Text>}
          {!loading && party.slug.length > 0 && !restaurants.length && <Text>No more restaurants!</Text>}
          {!loading && !party.slug && (
            <Text>Join a party to begin swiping!</Text>
          )}
          {!loading && party.slug.length > 0 && (
            <FlatList
              data={restaurants}
              keyExtractor={restaurant => `${restaurant.id}`}
              renderItem={({ item, index }): JSX.Element => {
                return (
                  <Swipeable
                    renderRightActions={leftAction}
                    onSwipeableRightOpen={() => removeFromArray(index)}
                    renderLeftActions={rightAction}
                    onSwipeableLeftOpen={() => restaurantVote(index, addRestaurant)}
                  >
                    <Restaurant restaurant={item} />
                  </Swipeable>
                )
              }}
            />
          )}
          <Text style={{ color: colors.error }}>{error}</Text>
        </View>
      )}
    </PartyContext.Consumer>
  )
}
