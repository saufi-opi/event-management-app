'use client'

import React, { useState } from 'react'
import Sidebar from './sidebar'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { Menu, X } from 'lucide-react'

interface Props {
  className?: string
}

function MobileSidebar({ className }: Props) {
  const [show, setShow] = useState<boolean>(false)

  const handleClose = () => {
    setShow((prev) => !prev)
  }
  return (
    <>
      {show && <div className="absolute z-40 h-screen w-screen bg-black/20" onClick={handleClose} />}
      <div className={cn('', className)}>
        <Button className="absolute left-5 top-5" onClick={handleClose} variant="outline">
          {show ? <X /> : <Menu />}
        </Button>
        <div onClick={handleClose}>
          <Sidebar className={`absolute z-50 -translate-x-full duration-300 ${show && 'translate-x-0'}`} />
        </div>
      </div>
    </>
  )
}

export default MobileSidebar
