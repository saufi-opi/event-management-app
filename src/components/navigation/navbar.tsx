import { Mountain } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import MaxWidthWrapper from '../max-width-wrapper'
import { Button } from '../ui/button'

function Navbar() {
  return (
    <header className="border-b-[1px] py-3">
      <MaxWidthWrapper className="flex h-14 items-center justify-between">
        <Link className="flex items-center justify-center" href="/">
          <Mountain className="h-8 w-8" />
        </Link>
        <span className="font-semibold">Event Management App</span>
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link href="/login">
            <Button>Get Started</Button>
          </Link>
        </nav>
      </MaxWidthWrapper>
    </header>
  )
}

export default Navbar
