import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { StackScreenProps } from '@react-navigation/stack'
import { createPartyAsync } from '../services/fetch'
import { PartyData, TabOneParamList } from '../types/common'
import { PartyContext } from '../context/PartyContext'

export default function PartyMenuScreen({
  navigation,
}: StackScreenProps<TabOneParamList, 'PartyMenuScreen'>): JSX.Element {
  let newParty: PartyData = {
    slug: Math.random().toString(36).substr(2, 6),
    startDate: new Date(),
    pin: Math.floor(1000 + Math.random() * 9000),
    members: [],
    partyHost: {
      name: '',
      restaurants: []
    }
  }

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const {party, setParty, setUsername, myMember } = useContext(PartyContext)
  const [usernameInput, setUsernameInput] = useState(myMember.name)

  const createPartyHandler = async () => {
    setLoading(true)
    newParty.partyHost = { name: myMember.name, restaurants: [] }
    await createPartyAsync(newParty, setParty, setError, setLoading)
  }

  const setUsernameHandler = () => {
    setUsername(usernameInput)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Party Menu</Text>
      {loading && <Text>Loading...</Text>}
      {!loading && error.length > 0 && <Text>{error}</Text>}
      {!loading && (
        <View>
          <Text style={styles.displayText}>Current username: {myMember.name}</Text>
          <TextInput
            label='Username'
            value={usernameInput}
            onChangeText={(text) => setUsernameInput(text)}
            style={styles.textInput}
          />
          <Button onPress={setUsernameHandler}>Submit</Button>
        </View>
      )}
      {!loading && party.slug.length > 0 && (
        <View>
          <Text style={styles.displayText}>ID: {party.slug}</Text>
          <Text style={styles.displayText}>PIN: {party.pin}</Text>
          <Button onPress={() => navigation.navigate('PartyDetailsScreen', { slug: party.slug, pin: party.pin })}>Go to your party</Button>
        </View>
      )}
      {!loading && !party.slug && (
        <View>
          <Button onPress={createPartyHandler}>Create a party</Button>
          <Button onPress={() => navigation.navigate('PartySelectionScreen')}>Join a party</Button>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  textInput: {
    borderRadius: 0,
    marginTop: 20,
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
  }
});
