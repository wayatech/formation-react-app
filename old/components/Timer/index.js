import React, { useEffect, useState } from 'react'
import { string } from 'prop-types'

function Timer({ bgColor }) {
  const [seconds, setSecond] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSecond((s) => s + 1)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return <div style={{ backgroundColor: bgColor }}>ddd Secondes :{seconds}</div>
}

Timer.propTypes = {
  bgColor: string,
}

Timer.defaultProps = {
  bgColor: 'pink',
}

export default Timer
