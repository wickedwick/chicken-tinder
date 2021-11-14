import React, { useContext, useEffect, useState } from 'react'
import {
    View, Text, StyleSheet
} from 'react-native'
import { useTheme } from 'react-native-paper'
import { StackScreenProps } from '@react-navigation/stack'
import Restaurant from '../components/Restaurant'
import { Member, PartyData, RestaurantData } from '../types/common'
import { getRestaurantsAsync } from '../services/fetch'
import { TabTwoParamList } from '../types/common'
import { PartyContext } from '../context/PartyContext'
import { Swipeable } from 'react-native-gesture-handler'
import { getPartyAsync, putPartyAsync } from '../services/fetch'

export default function RestaurantListScreen({
  navigation,
}: StackScreenProps<TabTwoParamList, 'RestaurantListScreen'>): JSX.Element {
  const [restaurants, setRestaurants] = useState<Array<RestaurantData>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { colors } = useTheme()
  const { party, setParty, myMember } = useContext(PartyContext)
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantData | null>(null)

  useEffect(() => {
    getRestaurantsAsync(setRestaurants, setError, setLoading)
  }, [])

  const leftAction = (): JSX.Element => {
    return (
      <View>
        <Text style={styles.noText}>NOPE</Text>
        <Text style={styles.displayText}>Next</Text>
      </View>
    )
  }

  const rightAction = (): JSX.Element => {
    return (
      <View>
        <Text style={styles.yesText}>YEP</Text>
        <Text style={styles.displayText}>Let&apos;s eat</Text>
      </View>
    )
  }

  const removeFromArray = (index: number) => {
    const restaurantList: RestaurantData[] = Array.from(restaurants)
    restaurantList.splice(index, 1)

    setRestaurants(restaurantList)
  }

  const restaurantVote = async (index: number) => {
    const restaurant = restaurants[index]
    await getPartyAsync(party.id || 0, setParty, setError, setLoading)
    const memoizedParty = { ...party }

    let partyMember = memoizedParty.members.find(x => x.name === myMember.name)
    if (!partyMember && myMember.name === memoizedParty.partyHost.name) {
        partyMember = memoizedParty.partyHost
    }

    if (!partyMember) return

    partyMember.restaurants.push(restaurant)
    findMatches(restaurant)
    await updateParty(index, partyMember, restaurant, memoizedParty)
  }

  const findMatches = (restaurant: RestaurantData) => {
    let memberVotes = party.members.filter(x => x.restaurants.find(r => r.name === restaurant.name)).length
    const isMatched = party.partyHost.restaurants.find(x => x.name === restaurant.name) && memberVotes >= party.members.length

    if(isMatched) {
      setSelectedRestaurant(restaurant)
    }
  }

  const updateParty = async (index: number, member: Member, restaurant: RestaurantData, party: PartyData) => {
    setParty(party)
    await putPartyAsync(party, () => {}, setError, setLoading)
    removeFromArray(index)
  }

  return (
    <View style={styles.container}>
      {loading && <Text>Loading...</Text>}
      {!loading && selectedRestaurant && <Text>You&apos;re a match! {selectedRestaurant.name}</Text>}
      {!loading && party.slug.length > 0 && !restaurants.length && <Text style={styles.titleText}>No more restaurants!</Text>}
      {!loading && !party.slug && (
        <Text style={styles.titleText}>Join a party to begin swiping!</Text>
      )}
      {!loading && party.slug.length > 0 && restaurants.length > 0 && (
        <Swipeable
          renderRightActions={leftAction}
          onSwipeableRightOpen={() => removeFromArray(0)}
          renderLeftActions={rightAction}
          onSwipeableLeftOpen={() => restaurantVote(0)}
        >
          <Restaurant restaurant={restaurants[0]} />
        </Swipeable>
      )}
      <Text style={{ color: colors.error }}>{error}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  textInput: {
    borderRadius: 0,
    marginTop: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  displayText: {
    fontSize: 20,
  },
  yesText: {
    color: 'green',
    fontSize: 20,
  },
  noText: {
    color: 'red',
    fontSize: 20,
  },
});
