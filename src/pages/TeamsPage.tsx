import React from "react"
import { RouteComponentProps } from "@reach/router"
import Teams from "../components/Teams"
import BreadCrumbs from "../components/BreadCrumbs"

type Props = RouteComponentProps

const TeamsPage: React.FC<Props> = () => {
  const crumbs = [{ text: "Teams" }]
  return (
    <>
      <BreadCrumbs items={ crumbs }/>
      <Teams />
    </>
  )
}

export default TeamsPage
