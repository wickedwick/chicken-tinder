import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { withHooks } from 'jest-react-hooks-shallow'
import { Text } from 'react-native-paper'
import { CharacterData } from '../../types/starWars/characters'
import Character from '../../components/Character'
import CharacterListScreen from '../CharacterListScreen'

configure({ adapter: new Adapter() })

jest.mock('../../services/fetch', () => {
    const characterData: CharacterData[] = [
        {
            name: 'Luke Skywalker',
            height: '172',
            mass: '77',
            hair_color: 'blond',
            skin_color: 'fair',
            eye_color: 'blue',
            birth_year: '19BBY',
            gender: 'male',
            url: 'https://swapi.dev/api/people/1/',
        },
    ]

    return {
        getStarWarsDataAsync: (
            endpoint: string,
            func1: React.Dispatch<React.SetStateAction<Array<CharacterData> | null>>,
            func2: React.Dispatch<React.SetStateAction<string>>,
            func3: React.Dispatch<React.SetStateAction<boolean>>,
        ) => {
            func1(characterData)
            func2('')
            func3(false)
        },
    }
})

const props: any = {}

describe('<CharacterListScreen />', () => {
    it('Renders', () => {
        const wrapper = shallow(<CharacterListScreen {...props} />)
        const loadingEl = wrapper.find(Text).first()
        expect(loadingEl.text()).toBe('Loading...')
    })

    it('Renders Characters after useEffect hook', () => {
        withHooks(() => {
            const wrapper = shallow(<CharacterListScreen {...props} />)
            expect(wrapper.find(Character).length).toBeGreaterThanOrEqual(1)
        })
    })
})
