import { Fragment, useMemo, useState } from 'react'

import Add from './Add'
import List from './List'
import Timer from './Timer'

function Wrapper() {
  const [list, setList] = useState(
    localStorage.getItem('myList')
      ? JSON.parse(localStorage.getItem('myList'))
      : [],
  )
  const [list2, setList2] = useState([])

  const onRemove1 = useMemo(
    () => (item) => {
      const newList = list.filter((value) => !(value.id === item.id))
      setList(newList)
      localStorage.setItem('myList', JSON.stringify(newList))
    },
    [list],
  )

  return (
    <>
      {list.length === 0 ? <Timer /> : null}
      {list.length ? <List list={list} onRemove={onRemove1} /> : null}
      {list2.length ? (
        <List
          list={list2}
          onRemove={(item) => {
            const newList = list2.filter((value) => !(value.id === item.id))
            setList2(newList)
          }}
        />
      ) : null}
      <Add
        onAdd={(value) => {
          const newList = [...list, value]
          setList(newList)
          localStorage.setItem('myList', JSON.stringify(newList))
        }}
      />
      <Add
        onAdd={(value) => {
          const newList = [...list2, value]
          setList2(newList)
        }}
      />
    </>
  )
}

export default Wrapper
