import { Router } from 'express'
import { upload } from '../middlewares/upload'
import { uploadFiles } from '../controllers/upload'

const router = Router()

router.post('/upload', upload.single('file'), uploadFiles)
export const uploadRouter = router
