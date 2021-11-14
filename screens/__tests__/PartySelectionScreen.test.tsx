import React from 'react'
import { Text } from 'react-native'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { withHooks } from 'jest-react-hooks-shallow'
import { PartyContext } from '../../context/PartyContext'
import { PartyData, RestaurantData } from '../../types/common'
import PartySelectionScreen from '../PartySelectionScreen'

configure({ adapter: new Adapter() })

jest.mock('../../services/fetch', () => {
  const restaurants: RestaurantData[] = [
    {
      id: 1,
      name: 'Josey Baking Co.',
      image: {
        url: 'http://localhost:1337/images/1',
        alternativeText: 'Josey Baking Co picture'
      }
    },
    {
      id: 2,
      name: 'Wickham\'s Baked Goods',
      image: {
        url: 'http://localhost:1337/images/2',
        alternativeText: 'Wickham\'s picture'
      }
    }
  ]

  const party: PartyData = {
    id: 1,
    members: [],
    slug: 'party-1',
    pin: 1234,
    partyHost: {
      id: 1,
      name: 'John Doe',
      restaurants: [],
    }
  }

  return {
    getRestaurantsAsync: (
      func1: React.Dispatch<React.SetStateAction<Array<RestaurantData> | null>>,
      func2: React.Dispatch<React.SetStateAction<string>>,
      func3: React.Dispatch<React.SetStateAction<boolean>>,
    ) => {
        func1(restaurants)
        func2('')
        func3(false)
    },
    getPartyBySlugPinAsync: (
      slug: string,
      pin: string,
      func1: React.Dispatch<React.SetStateAction<PartyData | null>>,
      func2: React.Dispatch<React.SetStateAction<string>>,
      func3: React.Dispatch<React.SetStateAction<boolean>>,
    ) => {
      func1(party)
      func2('')
      func3(false)
    }
  }
})

const props: any = {}

describe('<PartySelectionScreen />', () => {
  it('Renders', () => {
    withHooks(() => {
      const wrapper = mount(<PartySelectionScreen {...props} />, {
        wrappingComponent: PartyContext.Provider,
        wrappingComponentProps: { value: { party: { slug: '767gh', pin: 0 }, myMember: { name: 'Jimbob', restaurants: [] }, addRestaurant: jest.fn(), setParty: jest.fn() } }
      })
      expect(wrapper.find(Text).length).toBeGreaterThanOrEqual(1)
    })
  })
})
