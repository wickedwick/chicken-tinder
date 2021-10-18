import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import {
    ScrollView, StyleSheet, Text, View,
} from 'react-native'
import { useTheme } from 'react-native-paper'
import { getStarWarsDataSingleAsync } from '../services/fetch'
import { TabTwoParamList } from '../types/common'
import { CharacterData } from '../types/starWars/characters'
import Character from '../components/Character'

export default function CharacterDetailsScreen({
    route,
}: StackScreenProps<TabTwoParamList, 'CharacterDetailsScreen'>): JSX.Element {
    const [character, setCharacter] = useState<CharacterData | null>(null)
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const { url } = route.params
    const { colors } = useTheme()

    useEffect(() => {
        getStarWarsDataSingleAsync(url, setCharacter, setError, setLoading)
    }, [])

    return (
        <ScrollView>
            <View style={styles.container}>
                {isLoading && <Text>Loading...</Text>}
                {character && (
                    <View>
                        <Character key={character.name} character={character} />
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
