import React, { FC, useRef, useState } from "react"
import displayAddress from "../../lib/displayAddress"
import styled from "styled-components"
import { Button } from "@datapunt/asc-ui"
import MapsButton from "../itineraries/MapsButton"

type Props = {
  title: string
  itineraries: any
}

const Div = styled.div`
  margin-bottom: 36px
`

const P = styled.p`
  display: inline
`
const TextArea = styled.textarea`
  position: absolute
  top: -9999px
`
const ButtonWrap = styled.div`
  display: flex
  justify-content: space-between
  max-width: 600px
  margin-top: 24px
`

const PlanningResultItineraries: FC<Props> = ({ title, itineraries }) => {
  const fullTitle = `${ title } (${ itineraries.length })`
  let fullText = ""
  const ref = useRef<HTMLTextAreaElement>(null)
  const [isCopied, setIsCopied] = useState(false)
  const onClick = () => {
    const elem = ref.current
    if (elem === null) return
    elem.value = fullText
    elem.select()
    document.execCommand("copy")
    setIsCopied(true)
  }
  const style = isCopied ? { opacity: 0.1 } : undefined
  return (
    <Div className="PlanningResultItineraries" style={ style }>
      <h1>{ fullTitle }</h1>
      <table>
        <tr><th>Straat</th><th>Postcode</th><th>Openingsreden</th><th>Stadium</th></tr>
        { itineraries.map((itinerary: any) => {
            const {
              street_name: streetName,
              street_number: streetNumber,
              suffix,
              suffix_letter: suffixLetter,
              case_id: caseId,
              postal_code: postalCode,
              stadium,
              case_reason: caseReason
            } = itinerary
            const address = displayAddress(streetName, streetNumber, suffix, suffixLetter)
            const text = `${ address } ${ postalCode } ${ stadium } ${ caseReason }`
            fullText += `${ text }\n`
            return (
              <tr key={ address }>
                <td>{ address }</td>
                <td>{ postalCode }</td>
                <td>{ caseReason }</td>
                <td>{ stadium }</td>
                <td><a href={ `/cases/${ caseId }` }>detail</a></td>
              </tr>
            )
          })
        }
      </table>
      <TextArea ref={ ref }/>
      <ButtonWrap>
        <MapsButton itineraries={ itineraries.map((itinerary: any) => ({ case: { bwv_data: itinerary } })) } />
        <Button onClick={ onClick }>Kopieër naar clipboard</Button>
      </ButtonWrap>
    </Div>
  )
}
export default PlanningResultItineraries