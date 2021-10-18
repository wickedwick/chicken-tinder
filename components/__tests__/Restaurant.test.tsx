import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Card } from 'react-native-paper'
import { RestaurantData } from '../../types/common'
import Restaurant from '../Restaurant'

configure({ adapter: new Adapter() })

const restaurantData: RestaurantData = {
  id: 3,
  name: 'Wick\'s Bakery',
  image: {
    url: 'https://www.url.com/image.png',
    alternativeText: 'Image of a bakery.'
  }
}

describe('<Restaurant />', () => {
  it('Renders a restaurant card with props data', () => {
    const wrapper = shallow(<Restaurant restaurant={restaurantData} />)
    expect(wrapper.length).toBeGreaterThanOrEqual(1)

    const cardTitleElement = wrapper.find(Card.Title)
    const title = cardTitleElement.prop('title')
    expect(title).toBe(restaurantData.name)
  })
})
