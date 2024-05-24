import { Flame } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import MaxWidthWrapper from '../max-width-wrapper'
import { Button } from '../ui/button'

function Navbar() {
  return (
    <header className="border-b-[1px] py-3">
      <MaxWidthWrapper className="flex h-14 items-center justify-between">
        <Link className="flex items-center justify-center" href="/">
          <Flame className="h-8 w-8" />
        </Link>
        <span className="text-xl font-semibold">Event Management App</span>
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link href="/dashboard/event">
            <Button>Get Started</Button>
          </Link>
        </nav>
      </MaxWidthWrapper>
    </header>
  )
}

export default Navbar
