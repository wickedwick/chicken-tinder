import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Card } from 'react-native-paper'
import { CharacterData } from '../../types/starWars/characters'
import Character from '../Character'

configure({ adapter: new Adapter() })

const characterData: CharacterData = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    homeworld: 'https://swapi.dev/api/planets/1/',
    films: [
        'https://swapi.dev/api/films/1/',
        'https://swapi.dev/api/films/2/',
        'https://swapi.dev/api/films/3/',
        'https://swapi.dev/api/films/6/',
    ],
    species: [],
    vehicles: [
        'https://swapi.dev/api/vehicles/14/',
        'https://swapi.dev/api/vehicles/30/',
    ],
    starships: [
        'https://swapi.dev/api/starships/12/',
        'https://swapi.dev/api/starships/22/',
    ],
    url: 'https://swapi.dev/api/people/1/',
}

describe('<Character />', () => {
    it('Renders a character card with data from props', () => {
        const wrapper = shallow(<Character character={characterData} />)
        expect(wrapper.length).toBeGreaterThanOrEqual(1)
        const cardTitle = wrapper.find(Card.Title)

        const title = cardTitle.prop('title')
        expect(title).toBe(characterData.name)
    })
})
