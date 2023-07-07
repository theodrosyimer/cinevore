/* eslint-disable prefer-destructuring */
/* eslint-disable babel/camelcase */
import type { Request, Response } from 'express'

import { Review } from '../models/review.js'
import { User } from '../models/user.js'
import { Like } from '../models/like.js'
import { Film } from '../models/film.js'

/* eslint-disable no-empty-function */
export async function getFilms(req: Request, res: Response) {
  const [films, fieldData] = await Film.fetchAll().catch(error => {
    console.log(error)
    return res.status(500)
  })

  if (!films.length) {
    return res.status(400).json({ error: 'No films was found!' })
  }

  const filmsAndReviews = await Promise.all(
    films.map(async film => {
      const [user, userTableInfos] = await User.findById(film.user_id).catch(
        error => {
          console.log(error)
          return res.status(400).json({ error: 'No user was found!' })
        }
      )

      film.published_by = user[0]

      film.reviews = []

      const [reviews, tableInfos] = await Review.fetchAllByFilmId(
        film.film_id
      ).catch(error => {
        console.log(error)
        return res.status(400).json({ error: 'No reviews was found!' })
      })

      for (const review of reviews) {
        film.reviews.push(review)
      }

      film.likes = []

      const [likes, infos] = await Like.fetchAllByFilmId(film.film_id).catch(
        error => {
          console.log(error)
          return res.status(400).json({ error: 'No likes was found!' })
        }
      )

      for (const like of likes) {
        film.likes.push(like)
      }

      delete film.user_id

      return film
    })
  )
  res.status(200).json({ films: filmsAndReviews })
}

export async function getFilmsByUserId(req: Request, res: Response) {
  const id = +req.params.userId

  if (Number.isNaN(id)) {
    return res.status(400).json({
      error: `Invalid parameter type! \`id\` must be of type number, received ${JSON.stringify(
        req.params.id
      )}`,
    })
  }

  const [films, fieldData] = await Film.fetchAllByUserId(id).catch(error => {
    console.log(error)
    return error
  })

  if (!films.length) {
    return res.status(400).json({ error: 'No films was found!' })
  }

  const filmsAndReviews = await Promise.all(
    films.map(async film => {
      const [user, userTableInfos] = await User.findById(film.user_id).catch(
        error => {
          console.log(error)
          return res.status(400).json({ error: 'No user was found!' })
        }
      )

      film.published_by = user[0]

      film.reviews = []

      const [reviews, tableInfos] = await Review.fetchAllByFilmId(
        film.film_id
      ).catch(error => {
        console.log(error)
        return error
      })

      for (const review of reviews) {
        film.reviews.push(review)
      }

      film.likes = []

      const [likes, infos] = await Like.fetchAllByFilmId(film.film_id).catch(
        error => {
          console.log(error)
          return error
        }
      )

      for (const like of likes) {
        film.likes.push(like)
      }

      delete film.user_id
      return film
    })
  )
  res.status(200).json({ films: filmsAndReviews })
}

export async function getFilmByUserId(req: Request, res: Response) {
  const userId = +req.params.userId
  const filmId = +req.params.filmId

  if (Number.isNaN(filmId) || Number.isNaN(userId)) {
    return res.status(400).json({
      error: `Invalid parameter type! \`id\` must be of type number, received ${JSON.stringify(
        userId
      )} and ${JSON.stringify(filmId)}`,
    })
  }

  const [films, fieldData] = await Film.findOneByUserId(filmId, userId).catch(
    error => {
      console.log(error)
      return error
    }
  )

  if (!films.length) {
    return res.status(400).json({ error: 'No films was found!' })
  }

  const filmsAndReviews = await Promise.all(
    films.map(async film => {
      const [user, userTableInfos] = await User.findById(film.user_id).catch(
        error => {
          console.log(error)
          return res.status(400).json({ error: 'No user was found!' })
        }
      )

      film.published_by = user[0]

      film.reviews = []

      const [reviews, tableInfos] = await Review.fetchAllByFilmId(
        film.film_id
      ).catch(error => {
        console.log(error)
        return error
      })

      for (const review of reviews) {
        film.reviews.push(review)
      }

      film.likes = []

      const [likes, infos] = await Like.fetchAllByFilmId(film.film_id).catch(
        error => {
          console.log(error)
          return error
        }
      )

      for (const like of likes) {
        film.likes.push(like)
      }

      delete film.user_id
      return film
    })
  )
  res.status(200).json({ films: filmsAndReviews })
}

