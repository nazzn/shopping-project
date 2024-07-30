import React from 'react'

const DashboardLayout : React.FC<{
    children: React.ReactNode
}> = ({children}) => {
  return (
    <div>
        <h1 className='bg-indigo-600 text-white p-4'>Dashboard Layout!</h1>
        <div className='p-4'>
            {children}
        </div>
    </div>
  )
}

export default DashboardLayout