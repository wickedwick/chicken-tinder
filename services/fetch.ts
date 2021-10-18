import fetch from 'node-fetch'
import React from 'react'

export async function getStarWarsDataAsync<T>(endpoint: string,
    callback: React.Dispatch<React.SetStateAction<T[]>>,
    errorCallback: React.Dispatch<React.SetStateAction<string>>,
    loadingCallback:  React.Dispatch<React.SetStateAction<boolean>>): Promise<void> {
    try {
        const resp = await fetch(endpoint)
        const json = await resp.json()
        callback(json.results)
    } catch (err) {
        errorCallback(err)
    } finally {
        loadingCallback(false)
    }
}

export async function getStarWarsDataSingleAsync<T>(endpoint: string,
    callback: React.Dispatch<React.SetStateAction<T>>,
    errorCallback: React.Dispatch<React.SetStateAction<string>>,
    loadingCallback:  React.Dispatch<React.SetStateAction<boolean>>): Promise<void> {
    try {
        const resp = await fetch(endpoint)
        const json = await resp.json()
        callback(json)
    } catch (err) {
        errorCallback(err)
    } finally {
        loadingCallback(false)
    }
}

export async function getRestaurantsAsync<RestaurantData>(callback: React.Dispatch<React.SetStateAction<RestaurantData>>,
    errorCallback: React.Dispatch<React.SetStateAction<string>>,
    loadingCallback:  React.Dispatch<React.SetStateAction<boolean>>): Promise<void> {
        try {
            const resp = await fetch(restaurantsEndpoint)
            const json = await resp.json()
            callback(json)
        } catch (err) {
            errorCallback(err)
        } finally {
            loadingCallback(false)
        }
}

export async function createPartyAsync<PartyData>(data: PartyData | null,
    callback: React.Dispatch<React.SetStateAction<PartyData>>,
    errorCallback: React.Dispatch<React.SetStateAction<string>>,
    loadingCallback: React.Dispatch<React.SetStateAction<boolean>>): Promise<void> {
        try {
            const resp = await fetch(createEndpoint, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const json = await resp.json()
            callback(json)
        } catch (err) {
            errorCallback(String(err))
        } finally {
            loadingCallback(false)
        }
}

const restaurantsEndpoint: string = 'http://localhost:1337/restaurants'
const createEndpoint: string = 'http://localhost:1337/parties'