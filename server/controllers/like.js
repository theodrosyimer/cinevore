/* eslint-disable no-shadow */
/* eslint-disable babel/camelcase */
import { Review } from '../models/review.js'
import { Like } from '../models/like.js'
import { Film } from '../models/film.js'

/* eslint-disable no-empty-function */
// export async function getLikes(req, res) {
//   const [reviews, fieldData] = await Like.fetchAll().catch(error => {
//     console.log(error)
//     return error
//   })

//   if (!reviews.length) {
//     return res.status(400).json({ error: 'No reviews was found!' })
//   }

//   const reviewsAndLikes = await Promise.all(
//     reviews.map(async review => {
//       review.reviews = []

//       const [reviews, tableInfos] = await Like.fetchAllByLikeId(review.review_id).catch(
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

export async function getLikesByFilmId(req, res) {
  const filmId = +req.params.filmId

  if (Number.isNaN(filmId)) {
    return res.status(400).json({
      error: `Invalid parameter type! \`id\` must be of type number, received ${JSON.stringify(
        req.params.filmId
      )}`,
    })
  }

  const [likes, fieldData] = await Like.fetchAllByFilmId(filmId).catch(
    error => {
      console.log(error)
      return error
    }
  )

  if (!likes.length) {
    return res.status(400).json({ error: 'No likes was found!' })
  }

  // const likesAndLikes = await Promise.all(
  //   likes.map(async review => {
  //     review.likes = []

  //     const [likes, tableInfos] = await Like.fetchAllByLikeId(review.review_id).catch(
  //       error => {
  //         console.log(error)
  //         return error
  //       }
  //     )

  //     for (const like of likes) {
  //       film.likes.push(like)
  //     }

  //     return review
  //   })
  // )
  res.status(200).json({ film_likes: likes })
}

// export async function getLikesByUserId(req, res) {
//   const userId = +req.params.userId

//   if (Number.isNaN(userId)) {
//     return res.status(400).json({
//       error: `Invalid parameter type! \`id\` must be of type number, received ${JSON.stringify(
//         req.params.userId
//       )}`,
//     })
//   }

//   const [reviews, fieldData] = await Like.fetchAllByUserId(userId).catch(
//     error => {
//       console.log(error)
//       return error
//     }
//   )

//   if (!reviews.length) {
//     return res.status(400).json({ error: 'No reviews was found!' })
//   }

//   const reviewsAndLikes = await Promise.all(
//     reviews.map(async review => {
//       review.likes = []

//       const [likes, tableInfos] = await Like.fetchAllByLikeId(review.review_id).catch(
//         error => {
//           console.log(error)
//           return error
//         }
//       )

//       for (const like of likes) {
//         film.likes.push(like)
//       }

//       return review
//     })
//   )
//   res.status(200).json({ reviews: reviewsAndLikes })
// }

// export async function getLikeByFilmId(req, res) {
//   const filmId = +req.params.filmId
//   const reviewId = +req.params.reviewId

//   if (Number.isNaN(reviewId) || Number.isNaN(filmId)) {
//     return res.status(400).json({
//       error: `Invalid parameter type! \`id\` must be of type number, received ${JSON.stringify(
//         filmId
//       )} and ${JSON.stringify(reviewId)}`,
//     })
//   }

//   const [reviews, fieldData] = await Like.findOneByFilmId(reviewId, filmId).catch(
//     error => {
//       console.log(error)
//       return error
//     }
//   )

//   if (!reviews.length) {
//     return res.status(400).json({ error: 'No reviews was found!' })
//   }

//   reviews[0].likes = []

//   const [likes, tableInfos] = await Like.fetchAllByLikeId(reviews[0].review_id).catch(
//     error => {
//       console.log(error)
//       return error
//     }
//   )

//   for (const like of likes) {
//     film.likes.push(like)
//   }

//   res.status(200).json({ reviews: reviews[0] })
// }

// export async function getLike(req, res) {
//   const id = +req.params.reviewId

