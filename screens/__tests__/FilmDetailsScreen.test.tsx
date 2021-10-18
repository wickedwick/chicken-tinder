import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { withHooks } from 'jest-react-hooks-shallow'
import { Text } from 'react-native'
import { FilmData } from '../../types/starWars/films'
import Film from '../../components/Film'
import FilmDetailsScreen from '../FilmDetailsScreen'

configure({ adapter: new Adapter() })

jest.mock('../../services/fetch', () => {
    const film: FilmData = {
        title: 'Star Wars Episode 4',
        episode_id: 4,
        release_date: '1977-05-25',
        openingCrawl: '',
        director: '',
        producer: '',
        url: '',
    }

    return {
        getStarWarsDataSingleAsync: (
            endpoint: string,
            func1: React.Dispatch<React.SetStateAction<FilmData | null>>,
            func2: React.Dispatch<React.SetStateAction<string>>,
            func3: React.Dispatch<React.SetStateAction<boolean>>,
        ) => {
            func1(film)
            func2('')
            func3(false)
        },
    }
})

const props: any = {
    route: {
        params: {
            url: 'https://swapi.dev/films',
        },
    },
}

describe('<FilmDetailsScreen />', () => {
    it('Renders with loading indicatore before useEffect', () => {
        const wrapper = shallow(<FilmDetailsScreen {...props} />)
        const loadingEl = wrapper.find(Text).first()
        expect(loadingEl.shallow().text()).toBe('Loading...')
    })

    it('Renders Film data when useEffect is called', () => {
        withHooks(() => {
            const wrapper = shallow(<FilmDetailsScreen {...props} />)
            expect(wrapper.find(Film).length).toBe(1)
        })
    })
})
