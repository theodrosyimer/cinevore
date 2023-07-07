import type { Request, Response } from 'express'

export function getHome(req: Request, res: Response) {
  res.status(200).json({ message: 'Still under construction! But its coming...' })
}
