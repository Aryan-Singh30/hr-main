'use client'

import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button
} from '@heroui/react'
import { signOut } from 'next-auth/react'
import { Avatar } from './Avatar'

interface NavbarProps {
  user: {
    name?: string | null
    email?: string | null
  }
}

export function Navbar({ user }: NavbarProps) {
  return (
    <HeroNavbar
      maxWidth="xl"
      className="bg-white/70 backdrop-blur-md border-b border-slate-200"
      classNames={{
        wrapper: "px-4 sm:px-6"
      }}
    >
      <NavbarBrand>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center mr-3 shadow-sm">
          <span className="text-white font-bold text-lg">H</span>
        </div>
        <p className="font-bold text-slate-800 text-lg tracking-tight">HR System</p>
      </NavbarBrand>

      <NavbarContent justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <div className="flex items-center gap-3 cursor-pointer transition-opacity hover:opacity-80">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-semibold text-slate-700">{user.name}</span>
                <span className="text-xs text-slate-500">{user.email}</span>
              </div>
              <Avatar name={user.name} size="md" />
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user.email}</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger" onPress={() => signOut()}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </HeroNavbar>
  )
}
