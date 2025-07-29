import { NextRequest, NextResponse } from 'next/server'
import { body, validationResult, ValidationChain } from 'express-validator'

export const validateEmail = body('email')
  .isEmail()
  .normalizeEmail()
  .withMessage('Please provide a valid email address')

export const validatePassword = body('password')
  .isLength({ min: 8 })
  .withMessage('Password must be at least 8 characters long')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
  .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')

export const validateName = body('name')
  .trim()
  .isLength({ min: 2, max: 100 })
  .withMessage('Name must be between 2 and 100 characters')

export const validateCourseTitle = body('title')
  .trim()
  .isLength({ min: 5, max: 200 })
  .withMessage('Course title must be between 5 and 200 characters')

export const validateCourseDescription = body('description')
  .trim()
  .isLength({ min: 20, max: 2000 })
  .withMessage('Course description must be between 20 and 2000 characters')

export function validate(validations: ValidationChain[]) {
  return async (request: NextRequest) => {
    // Convert NextRequest to Express-like request for validation
    const body = await request.json().catch(() => ({}))
    const req = { body } as any

    // Run validations
    await Promise.all(validations.map(validation => validation.run(req)))

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: errors.array()
        },
        { status: 400 }
      )
    }

    return null // No validation errors
  }
}

export function sanitizeInput(input: any): any {
  if (typeof input === 'string') {
    return input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  }
  
  if (Array.isArray(input)) {
    return input.map(sanitizeInput)
  }
  
  if (typeof input === 'object' && input !== null) {
    const sanitized: any = {}
    for (const [key, value] of Object.entries(input)) {
      sanitized[key] = sanitizeInput(value)
    }
    return sanitized
  }
  
  return input
}