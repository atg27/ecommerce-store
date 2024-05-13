import { Nav, NavLink } from '@/components/Nav'

export const dynamic = 'force-dynamic'
//nextjs wont cache any admin pages - working from good internet connection, most recent data

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/products">Products</NavLink>
        <NavLink href="/orders">My Orders</NavLink>
      </Nav>
      <div className="container my-6"> {children} </div>
    </>
  )
}
