/**
 * GET /boom → simulates a server failure to exercise the global error handler.
 * Response (via errorHandler): HTTP 500 with { error: true, message }
 */
import { Router } from 'express'

const router = Router()

router.get('/boom', (_req, _res, next) => {
  const err = new Error('Simulated server error')
  err.status = 500
  next(err)
})

export default router
