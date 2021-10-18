import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Card } from 'react-native-paper'
import { View } from 'react-native'
import { FilmData } from '../../types/starWars/films'
import Film from '../Film'

configure({ adapter: new Adapter() })

const filmData: FilmData = {
    title: 'A New Hope',
    episode_id: 4,
    openingCrawl: '',
    director: '',
    producer: '',
    release_date: '1977-05-24',
    url: '',
}

describe('<Film />', () => {
    it('Renders text from props', () => {
        const wrapper = shallow(<Film film={filmData} />)
        const cardTitle = wrapper.find(Card.Title)

        const title = cardTitle.prop('title')
        expect(title).toBe('Star Wars Episode 4')

        const cardContent = wrapper.find(Card.Content).shallow().find(View)
        expect(cardContent.shallow().text()).toBe('Released 05/23/1977')
    })
})
