import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Button, useTheme } from 'react-native-paper'
import { StackScreenProps } from '@react-navigation/stack'
import { createPartyAsync } from '../services/fetch'
import { PartyData, TabOneParamList } from '../types/common'

export default function PartyMenuScreen({
  navigation,
}: StackScreenProps<TabOneParamList, 'PartyMenuScreen'>): JSX.Element {
  const newParty: PartyData = {
    slug: Math.random().toString(36).substr(2, 6),
    startDate: new Date(),
    pin: Math.floor(1000 + Math.random() * 9000),
    members: [],
    partyHost: {
      name: 'JimBob',
      restaurants: []
    }
  }

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [party, setParty] = useState<PartyData | null>(null)

  const createPartyHandler = () => {
    setLoading(true)
    createPartyAsync(newParty, setParty as React.Dispatch<React.SetStateAction<PartyData>>, setError, setLoading)
  }

  const joinPartyHandler = () => {
    console.log('todo join party...')
    setLoading(true)
  }

  return (
    <View>
      <Text>Party Menu</Text>
      {loading && <Text>Loading...</Text>}
      {!loading && <Text>{error}</Text>}
      {!loading && party && (
        <View>
          <Text>ID: {party.slug}</Text>
          <Text>PIN: {party.pin}</Text>
          <Button onPress={() => navigation.navigate('PartyDetailsScreen', { slug: party.slug, pin: party.pin })}>Go to your party</Button>
        </View>
      )}
      {!loading && !party && (
        <View>
          <Button onPress={createPartyHandler}>Create a party</Button>
          <Button onPress={joinPartyHandler}>Join a party</Button>
        </View>
      )}
    </View>
  )
}
