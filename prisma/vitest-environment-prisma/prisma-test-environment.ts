import 'dotenv/config'
import type { Environment } from 'vitest'
import { randomUUID } from 'crypto'
import { execSync } from 'node:child_process'
import { PrismaClient } from '@prisma/client'

// DATABASE_URL="postgresql://docker:docker@localhost:5432/apisolid?schema=public"
const prisma = new PrismaClient()

function NewUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('VARIAVEL EM FALTA')
  }
  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schema)
  return url.toString()
}

const PrismaTestEnvironment: Environment = {
  name: 'prisma',
  async setup() {
    const schema = randomUUID()
    const databaseurl = NewUrl(schema)
    process.env.DATABASE_URL = databaseurl
    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )
        await prisma.$disconnect()
      },
    }
  },
  transformMode: 'web',
}

export default PrismaTestEnvironment
