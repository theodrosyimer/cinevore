import type { IconName } from '@/components/icon/icons'

export const featuresConfig = [
  {
    name: 'watchlist',
    icon: 'watched',
    description: 'Keep track of every film you ever watched.',
    enabled: true,
  },
  {
    name: 'likes',
    icon: 'like',
    description:
      'Show some love for your favorite films, lists and reviews with a “like”',
    enabled: true,
  },
  {
    name: 'reviews',
    icon: 'page',
    description:
      'Write and share reviews, and follow friends and other members to read theirs',
    enabled: true,
  },
  {
    name: 'rate-movies',
    icon: 'star',
    description:
      'Rate each film on a five- star scale(with halves) to record and share your reaction',
    enabled: true,
  },
  {
    name: 'diary',
    icon: 'calendar',
    description:
      'Keep a diary of your film watching (and upgrade to Pro for comprehensive stats)',
    enabled: true,
  },
  {
    name: 'lists',
    icon: 'layoutGrid',
    description:
      'Compile and share lists of films on any topic and keep a watchlist of films to see',
    enabled: true,
  },
] satisfies Feature[]

export type Feature = {
  name: 'watchlist' | 'likes' | 'reviews' | 'rate-movies' | 'diary' | 'lists'
  description: string
  enabled: boolean
  icon: IconName
}
