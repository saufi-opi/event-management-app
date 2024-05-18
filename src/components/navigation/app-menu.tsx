import { Book, PersonStanding } from 'lucide-react'
import React from 'react'
import NavLink from './nav-link'

export interface Menu {
  title: string
  href: string
  icon?: React.ReactNode
}

function AppMenu() {
  const menu: Menu[] = [
    {
      title: 'Events',
      href: '/dashboard/event',
      icon: <Book />
    },
    {
      title: 'Participants',
      href: '/dashboard/participant',
      icon: <PersonStanding />
    }
  ]
  return (
    <>
      {menu.map((m) => (
        <NavLink key={m.href} {...m} />
      ))}
    </>
  )
}

export default AppMenu
