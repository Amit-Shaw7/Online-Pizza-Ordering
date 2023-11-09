import React from 'react';


const Box = ({title , value}) => {
  return (
    <div>
        <h3>{value}</h3>
        <p>{title}</p>
    </div>
  )
}

export default Box