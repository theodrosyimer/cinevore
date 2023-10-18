type FilmSearchFilter = { title: string; value: string }

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
        yearFilters.push({ title: decade, value: decade })
      }
    } else {
      for (j; j >= 0; j--) {
        decade = `${i}${j}0s`
        // console.log(decade)
        yearFilters.push({ title: decade, value: decade })
      }
    }
  }
  return yearFilters
}

const decadeFilters = createYearSearchFilter()

export const yearFilters: FilmSearchFilter[] = [
  {
    title: 'All',
    value: '/docs/primitives/alert-dialog',
  },
  {
    title: 'Upcoming',
    value: '/docs/primitives/hover-card',
  },
  ...decadeFilters,
]

export const ratingFilters: FilmSearchFilter[] = [
  {
    title: 'Highest First',
    value: '/docs/primitives/alert-dialog',
  },
  {
    title: 'Lowest First',
    value: '/docs/primitives/hover-card',
  },
]

export const popularFilters: FilmSearchFilter[] = [
  {
    title: 'All Time',
    value: '/docs/primitives/alert-dialog',
  },
  {
    title: 'This Year',
    value: '/docs/primitives/hover-card',
  },
  {
    title: 'This Month',
    value: '/docs/primitives/progress',
  },
  {
    title: 'This Week',
    value: '/docs/primitives/scroll-area',
  },
]

export const genreFilters: FilmSearchFilter[] = [
  {
    title: 'Action',
    value: '/docs/primitives/alert-dialog',
  },
  {
    title: 'Adventure',
    value: '/docs/primitives/hover-card',
  },
  {
    title: 'Animation',
    value: '/docs/primitives/progress',
  },
  {
    title: 'Comedy',
    value: '/docs/primitives/scroll-area',
  },
  {
    title: 'Crime',
    value: '/docs/primitives/tooltip',
  },
  {
    title: 'Documentary',
    value: '/docs/primitives/tooltip',
  },
  {
    title: 'Drama',
    value: '/docs/primitives/tooltip',
  },
  {
    title: 'Family',
    value: '/docs/primitives/tooltip',
  },
  {
    title: 'Fantasy',
    value: '/docs/primitives/tooltip',
  },
  {
    title: 'History',
    value: '/docs/primitives/tooltip',
  },
  {
    title: 'Horror',
    value: '/docs/primitives/tooltip',
  },
  {
    title: 'Music',
    value: '/docs/primitives/tooltip',
  },
  {
    title: 'Mystery',
    value: '/docs/primitives/tooltip',
  },
  {
    title: 'Romance',
    value: '/docs/primitives/tooltip',
  },
  {
    title: 'Science Fiction',
    value: '/docs/primitives/tooltip',
  },
  {
    title: 'Thriller',
    value: '/docs/primitives/tooltip',
  },
  {
    title: 'TV Movie',
    value: '/docs/primitives/tooltip',
  },
  {
    title: 'War',
    value: '/docs/primitives/tooltip',
  },
  {
    title: 'Western',
    value: '/docs/primitives/tooltip',
  },
]

export const serviceFilters: FilmSearchFilter[] = [
  {
    title: 'Amazon US',
    value: '/docs/primitives/alert-dialog',
  },
  {
    title: 'Amazon Video US',
    value: '/docs/primitives/hover-card',
  },
  {
    title: 'Apple TV Plus FR',
    value: '/docs/primitives/progress',
  },
  {
    title: 'Apple TV FR',
    value: '/docs/primitives/scroll-area',
  },
  {
    title: 'FRA fr',
    value: '/docs/primitives/tooltip',
  },
]
