import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Aquí implementarías la lógica para marcar el onboarding como completado
    // en tu base de datos
    
    return NextResponse.json({ 
      success: true,
      message: 'Onboarding completed successfully' 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}