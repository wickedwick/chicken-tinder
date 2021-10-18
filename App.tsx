/* eslint-disable react/style-prop-object */
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import Navigation from './navigation'
import useColorScheme from './hooks/useColorScheme'
import theme from './constants/Theme'

export default function App(): JSX.Element {
    const colorScheme = useColorScheme()

    return (
        <PaperProvider theme={theme}>
            <Navigation colorScheme={colorScheme} />
            <StatusBar style="auto" />
        </PaperProvider>
    )
}