//   if (Number.isNaN(id)) {
//     res.status(400).json({
//       error: `Invalid parameter type! \`id\` must be of type number, received ${JSON.stringify(
//         req.params.reviewId
//       )}`,
//     })
//   }
//   const [reviews, fieldData] = await Like.findById(id).catch(error => {
//     console.log(error)
//     return error
//   })

//   if (!reviews.length) {
//     return res.status(400).json({ error: 'No review was found!' })
//   }

//   const [reviews, tableInfos] = await Like.fetchAllByLikeId(reviews[0].review_id).catch(
//     error => {
//       console.log(error)
//       return error
//     }
//   )
//   reviews[0].reviews = [...reviews]

//   res.status(200).json({ review: reviews[0] })
// }

export async function postLikeFilm(req, res) {
  const filmId = +req.params.filmId

  if (Number.isNaN(filmId)) {
    return res.status(400).json({
      error: `Invalid parameter type! \`id\` must be of type number, received ${JSON.stringify(
        req.params.filmId
      )}`,
    })
  }

  const { userId } = req.user

  const [results, infos] = await Like.findLikeFilmByUserId(userId).catch(
    error => {
      console.log(error)
    }
  )

  if (results.length) {
    return res.status(400).json({ error: 'Like already exists!' })
  }

  Like.addToFilm({
    filmId,
    userId,
  })
    .then(results => {
      if (results.affectedRows === 0) {
        return res.status(400).json({ error: 'Like was not added!' })
      }

      res.status(201).json({ message: 'Like successfully added' })
    })
    .catch(error => {
      console.log(error)
      return res.status(400).json({ error: 'Like was not added!' })
    })
}

export async function deleteLikeFilm(req, res) {
  const filmId = +req.params.filmId
  const likeId = +req.params.likeId

  if (Number.isNaN(filmId) || Number.isNaN(likeId)) {
    return res.status(400).json({
      error: `Invalid parameter type! \`id\` must be of type number, received ${JSON.stringify(
        req.params.likeId
      )} and ${JSON.stringify(req.params.filmId)}`,
    })
  }

  const { userId, role } = req.user
  const isNotAdmin = role !== 1

  if (isNotAdmin) {
    const [results, tableInfos] = await Like.findByFilmId(filmId).catch(
      error => {
        console.log(error)
        return error.message
      }
    )

    if (results[0] == null) {
      return res.status(404).json({ error: 'Like does not exists!' })
    }

    if (results[0].user_id !== userId) {
      return res
        .status(403)
        .json({ error: 'Unauthorized to delete the review!' })
    }
  }

  Like.removeFromFilm(likeId, filmId)
    .then(([results]) => {
      if (!results.affectedRows)
        return res.status(404).json({ error: 'Like was not found!' })

      res.status(200).json({ message: 'Like was successfully deleted' })
    })
    .catch(error => {
      console.log(error)
      return error
    })
}

// export async function putLikeFilm(req, res) {
//   const filmId = +req.params.filmId
//   const reviewId = +req.params.reviewId

//   if (Number.isNaN(reviewId)) {
//     return res.status(400).json({
//       error: `Invalid parameter type! \`id\` must be of type number, received ${JSON.stringify(
//         req.params.reviewId
//       )}`,
//     })
//   }

//   const hasNoDataInput = !Object.values(req.body).length

//   if (hasNoDataInput) {
//     return res.status(400).json({ error: 'No input was provided!' })
//   }

//   const { userId, role } = req.user
//   const isNotAdmin = role !== 1

//   if (isNotAdmin) {
//     const [results, tableInfos] = await Like.findOneByFilmId(reviewId, filmId).catch(
//       error => {
//         console.log(error)
//         return error.message
//       }
//     )

//     if (results[0].user_id !== userId) {
//       return res.status(403).json({ error: 'Unauthorized to update the review!' })
//     }
//   }

//   Like.updateById(reviewId, req.body.content)
//     .then(results => {
//       res.status(200).json({ message: 'User successfully updated' })
//     })
//     .catch(error => {
//       console.log(error)
//       return error
//     })
// }