export async function getFilm(req: Request, res: Response) {
  const id = +req.params.filmId

  if (Number.isNaN(id)) {
    return res.status(400).json({
      error: `Invalid parameter type! \`id\` must be of type number, received ${JSON.stringify(
        req.params.filmId
      )}`,
    })
  }
  const [films, fieldData] = await Film.findById(id).catch(error => {
    console.log(error)
    return error
  })

  if (!films.length) {
    return res.status(400).json({ error: 'No film was found!' })
  }

  const [reviews, tableInfos] = await Review.fetchAllByFilmId(
    films[0].film_id
  ).catch(error => {
    console.log(error)
    return error
  })

  const [user, userTableInfos] = await User.findById(films[0].user_id).catch(
    error => {
      console.log(error)
      return res.status(400).json({ error: 'No user was found!' })
    }
  )

  films[0].published_by = user[0]

  films[0].reviews = []

  for (const review of reviews) {
    films[0].reviews.push(review)
  }

  films[0].likes = []

  const [likes, infos] = await Like.fetchAllByFilmId(films[0].film_id).catch(
    error => {
      console.log(error)
      return error
    }
  )

  for (const like of likes) {
    films[0].likes.push(like)
  }

  delete films[0].user_id

  res.status(200).json(films[0])
}

export async function postFilm(req: Request, res: Response) {
  const hasNoDataInput = !Object.values(req.body).length

  if (hasNoDataInput) {
    return res.status(400).json({ error: 'No input was provided!' })
  }

  const { userId, content } = req.body

  if (!userId) {
    return res.status(400).json({ error: 'No userId was provided!' })
  }

  Film.create({
    userId,
    content,
  })
    .then(results => {
      if (results.affectedRows === 0) {
        return res.status(400).json({ error: 'Film already exists!' })
      }

      res.status(201).json({ message: 'Film successfully created' })
    })
    .catch(error => {
      console.log(error)
      return res.status(400).json({ error: 'Film Film was not created!' })
    })
}

export async function putFilm(req: Request, res: Response) {
  const filmId = +req.params.filmId

  if (Number.isNaN(filmId)) {
    return res.status(400).json({
      error: `Invalid parameter type! \`id\` must be of type number, received ${JSON.stringify(
        req.params.filmId
      )}`,
    })
  }

  const hasNoDataInput = !Object.values(req.body).length

  if (hasNoDataInput) {
    return res.status(400).json({ error: 'No input was provided!' })
  }

  const { userId, role } = req.user
  const isNotAdmin = role !== 1

  if (isNotAdmin) {
    const [results, tableInfos] = await Film.findById(filmId).catch(error => {
      console.log(error)
      return error.message
    })

    if (results[0].user_id !== userId) {
      return res.status(403).json({ error: 'Unauthorized to update the film!' })
    }
  }

  Film.updateById(filmId, req.body.content)
    .then(results => {
      res.status(200).json({ message: 'Film successfully updated' })
    })
    .catch(error => {
      console.log(error)
      return error
    })
}

export async function deleteFilm(req: Request, res: Response) {
  const filmId = +req.params.filmId

  if (Number.isNaN(filmId)) {
    return res.status(400).json({
      error: `Invalid parameter type! \`id\` must be of type number, received ${JSON.stringify(
        req.params.filmId
      )}`,
    })
  }

  const { userId, role } = req.user
  const isNotAdmin = role !== 1

  if (isNotAdmin) {
    const [results, tableInfos] = await Film.findById(filmId).catch(error => {
      console.log(error)
      return error.message
    })

    if (results[0].user_id !== userId) {
      return res.status(403).json({ error: 'Unauthorized to delete the film!' })
    }
  }

  Film.deleteById(filmId)
    .then(([results]) => {
      if (!results.affectedRows)
        return res.status(404).json({ error: 'Film was not found!' })

      res.status(200).json({ message: 'Film was successfully deleted' })
    })
    .catch(error => {
      console.log(error)
      return error
    })
}
