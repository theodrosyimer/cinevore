import { Router } from 'express'

const router = Router()

router.get('/account/:accountId', (req, res) => {
  res.send('account')
})

// router.post('/account', (req, res) => {
//   res.send('account')
// })

router.put('/account/:accountId', (req, res) => {
  res.send('account')
})

router.delete('/account/:accountId', (req, res) => {
  res.send('account')
})

export const accountRouter = router
