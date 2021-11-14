/* eslint-disable react/style-prop-object */
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import Navigation from './navigation'
import useColorScheme from './hooks/useColorScheme'
import theme from './constants/Theme'
import { Member, PartyData } from './types/common'
import { emptyParty, PartyContext } from './context/PartyContext'
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

export default function App(): JSX.Element {
    const colorScheme = useColorScheme()
    const [stateParty, setStateParty] = useState<PartyData>(emptyParty)
    const [myMember, setMyMember] = useState<Member | null>(null)
    const [username, setUserName] = useState<string>('')

    const partySetter = (party: PartyData): void => {
        setStateParty(party)
    }

    const usernameSetter = (username: string): void => {
        setUserName(username)
        setMyMember({ name: username, restaurants: myMember?.restaurants ?? [] })
    }

    const initialState: { myMember: Member, party: PartyData, setParty: (party: PartyData) => void, setUsername: (username: string) => void } = {
        myMember: myMember || { name: username, restaurants: [] },
        party: stateParty,
        setParty: partySetter,
        setUsername: usernameSetter
    }

    const client = new ApolloClient({
        uri: "http://localhost:1337/graphql",
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={client}>
            <PartyContext.Provider value={initialState}>
                <PaperProvider theme={theme}>
                    <Navigation colorScheme={colorScheme} />
                    <StatusBar style="auto" />
                </PaperProvider>
            </PartyContext.Provider>
        </ApolloProvider>
    )
}
