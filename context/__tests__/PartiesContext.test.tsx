import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { PartyData } from '../../types/common'
import { PartiesContext } from '../PartiesContext'
import RestaurantListScreen from '../../screens/RestaurantListScreen'
import { act } from 'react-test-renderer'
import { withHooks } from 'jest-react-hooks-shallow'

configure({ adapter: new Adapter() })

const props: any = {}
describe('PartiesContext', () => {
  it('addRestaurant sets restaurant on member', () => {
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

    const setPartyFunc = jest.fn()
    const addRestaurantFunc = jest.fn()
    withHooks(() => {
      const wrapper = mount(
        <PartiesContext.Provider
          value={{
            party: newParty,
            setParty: setPartyFunc,
            addRestaurant: addRestaurantFunc
          }}>
            <RestaurantListScreen {...props} />
        </PartiesContext.Provider>);
      console.log('wrapper', wrapper.debug())
      // const text = wrapper.findWhere(node => {
      //   return (
      //     node.type() &&
      //     node.name() &&
      //     node.text() === "No more restaurants!"
      //   )
      // })
      const text = wrapper.findWhere((el) => {
        return (
          el.text() === 'No more restaurants!'
        )
      })

      console.log('text', text)
      // expect(text).toHaveLength(1)
    })
  })
})