export async function getLikesByReviewId(req, res) {
  const filmId = +req.params.filmId
  const reviewId = +req.params.reviewId

  if (Number.isNaN(filmId) || Number.isNaN(reviewId)) {
    return res.status(400).json({
      error: `Invalid parameter type! \`id\` must be of type number, received ${JSON.stringify(
        req.params.reviewId
      )} and ${JSON.stringify(req.params.filmId)}`,
    })
  }

  const [likes, fieldData] = await Like.fetchAllByReviewId(reviewId).catch(
    error => {
      console.log(error)
      return error
    }
  )

  if (!likes.length) {
    return res.status(400).json({ error: 'No reviews was found!' })
  }

  // const reviewsAndLikes = await Promise.all(
  //   likes.map(async review => {
  //     review.likes = []

  //     const [likes, tableInfos] = await Like.fetchAllByLikeId(review.review_id).catch(
  //       error => {
  //         console.log(error)
  //         return error
  //       }
  //     )

  //     for (const like of likes) {
  //       film.likes.push(like)
  //     }

  //     return review
  //   })
  // )
  res.status(200).json({ review_likes: likes })
}

export async function postLikeReview(req, res) {
  const filmId = +req.params.filmId
  const reviewId = +req.params.reviewId

  if (Number.isNaN(filmId) || Number.isNaN(reviewId)) {
    return res.status(400).json({
      error: `Invalid parameter type! \`id\` must be of type number, received ${JSON.stringify(
        req.params.filmId
      )} and ${JSON.stringify(req.params.filmId)}`,
    })
  }

  const { userId } = req.user

  const [results, infos] = await Like.findLikeReviewByUserId(userId).catch(
    error => {
      console.log(error)
    }
  )

  if (results.length) {
    return res.status(400).json({ error: 'Like already exists!' })
  }

  Like.addToReview({
    reviewId,
    userId,
  })
    .then(results => {
      if (results.affectedRows === 0) {
        return res.status(400).json({ error: 'Like was not added!' })
      }

      res.status(201).json({ message: 'Like successfully added' })
    })
    .catch(error => {
      console.log(error)
      return res.status(400).json({ error: 'Like was not added!' })
    })
}

// export async function putLikeReview(req, res) {
//   const filmId = +req.params.filmId
//   const reviewId = +req.params.reviewId

//   if (Number.isNaN(reviewId)) {
//     return res.status(400).json({
//       error: `Invalid parameter type! \`id\` must be of type number, received ${JSON.stringify(
//         req.params.reviewId
//       )}`,
//     })
//   }

//   const hasNoDataInput = !Object.values(req.body).length

//   if (hasNoDataInput) {
//     return res.status(400).json({ error: 'No input was provided!' })
//   }

//   const { userId, role } = req.user
//   const isNotAdmin = role !== 1

//   if (isNotAdmin) {
//     const [results, tableInfos] = await Like.findOneByFilmId(reviewId, filmId).catch(
//       error => {
//         console.log(error)
//         return error.message
//       }
//     )

//     if (results[0].user_id !== userId) {
//       return res.status(403).json({ error: 'Unauthorized to update the review!' })
//     }
//   }

//   Like.updateById(reviewId, req.body.content)
//     .then(results => {
//       res.status(200).json({ message: 'User successfully updated' })
//     })
//     .catch(error => {
//       console.log(error)
//       return error
//     })
// }
export async function deleteLikeReview(req, res) {
  const reviewId = +req.params.reviewId
  const likeId = +req.params.likeId

  if (Number.isNaN(reviewId) || Number.isNaN(likeId)) {
    return res.status(400).json({
      error: `Invalid parameter type! \`id\` must be of type number, received ${JSON.stringify(
        req.params.likeId
      )} and ${JSON.stringify(req.params.reviewId)}`,
    })
  }

  const { userId, role } = req.user
  const isNotAdmin = role !== 1

  if (isNotAdmin) {
    const [results, tableInfos] = await Like.findByReviewId(reviewId).catch(
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

  Like.removeFromReview(likeId, reviewId)
    .then(([results]) => {
      if (!results.affectedRows)
        return res.status(404).json({ error: 'Like was not found!' })

      return res.status(200).json({ message: 'Like was successfully deleted' })
    })
    .catch(error => {
      console.log(error)
      return error
    })
}
