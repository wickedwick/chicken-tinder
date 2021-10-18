import React, { useEffect, useState } from 'react'
import {
    StyleSheet, View, Text, ScrollView,
} from 'react-native'
import { Button, useTheme } from 'react-native-paper'
import { StackScreenProps } from '@react-navigation/stack'
import Film from '../components/Film'
import { FilmData } from '../types/starWars/films'
import { getStarWarsDataAsync } from '../services/fetch'
import { TabOneParamList } from '../types/common'

export default function FilmListScreen({
    navigation,
}: StackScreenProps<TabOneParamList, 'FilmListScreen'>): JSX.Element {
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [films, setFilms] = useState<Array<FilmData>>([])
    const { colors } = useTheme()

    useEffect(() => {
        getStarWarsDataAsync(
            'https://swapi.dev/api/films/',
            setFilms,
            setError,
            setLoading,
        )
    }, [])

    return (
        <ScrollView>
            <View style={styles.container}>
                {isLoading && <Text>Loading...</Text>}
                {films
          && films.map((film) => (
              <View key={`${film.title}-view`}>
                  <Film key={`${film.title}-film-card`} film={film} />
                  <Button
                      key={`${film.title}-link-button`}
                      onPress={() => navigation.navigate('FilmDetailsScreen', { url: film.url })}
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
        textAlign: 'center',
        margin: 15,
    },
})
