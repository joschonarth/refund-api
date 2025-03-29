import { Request, Response } from 'express'
import { UserRole } from '@prisma/client'
import { prisma } from '@/database/prisma'
import { AppError } from '@/utils/AppError'
import { hash } from 'bcrypt'
import { z } from 'zod'

class UsersController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z
        .string()
        .trim()
        .min(2, { message: 'Name must be at least 2 characters' }),
      email: z
        .string()
        .trim()
        .email({ message: 'Please provide a valid email address' })
        .toLowerCase(),
      password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters' }),
      role: z
        .enum([UserRole.employee, UserRole.manager], {
          message: 'Role must be either employee or manager',
        })
        .default(UserRole.employee),
    })

    const { name, email, password, role } = bodySchema.parse(request.body)

    const userWithSameEmail = await prisma.user.findFirst({
      where: { email },
    })

    if (userWithSameEmail) {
      throw new AppError('User already exists')
    }

    const hashedPassword = await hash(password, 8)

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    })

    response.status(201).json()
  }
}

export { UsersController }
