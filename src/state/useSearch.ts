import { useEffect, useReducer } from "react"
import reducer, {
  initialState,
  createSearch,
  createSetResults
} from "./searchReducer"
import { get, notOk } from "../utils/fetch"
import queryParams from "../utils/queryParams"
import { getUrl } from "../config/domain"

const useSearch = () : [SearchState, SearchActions] => {

  const [state, dispatch] = useReducer(reducer, initialState as never)

  const search = (postalCode: PostalCode, streetNumber: string, suffix: Suffix) => {

    (async () => {

      dispatch(createSearch([postalCode, streetNumber, suffix]))

      const params = { postalCode, streetNumber, suffix }
      const url = getUrl("search", params)
      const [response, result] = await get(url)

      // Handle error responses
      if (notOk(response)) return false

      // Set results
      const results = result.cases
      dispatch(createSetResults(results))
    })()
  }

  return [state, { search }]
}

export default useSearch