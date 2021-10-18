import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { withHooks } from 'jest-react-hooks-shallow'
import { Text } from 'react-native'
import { CharacterData } from '../../types/starWars/characters'
import Character from '../../components/Character'
import CharacterDetailsScreen from '../CharacterDetailsScreen'

configure({ adapter: new Adapter() })

jest.mock('../../services/fetch', () => {
    const character: CharacterData = {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        gender: 'male',
        url: 'https://swapi.dev/api/people/1/',
    }

    return {
        getStarWarsDataSingleAsync: (
            endpoint: string,
            func1: React.Dispatch<React.SetStateAction<CharacterData | null>>,
            func2: React.Dispatch<React.SetStateAction<string>>,
            func3: React.Dispatch<React.SetStateAction<boolean>>,
        ) => {
            func1(character)
            func2('')
            func3(false)
        },
    }
})

const props: any = {
    route: {
        params: {
            url: 'https://swapi.dev/people',
        },
    },
}

describe('<CharacterDetailsScreen />', () => {
    it('Renders with loading indicator', () => {
        const wrapper = shallow(<CharacterDetailsScreen {...props} />)
        const loadingEl = wrapper.find(Text).first()
        expect(loadingEl.shallow().text()).toBe('Loading...')
    })

    it('Renders Character after useEffect hook', () => {
        withHooks(() => {
            const wrapper = shallow(<CharacterDetailsScreen {...props} />)
            expect(wrapper.find(Character).length).toBe(1)
        })
    })
})
