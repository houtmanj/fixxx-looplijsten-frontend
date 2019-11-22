import React, { FC, useState, FormEvent } from "react"
import { Button } from "@datapunt/asc-ui"
import { Search } from "@datapunt/asc-assets"
import styled from "styled-components"
import TextareaBase from "../styled/Textarea"
import useOnChangeState from "../../hooks/useOnChangeState"
import { getUrl } from "../../config/domain"
import authToken from "../../utils/authToken"
import SearchResults from "./SearchResults"

const ButtonWrap = styled.div`
  display: flex
  justify-content: flex-end
`
const Form = styled.form`
  max-width: 768px
`
const Textarea = styled(TextareaBase)`
  width: 100%
`

const parse = (text: string) => {
  const lines = text.split(/\r?\n/)
  const regExpPostalCode = /[1-9][0-9]{3}[A-Z]{2}/
  const results: any = []
  lines.forEach(line => {
    const match = line.match(regExpPostalCode)
    const postalCode = match ? match[0] : undefined
    if (postalCode === undefined) return
    const parts = line.split(regExpPostalCode)
    const address = parts.length ? parts[0] : undefined
    if (address === undefined) return
    const match1 = address.match(/\d+/)
    const streetNumber = match1 ? match1[0] : undefined
    if (streetNumber === undefined) return
    results.push([postalCode, streetNumber])
  })
  return results
}

const fetchOne = (item: any) : Promise<any> => {
  const params = { postalCode: item[0], streetNumber: item[1] }
  const url = getUrl("search", params)
  const token = authToken.get()
  return fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization: `Token ${ token }`,
      "Content-Type": "application/json"
    }
  })
}

const fetchAll = async (items: any[]) => {

  const promises = items.map(item => fetchOne(item))

  try {
    const results = await Promise.all(promises)
    const jsons = await Promise.all(results.map(result => result.json()))
    return jsons.reduce((acc, cur) => acc.concat(cur), [])
  } catch (err) {
    console.error(err)
  }
}

const ParseForm: FC = () => {
  const [results, setResults] = useState<SearchResults | undefined>()
  const [value, onChangeValue] = useOnChangeState()
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const results = parse(value)
    const itineraries = await fetchAll(results)
    const uniqueItineraries = itineraries.filter((itinerary: any, index: number, arr: any) => arr.map((itinerary: any) => itinerary["id"]).indexOf(itinerary["id"]) === index)
    setResults(uniqueItineraries)
  }
  return (
    <div className="ParseForm">
      <Form onSubmit={ onSubmit }>
        <Textarea rows={ 16 } onChange={ onChangeValue } autoFocus />
        <ButtonWrap>
          <Button variant="secondary" size={ 60 } icon={ <Search /> } />
        </ButtonWrap>
      </Form>
      <SearchResults results={ results } />
    </div>
  )
}
export default ParseForm