import React from "react"
import styled from "styled-components"
import { ThemeProvider, Header } from "@datapunt/asc-ui"
import { Router } from "@reach/router"
import HomePage from "./pages/HomePage"
import TeamsPage from "./pages/TeamsPage"
import TeamPage from "./pages/TeamPage"
import CasePage from "./pages/CasePage"
import NotFoundPage from "./pages/NotFoundPage"

const Main = styled.main`
  margin: 12px
`

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="App">
        <Header
          tall={ false }
          title="Looplijsten vakantieverhuur"
          homeLink="/"
        />
        <Main>
          <Router>
            <TeamsPage path="/" />
            <TeamsPage path="/teams" />
            <TeamPage path="/teams/:teamId" />
            <CasePage path="cases/:caseId" />
            <NotFoundPage default />
          </Router>
        </Main>
      </div>
    </ThemeProvider>
  )
}

export default App
