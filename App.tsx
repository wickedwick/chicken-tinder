/* eslint-disable react/style-prop-object */
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import Navigation from './navigation'
import useColorScheme from './hooks/useColorScheme'
import theme from './constants/Theme'
import { Member, PartyData, RestaurantData } from './types/common'
import { emptyParty, PartyContext } from './context/PartyContext'

export default function App(): JSX.Element {
    const colorScheme = useColorScheme()
    const [stateParty, setStateParty] = useState<PartyData>(emptyParty)

    const partySetter = (party: PartyData): void => {
        setStateParty(party)
    }

    const addRestaurant = (restaurant: RestaurantData, member: Member) => {
        const party = { ...stateParty }
        const partyMember = party.members.find(x => x.id === member.id)
        if (!partyMember) return

        partyMember.restaurants.push(restaurant)
        setStateParty(party)
    }

    const initialState: { party: PartyData, setParty: (party: PartyData) => void, addRestaurant: (restaurant: RestaurantData, member: Member) => void } = {
        party: stateParty,
        setParty: partySetter,
        addRestaurant: addRestaurant
    }

    return (
        <PartyContext.Provider value={initialState}>
            <PaperProvider theme={theme}>
                <Navigation colorScheme={colorScheme} />
                <StatusBar style="auto" />
            </PaperProvider>
        </PartyContext.Provider>
    )
}
