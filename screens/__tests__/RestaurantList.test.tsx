import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { withHooks } from 'jest-react-hooks-shallow'
import RestaurantListScreen from '../RestaurantListScreen'
import Restaurant from '../../components/Restaurant'
import { PartyContext } from '../../context/PartyContext'
import { RestaurantData } from '../../types/common'

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
  it('Renders with restaurant data', () => {
    withHooks(() => {
      const wrapper = mount(<RestaurantListScreen {...props} />, {
        wrappingComponent: PartyContext.Provider,
        wrappingComponentProps: { value: { party: { slug: '767gh', pin: 0 }, addRestaurant: jest.fn(), setParty: jest.fn() } }
      })
      expect(wrapper.find(Restaurant).length).toBeGreaterThanOrEqual(1)
    })
  })
})
