/**
 * Integration test for GET /version.
 * Focus: HTTP behavior & payload shape.
 */
import { readFileSync } from 'node:fs'
import request from 'supertest'
import app from '../src/app.js'
import { describe, it, expect } from 'vitest'

describe('GET /version', () => {
  it('returns package version as a non-empty string', async () => {
    const res = await request(app).get('/version')
    expect(res.status).toBe(200)
    expect(typeof res.body.version).toBe('string')
    expect(res.body.version.length).toBeGreaterThan(0)
  })

  it('responds with JSON content-type', async () => {
    const res = await request(app).get('/version')
    expect(res.headers['content-type']).toMatch(/application\/json/)
  })
})

describe('DEVOPS-1 - version consistency', () => {
  it('returns the exact version defined in package.json', async () => {
    const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))
    const res = await request(app).get('/version')

    expect(res.status).toBe(200)
    expect(res.body).toEqual({ version: pkg.version })
  })
})
