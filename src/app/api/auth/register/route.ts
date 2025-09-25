import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { registerSchema } from '@/lib/validations/auth';
import { validateFormData } from '@/lib/validations/utils';

async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      }
    );

    const data = await response.json();
    return data.success && data.score >= 0.5; // Score mínimo de 0.5
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}
export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    
    // ✅ Validar con Zod en el backend también
    const validation = validateFormData(registerSchema.omit({ 
      confirmPassword: true, 
      acceptTerms: true 
    }), json);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: validation.errors },
        { status: 400 }
      );
    }

    const { name, email, password, recaptchaToken } = json;

    // ✅ Validar reCAPTCHA
    if (process.env.NODE_ENV === 'production') {
      const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
      if (!isRecaptchaValid) {
        return NextResponse.json(
          { error: 'Verificación de seguridad fallida' },
          { status: 400 }
        );
      }
    }

    // Verificar si el usuario ya existe
    const userExists = false; // Reemplazar con consulta a BD
    if (userExists) {
      return NextResponse.json(
        { error: 'El usuario ya existe' },
        { status: 409 }
      );
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 12);

    // Crear usuario (simulado)
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      createdAt: new Date(),
    };

    return NextResponse.json(
      { 
        success: true, 
        message: 'Usuario registrado exitosamente',
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}