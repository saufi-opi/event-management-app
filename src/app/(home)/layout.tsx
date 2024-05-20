import React from 'react'

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav>Navbar</nav>
      {children}
      <footer>Footer</footer>
    </div>
  )
}

export default HomeLayout
