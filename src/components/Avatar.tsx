import { Avatar as HeroUIAvatar } from '@heroui/react'

interface AvatarProps {
  name?: string | null
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Avatar({ name, size = 'md', className }: AvatarProps) {
  const getInitials = (fullName?: string | null): string => {
    if (!fullName) return '?'

    const parts = fullName.trim().split(/\s+/)
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase()
    }

    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
  }

  const initials = getInitials(name)

  return (
    <HeroUIAvatar
      name={initials}
      size={size}
      className={className}
      showFallback
      classNames={{
        base: 'bg-gradient-to-br from-blue-500 to-purple-600',
        name: 'text-white font-semibold',
      }}
    />
  )
}
