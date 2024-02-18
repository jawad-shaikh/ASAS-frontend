import React from 'react'

const TableHeader = ({title}: {title:string}) => {
  return (
    <h1 className='my-6 text-3xl font-medium'>{title}</h1>
  )
}

export default TableHeader