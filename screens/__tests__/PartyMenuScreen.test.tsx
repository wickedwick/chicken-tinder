import React from 'react'
import { Text } from 'react-native'
import { configure, mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { PartyData } from '../../types/common'
import Party from '../../components/Party'
import PartyMenuScreen from '../PartyMenuScreen'
import { PartyContext } from '../../context/PartyContext'

configure({ adapter: new Adapter() })

jest.mock('../../services/fetch', () => {
  const party: PartyData = {
    slug: '29fw-9f9f',
    startDate: new Date('2021-04-23'),
    pin: 1294,
    members: [],
    partyHost: {
      id: 9,
      name: 'Marvin',
      restaurants: []
    },
  }

  return {
    createPartyAsync: (
      partyData: PartyData,
      func1: React.Dispatch<React.SetStateAction<PartyData | null>>,
      func2: React.Dispatch<React.SetStateAction<string>>,
      func3: React.Dispatch<React.SetStateAction<boolean>>,
    ) => {
      func1(party)
      func2('')
      func3(false)
    },
  }
})

const props: any = {}

describe("<PartyMenuScreen />", () => {
  it('Renders loading indicator', () => {
    const wrapper = mount(<PartyMenuScreen {...props} />, {
      wrappingComponent: PartyContext.Provider,
      wrappingComponentProps: { value: { party: { slug: '', pin: 0 }, addRestaurant: jest.fn(), setParty: jest.fn() } }
    })
    expect(wrapper.find(Text).length).toBeGreaterThanOrEqual(1)
  })
})
