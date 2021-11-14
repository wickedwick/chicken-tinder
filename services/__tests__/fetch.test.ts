import { PartyData } from '../../types/common'
import { getStarWarsDataSingleAsync, getStarWarsDataAsync, getRestaurantsAsync, createPartyAsync, putPartyAsync, getPartyAsync, getPartyBySlugPinAsync } from '../fetch'

jest.mock('node-fetch')

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetch = require('node-fetch') as jest.Mock
const dataFunc = jest.fn()
const loadingFunc = jest.fn()
const errorFunc = jest.fn()

afterEach(() => {
    jest.clearAllMocks();
});

describe('getStarWarsDataAsync', () => {
    it('calls the data and loading callbacks when done', async () => {
        fetch.mockReturnValue(Promise.resolve({ json: () => Promise.resolve({ results: [{ CAD: 1.42 }] }) }))
        
        await getStarWarsDataAsync('http://endpoint.com/url', dataFunc, errorFunc, loadingFunc)
        expect(loadingFunc).toHaveBeenCalled()
        expect(dataFunc).toHaveBeenCalled()
    })

    it('calls the error and loading callbacks when error occurs', async () => {
        fetch.mockReturnValue(Promise.resolve({ json: () => Promise.reject('An error occurred.') }))
        
        await getStarWarsDataAsync('http://endpoint.com/url', dataFunc, errorFunc, loadingFunc)
        expect(loadingFunc).toHaveBeenCalled()
        expect(errorFunc).toHaveBeenCalled()
    })
})

describe('getStarWarsDataSingleAsync', () => {
    it('calls the data and loading callbacks when done', async () => {
        fetch.mockReturnValue(Promise.resolve({ json: () => Promise.resolve({ CAD: 1.42 }) }))
        
        await getStarWarsDataSingleAsync('http://endpoint.com/url', dataFunc, errorFunc, loadingFunc)
        expect(loadingFunc).toHaveBeenCalled()
        expect(dataFunc).toHaveBeenCalled()
    })

    it('calls the error and loading callbacks when error occurs', async () => {
        fetch.mockReturnValue(Promise.resolve({ json: () => Promise.reject('An error occurred.') }))
        
        await getStarWarsDataSingleAsync('http://endpoint.com/url', dataFunc, errorFunc, loadingFunc)
        expect(loadingFunc).toHaveBeenCalled()
        expect(errorFunc).toHaveBeenCalled()
    })
})

describe('getRestaurantsAsync', () => {
    it('calls the data and loading callbacks when done', async () => {
        fetch.mockReturnValue(Promise.resolve({ json: () => Promise.resolve({ CAD: 1.42 }) }))

        await getRestaurantsAsync(dataFunc, errorFunc, loadingFunc)
        expect(loadingFunc).toHaveBeenCalled()
        expect(dataFunc).toHaveBeenCalledTimes(1)
    })

    it('calls the error callback when an error occurs', async() => {
        fetch.mockReturnValue(Promise.resolve({ json: () => Promise.reject('An error occurred.') }))
        
        await getRestaurantsAsync(dataFunc, errorFunc, loadingFunc)
        expect(loadingFunc).toHaveBeenCalled()
        expect(errorFunc).toHaveBeenCalledTimes(1)
    })
})

const partyData: PartyData = {
    id: 8,
    slug: '394-493d',
    startDate: new Date('2021-03-23'),
    pin: 9234,
    members: [],
    partyHost: {
        id: 3,
        name: 'Marvin',
        restaurants: []
    }
}

describe('getPartiesAsync', () => {
    it('calls the data and loading callbacks when done', async () => {
        fetch.mockReturnValue(Promise.resolve({ json: () => Promise.resolve([partyData]) }))

        await getPartyBySlugPinAsync('394-493d', 9234, dataFunc, errorFunc, loadingFunc)
        expect(loadingFunc).toHaveBeenCalled()
        expect(dataFunc).toHaveBeenCalledTimes(1)
    })
})

describe('getPartyAsync', () => {
    it('calls the data and loading callbacks when done', async () => {
        fetch.mockReturnValue(Promise.resolve({ json: () => Promise.resolve({ CAD: 1.42 }) }))

        await getPartyAsync(4, dataFunc, errorFunc, loadingFunc)
        expect(loadingFunc).toHaveBeenCalled()
        expect(dataFunc).toHaveBeenCalledTimes(1)
    })
})

describe('createPartyAsync', () => {
    it('calls the data and loading callbacks when done', async () => {
        fetch.mockReturnValue(Promise.resolve({ json: () => Promise.resolve({ CAD: 1.42 }) }))

        await createPartyAsync(partyData, dataFunc, errorFunc, loadingFunc)
        expect(loadingFunc).toHaveBeenCalled()
        expect(dataFunc).toHaveBeenCalledTimes(1)
    })
})

describe('putPartyAsync', () => {
    it('calls the data and loading callbacks when done', async () => {
        fetch.mockReturnValue(Promise.resolve({ json: () => Promise.resolve(partyData) }))

        await putPartyAsync(partyData, dataFunc, errorFunc, loadingFunc)
        expect(loadingFunc).toHaveBeenCalled()
        expect(dataFunc).toHaveBeenCalledTimes(1)
    })
})
