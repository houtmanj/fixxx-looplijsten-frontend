import React, { FC, FormEvent } from "react"
import styled from "styled-components"
import useGlobalState from "../../hooks/useGlobalState"
import useOnChangeState from "../../hooks/useOnChangeState"
import { getTitle } from "../../lib/days"
import DayInputs from "./DayInputs"
import { Button, Spinner } from "@datapunt/asc-ui"
import { openingDate, openingReasons } from "../../config/planning"
import createPlanningRequestBody from "../../lib/createPlanningRequestBody"
import ErrorMessage from "../global/ErrorMessage"

const DayPartWrap = styled.div`
  padding-left: 150px
`
const Div = styled.div`
  display: flex
`
const SettingsDiv = styled.div`
  margin-left: 24px
`
const Label = styled.label`
  font-weight: bold
`
const FormLabel = styled(Label)`
  display: inline-block
  width: 70px
  padding-left: 4px
  padding-bottom: 8px
`

const ButtonWrap = styled.div`
  display: flex
  justify-content: flex-end
  width: 368px
  margin-top: 36px
`

const SpinnerWrap = styled.div`
  margin-right: 24px
  display: inline-block
`

const DayPlanning: FC = () => {

  const {
    planning: {
      isFetching,
      errorMessage
    },
    planningActions: {
      generate
    }
  } = useGlobalState()

  type Input = [string, OnChangeHandler]
  const morning = useOnChangeState("2") as unknown as Input
  const afternoon = useOnChangeState("2") as unknown as Input
  const evening = useOnChangeState("0") as unknown as Input

  const day = (new Date()).getDay()
  const tomorrow = day + 1 > 6 ? 0 : day + 1
  const dayOfWeek = tomorrow - 1 < 0 ? 6 : tomorrow - 1 // correct sunday => 6
  const title = getTitle(dayOfWeek, true)
  const inputs = [
    { title, inputs: [morning, afternoon, evening] }
  ]

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    const inputsNums = inputs.map(({ inputs }) => inputs.map(input => parseInt(input[0], 10))).flat(1)
    const params = createPlanningRequestBody(inputsNums, dayOfWeek)
    generate(params)
  }

  const showSpinner = isFetching
  const showError = errorMessage !== undefined

  return (
    <Div className="Planning">
      <div>
        <h2>Hoeveel lijsten per dagdeel wil je genereren?</h2>
        <form onSubmit={ onSubmit }>
          <DayPartWrap>
            <FormLabel>ochtend</FormLabel>
            <FormLabel>middag</FormLabel>
            <FormLabel>avond</FormLabel>
          </DayPartWrap>
          { inputs.map(({ title, inputs }) => <DayInputs key={ title } title={ title } inputs={ inputs } />) }
          { showError &&
            <ErrorMessage text={ errorMessage! } />
          }
          <ButtonWrap>
            { showSpinner &&
              <SpinnerWrap>
                <Spinner size={ 40 } />
              </SpinnerWrap>
            }
            <Button variant="primary" disabled={ isFetching }>Genereer looplijsten</Button>
          </ButtonWrap>
        </form>
      </div>
      <SettingsDiv>
        <h2>Settings</h2>
        <Label>openings datum: </Label>
        <p>{ openingDate }</p>
        <Label>openings redenen: </Label>
        <ul>
          { openingReasons.map(reason => <li key={ reason }>{ reason }</li>) }
        </ul>
      </SettingsDiv>
    </Div>
  )
}
export default DayPlanning
