import React from 'react'

const PublicLayout : React.FC<{
    children: React.ReactNode
}> = ({children}) => {
  return (
    <div>
        <h1 className='bg-pink-600 text-white p-4'>Public Layout!</h1>
        <div className='p-4'>
            {children}
        </div>
    </div>
  )
}

export default PublicLayout