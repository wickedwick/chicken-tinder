import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, Text, useTheme } from 'react-native-paper'
import { PartyProps } from '../types/common'

const Party = (props: PartyProps): JSX.Element => {
  const { party } = props
  const { colors } = useTheme()

  return (
    <View>
      <Card>
        <Card.Title
          title={party.slug}
          subtitle={`PIN ${party.pin}`}
        />
        <Card.Content>
          <Text>{party.partyHost.name}</Text>
          {party.members.map((member) => (
            <View key={`${member.id}-${member.name}`}>
              <Text>{member.name}</Text>
            </View>
          ))}
        </Card.Content>
      </Card>
    </View>
  )
}

export default Party