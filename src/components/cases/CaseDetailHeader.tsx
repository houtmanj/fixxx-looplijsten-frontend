import React, { FC } from "react"
import styled from "styled-components"
import Signal from "../global/Signal"
import InvalidDataSpan from "../global/InvalidDataSpan"
import ScrollToAnchor from "../global/ScrollToAnchor"
import Label from "../styled/Label"

import Footer from "./Footer"

type Props = {
  address: string
  postalCode: string
  personCount: number
  caseNumber?: number
  caseCount?: number
  openCaseCount?: number
  caseOpening?: string
  signal?: string
  footer?: {
    title: string
    link: string
  }
}

const Header = styled.section`
  border: 1px solid #B4B4B4
  margin-bottom: 15px
  padding: 15px
`

const H1 = styled.h1`
  font-size: 32px
  margin: 8px 0
`

const P = styled.p`
  margin-bottom: 8px
`

const CaseDetailHeader: FC<Props> = ({ address, postalCode, personCount, caseNumber, caseCount, openCaseCount, caseOpening, footer, signal }) => {
  const showFooter = footer !== undefined
  const personText =
    personCount === 0 ? "Geen inschrijvingen" :
    personCount === 1 ? "1 persoon" :
    `${ personCount } personen`

  const signalType = signal === "Issuemelding" ? "ISSUE" : "REGULAR"
  const showSignal = signal !== undefined

  return (
    <Header>
      <H1>{ address }</H1>
      <P>{ postalCode }</P>
      { showSignal &&
        <Signal type={ signalType } text={ signal } />
      }
      <div>
        <Label>Ingeschreven</Label><span>{ personCount > 0 ? <ScrollToAnchor anchor="personen" text={ personText } /> : personText }</span>
      </div>
      <div>
        <Label>Zaaknummer</Label>
        { caseNumber !== undefined && caseCount !== undefined ?
          <span><strong>{ caseNumber }</strong> van { caseCount }</span> :
          <InvalidDataSpan />
        }
      </div>
      <div>
        <Label>Open zaken</Label>
        { openCaseCount !== undefined ?
          <span>{ openCaseCount }</span> :
          <InvalidDataSpan />
        }
      </div>
      <div>
        <Label>Openingsreden</Label>
        { caseOpening !== undefined ?
          <span>{ caseOpening }</span> :
          <InvalidDataSpan />
        }
      </div>
      { showFooter &&
        <Footer>
          <a href={ footer!.link }>{ footer!.title }</a>
        </Footer>
      }
    </Header>
  )
}

export default CaseDetailHeader
