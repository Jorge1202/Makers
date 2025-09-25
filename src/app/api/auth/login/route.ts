import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
// ↑ Importar tu ORM (Prisma, Drizzle, etc.)

interface User{
    id: string;
    name: string;
    email: string;
    password: string;
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // 1. Validaciones
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña requeridos' },
        { status: 400 }
      );
    }

    // 2. Buscar usuario en BD (ejemplo con Prisma)
    // const user = await prisma.user.findUnique({
    //   where: { email: email.toLowerCase() },
    // });

    const user: User = {
        id: '1',
        name: 'Juan',
        email: 'juan@email.com',
        password: 'hashed_password'
    };

    if (!user) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // 3. Verificar contraseña (con bcrypt)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // 4. Crear sesión (ejemplo con JWT)
    const token = await createSessionToken(user.id);

    // 5. Setear cookie segura
    const cookieStore = await cookies();
    cookieStore.set('session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
    });

    // 6. Retornar éxito (sin info sensible)
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// Función auxiliar para crear JWT
async function createSessionToken(userId: string) {
  // Implementar con jsonwebtoken o similar
  return 'fake-token-' + userId;
}