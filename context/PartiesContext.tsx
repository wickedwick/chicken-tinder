import React from 'react'
import { Member, PartyData, RestaurantData } from '../types/common'

const initialPartyState: { party: PartyData | null } = {
  party: null
}

const partyContextWrapper = (component?: React.Component) => ({
  ...initialPartyState,
  setParty: (party: PartyData) => {
    initialPartyState.party === party
    component?.setState({ context: partyContextWrapper(component) })
  },
  addRestaurant: (restaurant: RestaurantData, member: Member) => {
    const partyMember = initialPartyState.party?.members.find(x => x.id === member.id)
    if (!partyMember) return

    partyMember.restaurants.push(restaurant)
    component?.setState({ context: partyContextWrapper(component) })
  }
})

type Context = ReturnType<typeof partyContextWrapper>

export const PartiesContext = React.createContext<Context>(partyContextWrapper())

interface State {
  context: Context
}

export class PartyContextProvider extends React.Component {
  state: State = {
    context: partyContextWrapper(this),
  }

  render() {
    return (
      <PartiesContext.Provider value={this.state.context}>
        {this.props.children}
      </PartiesContext.Provider>
    )
  }
}
