import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { StackScreenProps } from '@react-navigation/stack'
import { PartyData, TabOneParamList } from '../types/common'
import { PartyContext } from '../context/PartyContext'
import { getPartyBySlugPinAsync, putPartyAsync } from '../services/fetch';

export default function PartySelectionScreen({
  navigation
}: StackScreenProps<TabOneParamList, 'PartySelectionScreen'>): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [slug, setSlug] = useState('')
  const [pin, setPin] = useState(0)
  const { party, setParty, myMember } = useContext(PartyContext)
  const [preParty, setPreParty] = useState<PartyData | null>(null)

  const getPartiesHandler = async () => {
    await getPartyBySlugPinAsync(slug, pin, setPreParty, setError, setLoading)
  }
  
  const joinPartyHandler = async (party: PartyData) => {
    setLoading(true)
    party.members.push(myMember)
    await putPartyAsync(party, setParty, setError, setLoading)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Party Selection</Text>
      {loading && <Text>Loading...</Text>}
      {!loading && error.length > 0 && <Text>{error}</Text>}
      {!loading && party.slug.length > 0 && (
        <View>
          <Text>Joined!</Text>
          <Text>ID: {party.slug}</Text>
          <Text>PIN: {party.pin}</Text>
          <Button onPress={() => navigation.navigate('PartyDetailsScreen', { slug: party.slug, pin: party.pin })}>Go to your party</Button>
        </View>
      )}
      {!loading && preParty && preParty.slug.length > 0 && party.slug.length < 1 && (
        <View>
          <Text>ID: {preParty.slug}</Text>
          <Text>PIN: {preParty.pin}</Text>
          <Button onPress={() => joinPartyHandler(preParty)}>Join this party</Button>
        </View>
      )}
      {!loading && party.slug.length < 1 && (!preParty || preParty.slug.length < 1) && (
        <View>
          <TextInput
            label="Identifier"
            value={slug}
            onChangeText={text => setSlug(text)}
            style={styles.textInput}
          />
          <TextInput
            label="PIN"
            value={pin.toString()}
            onChangeText={text => setPin(parseInt(text, 10))}
            style={styles.textInput}
          />
          <Button onPress={getPartiesHandler}>
            Join
          </Button>
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
  }
});
