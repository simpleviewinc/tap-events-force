import React, { useContext } from 'react'
import { BookingButton } from 'SVComponents/button/bookingButton'
import { ComponentsContext } from 'SVContexts/components/componentsContext'

export const SessionDetails = ({ session }) => {
  const { SessionDetailsModalContents } = useContext(ComponentsContext)

  return (
    <>
      <BookingButton session={session} />
      <SessionDetailsModalContents sessionID={session.identifier} />
    </>
  )
}
