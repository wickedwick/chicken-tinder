import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Button, Text, useTheme } from 'react-native-paper'
import { getStarWarsDataAsync } from '../services/fetch'
import { TabTwoParamList } from '../types/common'
import { CharacterData } from '../types/starWars/characters'
import Character from '../components/Character'

export default function CharacterListScreen({
    navigation,
}: StackScreenProps<TabTwoParamList, 'CharacterListScreen'>): JSX.Element {
    const [characters, setCharacters] = useState<Array<CharacterData>>([])
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const { colors } = useTheme()

    useEffect(() => {
        getStarWarsDataAsync(
            'https://swapi.dev/api/people/',
            setCharacters,
            setError,
            setLoading,
        )
    }, [])

    return (
        <ScrollView>
            <View style={styles.container}>
                {isLoading && <Text>Loading...</Text>}
                {characters
          && characters.map((character) => (
              <View key={`${character.name}-view`}>
                  <Character
                      key={`${character.name}-character-card`}
                      character={character}
                  />
                  <Button
                      key={`${character.name}-link-button`}
                      onPress={() => navigation.navigate('CharacterDetailsScreen', {
                          url: character.url,
                      })}
                  >
                Go
                  </Button>
              </View>
          ))}
                <Text style={{ color: colors.error }}>{error}</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
})
