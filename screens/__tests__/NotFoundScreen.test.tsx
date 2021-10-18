import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import NotFoundScreen from '../NotFoundScreen'
import { Text } from 'react-native'

configure({ adapter: new Adapter() })

describe('<NotFoundScreen />', () => {
    const props: any = {}

    it('Renders', () => {
        const wrapper = shallow(<NotFoundScreen {...props} />)
        const loadingEl = wrapper.find(Text).first()
        expect(loadingEl.shallow().text()).toBe('This screen doesn\'t exist.')
    })
})
