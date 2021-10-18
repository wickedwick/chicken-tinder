import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import {
    ScrollView, StyleSheet, Text, View,
} from 'react-native'
import { useTheme } from 'react-native-paper'
import { getStarWarsDataSingleAsync } from '../services/fetch'
import { TabOneParamList } from '../types/common'
import { FilmData } from '../types/starWars/films'
import Film from '../components/Film'

export default function FilmDetailsScreen({
    route,
}: StackScreenProps<TabOneParamList, 'FilmDetailsScreen'>): JSX.Element {
    const [film, setFilm] = useState<FilmData | null>(null)
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const { url } = route.params
    const { colors } = useTheme()

    useEffect(() => {
        getStarWarsDataSingleAsync(url, setFilm, setError, setLoading)
    }, [])

    return (
        <ScrollView>
            <View style={styles.container}>
                {isLoading && <Text>Loading...</Text>}
                {film && (
                    <View>
                        <Film key={film.title} film={film} />
                    </View>
                )}
                <Text style={{ color: colors.error }}>{error}</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
