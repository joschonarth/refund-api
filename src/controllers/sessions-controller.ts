import { Request, Response } from 'express'
import { AppError } from '@/utils/AppError'
import { authConfig } from '@/configs/auth'
import { prisma } from '@/database/prisma'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { z } from 'zod'

class SessionsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      email: z
        .string()
        .email({ message: 'Please provide a valid email address' }),
      password: z.string(),
    })

    const { email, password } = bodySchema.parse(request.body)

    const user = await prisma.user.findFirst({
      where: { email },
    })

    if (!user) {
      throw new AppError('E-mail ou senha inválidos', 401)
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError('E-mail ou senha inválidos', 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({ role: user.role }, secret, {
      subject: user.id,
      expiresIn,
    })

    const { password: _, ...userWithoutPassword } = user

    response.json({ token, user: userWithoutPassword })
  }
}

export { SessionsController }
