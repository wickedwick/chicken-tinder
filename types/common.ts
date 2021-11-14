export type RootStackParamList = {
  Root: undefined
  NotFound: undefined
}

export type BottomTabParamList = {
  Films: undefined
  Characters: undefined
  Restaurants: undefined
}

export type TabOneParamList = {
  FilmListScreen: undefined
  FilmDetailsScreen: { url: string }
  PartyMenuScreen: undefined
  PartyDetailsScreen: { slug: string, pin: number }
  PartySelectionScreen: undefined
}

export type TabTwoParamList = {
  CharacterListScreen: undefined
  CharacterDetailsScreen: { url: string }
  RestaurantListScreen: undefined
}

export type RestaurantProps = {
  restaurant: RestaurantData
}

export type RestaurantData = {
  id: number,
  name: string
  image: Image
}

export type Image = {
  url: string
  alternativeText: string
}

export type PartyProps = {
  party: PartyData
}

export type PartyData = {
  id?: number,
  slug: string
  startDate?: Date
  pin: number
  members: Member[]
  partyHost: Member
}

export type Member = {
  id?: number,
  name: string
  restaurants: Array<RestaurantData>
}
