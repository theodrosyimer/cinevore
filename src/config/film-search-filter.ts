type FilmSearchFilter = { title: string; href: string }

function createYearSearchFilter() {
  let yearFilters: FilmSearchFilter[] = []
  let decade: string

  for (let i = 20; i >= 18; i--) {
    let j = 0

    if (i === 20) {
      j = 2
    }

    if (i === 19) {
      j = 9
    }

    if (i === 18) {
      j = 9
      for (j; j >= 6; j--) {
        decade = `${i}${j}0s`
        // console.log(decade)
        yearFilters.push({ title: decade, href: decade })
      }
    } else {
      for (j; j >= 0; j--) {
        decade = `${i}${j}0s`
        // console.log(decade)
        yearFilters.push({ title: decade, href: decade })
      }
    }
  }
  return yearFilters
}

const decadeFilters = createYearSearchFilter()

export const yearFilters: FilmSearchFilter[] = [
  {
    title: 'All',
    href: '/docs/primitives/alert-dialog',
  },
  {
    title: 'Upcoming',
    href: '/docs/primitives/hover-card',
  },
  ...decadeFilters,
]

export const ratingFilters: FilmSearchFilter[] = [
  {
    title: 'Highest First',
    href: '/docs/primitives/alert-dialog',
  },
  {
    title: 'Lowest First',
    href: '/docs/primitives/hover-card',
  },
]

export const popularFilters: FilmSearchFilter[] = [
  {
    title: 'All Time',
    href: '/docs/primitives/alert-dialog',
  },
  {
    title: 'This Year',
    href: '/docs/primitives/hover-card',
  },
  {
    title: 'This Month',
    href: '/docs/primitives/progress',
  },
  {
    title: 'This Week',
    href: '/docs/primitives/scroll-area',
  },
]

export const genreFilters: FilmSearchFilter[] = [
  {
    title: 'Action',
    href: '/docs/primitives/alert-dialog',
  },
  {
    title: 'Adventure',
    href: '/docs/primitives/hover-card',
  },
  {
    title: 'Animation',
    href: '/docs/primitives/progress',
  },
  {
    title: 'Comedy',
    href: '/docs/primitives/scroll-area',
  },
  {
    title: 'Crime',
    href: '/docs/primitives/tooltip',
  },
  {
    title: 'Documentary',
    href: '/docs/primitives/tooltip',
  },
  {
    title: 'Drama',
    href: '/docs/primitives/tooltip',
  },
  {
    title: 'Family',
    href: '/docs/primitives/tooltip',
  },
  {
    title: 'Fantasy',
    href: '/docs/primitives/tooltip',
  },
  {
    title: 'History',
    href: '/docs/primitives/tooltip',
  },
  {
    title: 'Horror',
    href: '/docs/primitives/tooltip',
  },
  {
    title: 'Music',
    href: '/docs/primitives/tooltip',
  },
  {
    title: 'Mystery',
    href: '/docs/primitives/tooltip',
  },
  {
    title: 'Romance',
    href: '/docs/primitives/tooltip',
  },
  {
    title: 'Science Fiction',
    href: '/docs/primitives/tooltip',
  },
  {
    title: 'Thriller',
    href: '/docs/primitives/tooltip',
  },
  {
    title: 'TV Movie',
    href: '/docs/primitives/tooltip',
  },
  {
    title: 'War',
    href: '/docs/primitives/tooltip',
  },
  {
    title: 'Western',
    href: '/docs/primitives/tooltip',
  },
]

export const serviceFilters: FilmSearchFilter[] = [
  {
    title: 'Amazon US',
    href: '/docs/primitives/alert-dialog',
  },
  {
    title: 'Amazon Video US',
    href: '/docs/primitives/hover-card',
  },
  {
    title: 'Apple TV Plus FR',
    href: '/docs/primitives/progress',
  },
  {
    title: 'Apple TV FR',
    href: '/docs/primitives/scroll-area',
  },
  {
    title: 'FRA fr',
    href: '/docs/primitives/tooltip',
  },
]
