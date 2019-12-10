import { createContext } from "react"
import noop from "../utils/noop"

type Value = {
  state: {
    //itineraries: Itineraries
    search: {
      postalCode: string
      streetNumber: string
      suffix: string
    }
    setSearch: (a: string, b: string, c: string) => void
    parse: string
    setParse: (a: string) => void
    itineraries: Itineraries
    itinerariesIsFetching: boolean,
    itinerariesErrorMessage: ErrorMessage,
    setItineraries: (a: Itineraries) => void
    hasItinerary: (a: CaseId) => boolean
    addItinerary: (a: Itinerary | Itineraries) => void
    removeItinerary: (a: Itinerary) => void
    moveItinerary: (a: Index, b: Index) => void
  }
}

const value = {
  state: {
    search: {
      postalCode: "",
      streetNumber: "",
      suffix: ""
    },
    setSearch: noop,
    parse: "",
    setParse: noop,
    itineraries: [],
    itinerariesIsFetching: false,
    itinerariesErrorMessage: undefined,
    setItineraries: noop,
    hasItinerary: () => false,
    addItinerary: noop,
    removeItinerary: noop,
    moveItinerary: noop
  }
} as Value

const StateContext = createContext(value)

export default StateContext
