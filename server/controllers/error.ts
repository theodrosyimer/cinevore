import type { Request, Response } from 'express'

export function get404(req: Request, res: Response) {
  res.status(404).json({ error: 'Page Not Found' })
}
