/// <reference types="@cloudflare/workers-types" />

interface Env {
  DB: D1Database
}

type StoredMessage = {
  id: string
  alias: string
  message: string
  created_at: string
}

const MAX_ALIAS = 20
const MAX_MESSAGE = 280
const PAGE_SIZE = 500

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const { results } = await env.DB
    .prepare(
      'SELECT id, alias, message, created_at FROM messages ORDER BY created_at DESC LIMIT ?',
    )
    .bind(PAGE_SIZE)
    .all<StoredMessage>()

  return Response.json(results)
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: { alias?: unknown, message?: unknown }
  try {
    body = await request.json()
  }
  catch {
    return new Response('Expected a JSON body', { status: 400 })
  }

  const message = String(body.message ?? '').trim().slice(0, MAX_MESSAGE)
  if (!message) return new Response('Message is required', { status: 400 })

  const alias = String(body.alias ?? '').trim().slice(0, MAX_ALIAS)
  if (!alias) return new Response('Alias is required', { status: 400 })

  const row: StoredMessage = {
    id: crypto.randomUUID(),
    alias,
    message,
    created_at: new Date().toISOString(),
  }

  await env.DB
    .prepare(
      'INSERT INTO messages (id, alias, message, created_at) VALUES (?, ?, ?, ?)',
    )
    .bind(row.id, row.alias, row.message, row.created_at)
    .run()

  return Response.json(row, { status: 201 })
}
