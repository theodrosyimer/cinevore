/* eslint-disable babel/camelcase */
import { Review } from '../models/review.js'
import { Like } from '../models/like.js'

/* eslint-disable no-empty-function */
// export async function getReviews(req, res) {
//   const [reviews, fieldData] = await Review.fetchAll().catch(error => {
//     console.log(error)
//     return error
//   })

//   if (!reviews.length) {
//     return res.status(400).json({ error: 'No reviews was found!' })
//   }

//   const reviewsAndLikes = await Promise.all(
//     reviews.map(async review => {
//       review.reviews = []

//       const [reviews, tableInfos] = await Review.fetchAllByReviewId(review.review_id).catch(
//         error => {
//           console.log(error)
//           return error
//         }
//       )

//       review.reviews.push(...reviews)
//       return review
//     })
//   )
//   res.status(200).json({ reviews: reviewsAndLikes })
// }

export async function getReviewsByFilmId(req, res) {
  const id = +req.params.filmId

  if (Number.isNaN(id)) {
    return res.status(400).json({
      error: `Invalid parameter type! \`id\` must be of type number, received ${JSON.stringify(
        req.params.filmId
      )}`,
    })
  }

  const [reviews, fieldData] = await Review.fetchAllByFilmId(id).catch(
    error => {
      console.log(error)
      return error
    }
  )

  if (!reviews.length) {
    return res.status(400).json({ error: 'No reviews was found!' })
  }

  const reviewsAndLikes = await Promise.all(
    reviews.map(async review => {
      review.likes = []

      const [likes, tableInfos] = await Like.fetchAllByReviewId(
        review.review_id
      ).catch(error => {
        console.log(error)
        return error
      })

      for (const like of likes) {
        review.likes.push(like)
      }

      return review
    })
  )
  res.status(200).json({ reviews: reviewsAndLikes })
}

export async function getReviewsByUserId(req, res) {
  const userId = +req.params.userId

  if (Number.isNaN(userId)) {
    return res.status(400).json({
      error: `Invalid parameter type! \`id\` must be of type number, received ${JSON.stringify(
        req.params.userId
      )}`,
    })
  }

  const [reviews, fieldData] = await Review.fetchAllByUserId(userId).catch(
    error => {
      console.log(error)
      return error
    }
  )

  if (!reviews.length) {
    return res.status(400).json({ error: 'No reviews was found!' })
  }

  const reviewsAndLikes = await Promise.all(
    reviews.map(async review => {
      review.likes = []

      const [likes, tableInfos] = await Like.fetchAllByReviewId(
        review.review_id
      ).catch(error => {
        console.log(error)
        return error
      })

      for (const like of likes) {
        review.likes.push(like)
      }

      return review
    })
  )
  res.status(200).json({ reviews: reviewsAndLikes })
}

export async function getReviewByFilmId(req, res) {
  const filmId = +req.params.filmId
  const reviewId = +req.params.reviewId

  if (Number.isNaN(reviewId) || Number.isNaN(filmId)) {
    return res.status(400).json({
      error: `Invalid parameter type! \`id\` must be of type number, received ${JSON.stringify(
        filmId
      )} and ${JSON.stringify(reviewId)}`,
    })
  }

  const [reviews, fieldData] = await Review.findOneByFilmId(
    reviewId,
    filmId
  ).catch(error => {
    console.log(error)
    return error
  })

  if (!reviews.length) {
    return res.status(400).json({ error: 'No reviews was found!' })
  }

  reviews[0].likes = []

  const [likes, tableInfos] = await Like.fetchAllByReviewId(
    reviews[0].review_id
  ).catch(error => {
    console.log(error)
    return error
  })

  for (const like of likes) {
    reviews[0].likes.push(like)
  }

  res.status(200).json({ reviews: reviews[0] })
}

// export async function getReview(req, res) {
//   const id = +req.params.reviewId

//   if (Number.isNaN(id)) {
//     res.status(400).json({
//       error: `Invalid parameter type! \`id\` must be of type number, received ${JSON.stringify(
//         req.params.reviewId
//       )}`,
//     })
//   }
//   const [reviews, fieldData] = await Review.findById(id).catch(error => {
//     console.log(error)
//     return error
//   })

//   if (!reviews.length) {
//     return res.status(400).json({ error: 'No review was found!' })
//   }

//   const [reviews, tableInfos] = await Review.fetchAllByReviewId(reviews[0].review_id).catch(
//     error => {
//       console.log(error)
//       return error
//     }
//   )
//   reviews[0].reviews = [...reviews]

//   res.status(200).json({ review: reviews[0] })
// }

export async function postReview(req, res) {
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

  const { userId } = req.user
  const { content } = req.body

  if (!content) {
    return res.status(400).json({ error: 'No content was provided!' })
  }

  Review.addToFilm({
    filmId,
    userId,
    content,
  })
    .then(results => {
      if (results.affectedRows === 0) {
        return res.status(400).json({ error: 'Review already exists!' })
      }

      res.status(201).json({ message: 'Review successfully added' })
    })
    .catch(error => {
      console.log(error)
      return res.status(400).json({ error: 'Review was not created!' })
    })
}

export async function putReview(req, res) {
  const filmId = +req.params.filmId
  const reviewId = +req.params.reviewId

  if (Number.isNaN(reviewId)) {
    return res.status(400).json({
      error: `Invalid parameter type! \`id\` must be of type number, received ${JSON.stringify(
        req.params.reviewId
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
    const [results, tableInfos] = await Review.findOneByFilmId(
      reviewId,
      filmId
    ).catch(error => {
      console.log(error)
      return error.message
    })

    if (results[0].user_id !== userId) {
      return res
        .status(403)
        .json({ error: 'Unauthorized to update the review!' })
    }
  }

  Review.updateById(reviewId, req.body.content)
    .then(results => {
      res.status(200).json({ message: 'User successfully updated' })
    })
    .catch(error => {
      console.log(error)
      return error
    })
}

export async function deleteReview(req, res) {
  const filmId = +req.params.filmId
  const reviewId = +req.params.reviewId

  if (Number.isNaN(reviewId)) {
    return res.status(400).json({
      error: `Invalid parameter type! \`id\` must be of type number, received ${JSON.stringify(
        req.params.reviewId
      )}`,
    })
  }

  const { userId, role } = req.user
  const isNotAdmin = role !== 1

  if (isNotAdmin) {
    const [results, tableInfos] = await Review.findOneByFilmId(reviewId).catch(
      error => {
        console.log(error)
        return error.message
      }
    )

    if (results[0].user_id !== userId) {
      return res
        .status(403)
        .json({ error: 'Unauthorized to delete the review!' })
    }
  }

  Review.deleteById(reviewId)
    .then(([results]) => {
      if (!results.affectedRows)
        return res.status(404).json({ error: 'Review was not found!' })

      res.status(200).json({ message: 'Review was successfully deleted' })
    })
    .catch(error => {
      console.log(error)
      return error
    })
}
