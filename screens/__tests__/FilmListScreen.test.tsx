import React from "react"
import { configure, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { withHooks } from "jest-react-hooks-shallow"
import { Text } from "react-native"
import { FilmData } from "../../types/starWars/films"
import FilmListScreen from "../FilmListScreen"
import Film from "../../components/Film"

configure({ adapter: new Adapter() })

jest.mock("../../services/fetch", () => {
  const films: FilmData[] = [
    {
      title: "Star Wars Episode 4",
      episode_id: 4,
      release_date: "1977-05-25",
      openingCrawl: "",
      director: "",
      producer: "",
      url: "",
    },
  ]

  return {
    getStarWarsDataAsync: (
      endpoint: string,
      func1: React.Dispatch<React.SetStateAction<Array<FilmData> | null>>,
      func2: React.Dispatch<React.SetStateAction<string>>,
      func3: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
      func1(films)
      func2("")
      func3(false)
    },
  }
})

const props: any = {}

describe("<FilmListScreen />", () => {
  it("Renders loading indicator before useEffect", () => {
    const wrapper = shallow(<FilmListScreen {...props} />)
    const loadingEl = wrapper.find(Text).first()
    expect(loadingEl.shallow().text()).toBe("Loading...")
  })
})

describe("<FilmListScreen />", () => {
  it("Renders Films after useEffect hook", () => {
    withHooks(() => {
      const wrapper = shallow(<FilmListScreen {...props} />)
      expect(wrapper.find(Film).length).toBeGreaterThanOrEqual(1)
    })
  })
})
