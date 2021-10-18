import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Card } from 'react-native-paper'
import { PartyData } from '../../types/common'
import Party from '../Party'

configure({ adapter: new Adapter() })

const partyData: PartyData = {
  slug: '99dk-kds',
  startDate: new Date('2021-02-11'),
  pin: 8377,
  members: [
    {
      id: 1,
      name: 'Jim Bob',
      restaurants: [
        {
          id: 1,
          name: 'Josey Baking Co',
          image: {
            url: '',
            alternativeText: ''
          }
        }
      ]
    }
  ],
  partyHost: {
    id: 3,
    name: 'Jim Bob',
    restaurants: [
      {
        id: 1,
        name: 'Josey Baking Co',
        image: {
          url: '',
          alternativeText: ''
        }
      }
    ]
  }
}

describe('<Party />', () => {
  it('Renders a party form card', () => {
    const wrapper = shallow(<Party party={partyData} />)
    expect(wrapper.length).toBeGreaterThanOrEqual(1)
  })
})