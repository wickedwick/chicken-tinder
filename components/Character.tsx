import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, Text, useTheme } from 'react-native-paper'
import { CharacterProps } from '../types/starWars/characters'

const Character = (props: CharacterProps): JSX.Element => {
    const { character } = props
    const { colors } = useTheme()
    const styles = createStyles(colors)

    return (
        <View style={styles.characterPanel}>
            <Card style={styles.card}>
                <Card.Title
                    title={character.name}
                    subtitle={`Born ${character.birth_year}`}
                    titleStyle={styles.cardTitle}
                    subtitleStyle={styles.cardSubtitle}
                />
                <Card.Content>
                    <Text style={{ color: 'black' }}>
                        {character.name}
                        {' '}
            is a
                        {character.gender}
                        {' '}
            born in
                        {character.birth_year}
                    </Text>
                </Card.Content>
            </Card>
        </View>
    )
}

export default Character

const createStyles = (colors: ReactNativePaper.ThemeColors) => StyleSheet.create({
    characterPanel: {
        width: '100%',
    },
    cardTitle: {
        color: colors.primary,
    },
    cardSubtitle: {
        color: colors.accent,
    },
    card: {
        backgroundColor: colors.background,
        borderRadius: 0,
        marginBottom: 5,
        borderBottomColor: colors.accent,
        borderBottomWidth: 2,
        borderStyle: 'solid',
    },
})
