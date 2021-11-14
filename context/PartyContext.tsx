import React from 'react'
import { PartyData } from '../types/common'

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
  myMember: emptyParty.partyHost,
  party: emptyParty,
  setParty: (party: PartyData) => {},
  setUsername: (username: string) => {},
})
