import React from 'react'
import PublicLayout from '../../layouts/public-layout'

const HomePageContent : React.FC = () => {
    return (
      <div>HomePage-page</div>
    )
  }


const HomePage : React.FC = () => {
  return (
    <PublicLayout>
        <HomePageContent />
    </PublicLayout>
  )
}

export default HomePage