import Image from 'next/image'
import { Button } from '../ui/button'
import {Search, List, LayoutGrid, User, Menu, ShoppingCart, Store, FileText, Settings, } from 'lucide-react'

const SideBar = () => {
  return (
    <aside className="w-[102px] z-10 absolute top-0  h-[1029px] flex flex-col items-center py-6 bg-white border-r border-[#e6e6e6] shadow-sm">
        <div className="mb-8">
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt="Africa Map Logo"
            width={40}
            height={40}
            className="text-[#2e7d32]"
          />
        </div>
        <nav className="flex flex-col space-y-6">
          <Button variant="ghost" size="icon" className="text-[#666666] hover:bg-[#f8f8f8] hover:text-[#2e7d32]">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-[#f8f8f8] text-[#2e7d32] hover:bg-[#f8f8f8] hover:text-[#2e7d32]"
          >
            <LayoutGrid className="h-5 w-5" />
            <span className="sr-only">Dashboard</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-[#666666] hover:bg-[#f8f8f8] hover:text-[#2e7d32]">
            <User className="h-5 w-5" />
            <span className="sr-only">Users</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-[#666666] hover:bg-[#f8f8f8] hover:text-[#2e7d32]">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-[#666666] hover:bg-[#f8f8f8] hover:text-[#2e7d32]">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-[#666666] hover:bg-[#f8f8f8] hover:text-[#2e7d32]">
            <Store className="h-5 w-5" />
            <span className="sr-only">Store</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-[#666666] hover:bg-[#f8f8f8] hover:text-[#2e7d32]">
            <FileText className="h-5 w-5" />
            <span className="sr-only">Files</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-[#666666] hover:bg-[#f8f8f8] hover:text-[#2e7d32]">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-[#666666] hover:bg-[#f8f8f8] hover:text-[#2e7d32]">
            <List className="h-5 w-5" />
            <span className="sr-only">List</span>
          </Button>
        </nav>
      </aside>
  )
}

export default SideBar