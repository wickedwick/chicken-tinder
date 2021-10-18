import React from 'react'
import { format } from 'date-fns'
import { StyleSheet, View } from 'react-native'
import { Card, Text, useTheme } from 'react-native-paper'
import { FilmProps } from '../types/starWars/films'

const Film = (props: FilmProps): JSX.Element => {
    const { title, episode_id, release_date } = props.film
    const releasedDate = new Date(release_date)
    const formattedDate = release_date ? format(releasedDate, 'MM/dd/yyyy') : ''
    const { colors } = useTheme()
    const styles = createStyles(colors)

    return (
        <View style={styles.filmPanel}>
            <Card style={styles.card}>
                <Card.Title
                    title={`Star Wars Episode ${episode_id}`}
                    subtitle={title}
                    titleStyle={styles.cardTitle}
                    subtitleStyle={styles.cardSubtitle}
                />
                <Card.Content>
                    <Text style={{ color: 'black' }}>
                        Released {formattedDate}
                    </Text>
                </Card.Content>
            </Card>
        </View>
    )
}

export default Film

const createStyles = (colors: ReactNativePaper.ThemeColors) => StyleSheet.create({
    filmPanel: {
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
