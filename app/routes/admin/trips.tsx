import { Header } from 'components'
import React from 'react'

const Trips = () => {
  return (
    <main className='all-users wrapper'>
      <Header
        title="Trips"
        description="View and edit AI-Generated travel plans"
        ctaText="Create a Trip"
        ctaUrl="/trips/create"
      />
    </main>
  )
}

export default Trips