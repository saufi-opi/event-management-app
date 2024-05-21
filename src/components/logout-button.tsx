'use client'

import React from 'react'
import { Button, type ButtonProps } from './ui/button'
import { signOut } from 'next-auth/react'

type Props = Omit<ButtonProps, 'onClick'>

function LogoutButton(props: Props) {
  const handleClick = async () => {
    await signOut()
  }

  return (
    <Button {...props} onClick={() => handleClick()}>
      {props.children}
    </Button>
  )
}

export default LogoutButton
