import React from 'react'
import { Member, PartyData, RestaurantData } from '../types/common'

export const emptyParty: PartyData = {
  slug: '',
  pin: 0,
  members: [],
  partyHost: {
      name: '',
      restaurants: []
  }
}

export const PartyContext = React.createContext({
  party: emptyParty,
  setParty: (party: PartyData) => {},
  addRestaurant: (restaurant: RestaurantData, member: Member) => {},
})
