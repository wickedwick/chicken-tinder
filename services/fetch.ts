import fetch from 'node-fetch'
import React from 'react'
import { PartyData } from '../types/common'

export async function getRestaurantsAsync<RestaurantData>(callback: React.Dispatch<React.SetStateAction<RestaurantData>>,
    errorCallback: React.Dispatch<React.SetStateAction<string>>,
    loadingCallback:  React.Dispatch<React.SetStateAction<boolean>>): Promise<void> {
        try {
            const resp = await fetch(restaurantsEndpoint)
            const json = await resp.json()
            callback(json)
        } catch (err) {
            errorCallback(String(err))
        } finally {
            loadingCallback(false)
        }
}

export async function getPartyBySlugPinAsync(slug: string,
    pin: number,
    callback: (party: PartyData) => void,
    errorCallback: React.Dispatch<React.SetStateAction<string>>,
    loadingCallback: React.Dispatch<React.SetStateAction<boolean>>): Promise<void> {
    try {
        const resp = await fetch(partiesEndpoint)
        const json: PartyData[] = await resp.json()
        const party = json.find(p => p.slug === slug && p.pin === pin)
        if (party) {
            callback(party)
        }
    } catch (err) {
        errorCallback(String(err))
    } finally {
        loadingCallback(false)
    }
}

export async function getPartyAsync(id: number,
    callback: (party: PartyData) => void,
    errorCallback: React.Dispatch<React.SetStateAction<string>>,
    loadingCallback: React.Dispatch<React.SetStateAction<boolean>>): Promise<void> {
    try {
        const resp = await fetch(`${partiesEndpoint}/${id.toString}`)
        const json = await resp.json()
        console.log('json', json)
        callback(json)
    } catch (err) {
        errorCallback(String(err))
    } finally {
        loadingCallback(false)
    }
}

export async function createPartyAsync(data: PartyData | null,
    callback: (party: PartyData) => void,
    errorCallback: React.Dispatch<React.SetStateAction<string>>,
    loadingCallback: React.Dispatch<React.SetStateAction<boolean>>): Promise<void> {
        try {
            const resp = await fetch(partiesEndpoint, {
                method: 'POST',
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

export async function putPartyAsync(data:PartyData,
    callback: (party: PartyData) => void,
    errorCallback: React.Dispatch<React.SetStateAction<string>>,
    loadingCallback: React.Dispatch<React.SetStateAction<boolean>>): Promise<void> {
        try {
            const resp = await fetch(`${partiesEndpoint}/${data.id}`, {
                method: 'PUT',
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
const partiesEndpoint: string = 'http://localhost:1337/parties'