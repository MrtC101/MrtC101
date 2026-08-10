import { GithubLogoIcon, LinkedinLogoIcon, type Icon } from '@phosphor-icons/react'

type SocialConfig = {
  icon: Icon
  href: (username: string) => string
  label: (username: string) => string
}

const socialByNetwork: Record<string, SocialConfig> = {
  LinkedIn: {
    icon: LinkedinLogoIcon,
    href: (username) => `https://linkedin.com/in/${username}`,
    label: (username) => `linkedin.com/in/${username}`,
  },
  GitHub: {
    icon: GithubLogoIcon,
    href: (username) => `https://github.com/${username}`,
    label: (username) => `github.com/${username}`,
  },
}

export function getSocialConfig(network: string): SocialConfig | null {
  return socialByNetwork[network] ?? null
}
