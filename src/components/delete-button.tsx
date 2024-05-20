'use client'

import React from 'react'
import { Button } from './ui/button'

interface Props {
  id: string | number
  action: unknown
}

function DeleteButton(props: Props) {
  const handleClick = async () => {
    if (typeof props.action === 'function') {
      await props.action(props.id)
    }
  }
  return (
    <Button variant="ghost" onClick={() => handleClick()}>
      <p className="text-destructive">Delete</p>
    </Button>
  )
}

export default DeleteButton
