import React from 'react'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { withHooks } from 'jest-react-hooks-shallow'
import { Text } from 'react-native'
import { PartyData, RestaurantData } from '../../types/common'
import RestaurantListScreen from '../RestaurantListScreen'
import Restaurant from '../../components/Restaurant'
import { getRestaurantsAsync } from '../../services/fetch'
import { PartiesContext } from '../../context/PartiesContext'

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
  }
})

const props: any = {}

describe('<RestaurantListScreen />', () => {
  it('Renders loading indicator before useEffect', () => {
    const wrapper = shallow(<RestaurantListScreen {...props} />)
    const loadingEl = wrapper.find(Text).first()
    expect(loadingEl.shallow().text()).toBe('Loading...')
  })

  it('Renders with restaurant data', () => {
    const newParty: PartyData = {
      slug: '23326',
      pin: 4395,
      startDate: new Date(),
      members: [],
      partyHost: {
        id: 4,
        name: 'Ed',
        restaurants: []
      }
    }
    
    withHooks(() => {
      const wrapper = mount(<RestaurantListScreen {...props} />, {
        wrappingComponent: PartiesContext.Provider,
        wrappingComponentProps: {
          value: { party: newParty }
        }
      })
      expect(wrapper.find(Restaurant).length).toBeGreaterThanOrEqual(1)
    })
  })
})
