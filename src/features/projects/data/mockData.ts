import { Project, User } from '@/features/projects/types/project';

export const mockUser: User = {
    id: '1',
    name: 'María González',
    username: 'maria_carpintera',
    avatar: 'https://i.pravatar.cc/150?img=1',
    bio: 'Carpintera apasionada por el diseño escandinavo y técnicas tradicionales',
    joinDate: '2023-01-15',
    projectCount: 12
};

export const mockProjects: Project[] = [
    {
        id: '1',
        title: 'Mesa de centro moderna con resina epoxi y madera de roble',
        description: 'Mesa de centro con combinación de madera de roble natural y resina epoxi azul translúcida',
        fullDescription: `Este proyecto combina la calidez de la madera maciza con la modernidad de la resina epoxi. La mesa fue diseñada para ser el punto focal de una sala de estar contemporánea, creando un contraste entre lo orgánico y lo industrial.

Características principales:
- Base de roble macizo con patas en ángulo
- Superficie de resina epoxi con efecto oceánico
- Acabado con aceite natural para realzar la veta
- Estructura estable con refuerzos ocultos`,

        objectives: [
            'Crear una pieza única que combine madera y resina',
            'Aprender técnicas de moldeado con epoxi',
            'Desarrollar habilidades de acabado profesional'
        ],
        expectedResult: 'Mesa de centro funcional y estética para sala de estar',
        inspiration: [
            'Diseños escandinavos modernos',
            'Técnicas japonesas de carpintería',
            'Arte con resina de ocean pour'
        ],

        status: 'completed',
        difficulty: 'intermediate',
        category: 'Carpintería',
        tags: ['resina', 'roble', 'muebles', 'epoxi', 'diseño-moderno'],

        // PLANIFICACIÓN
        planning: {
            timeline: [
                {
                    phase: 'Diseño y planificación',
                    startDate: '2024-03-01',
                    endDate: '2024-03-07',
                    description: 'Diseño de la mesa, cálculos estructurales y lista de materiales'
                },
                {
                    phase: 'Preparación de la madera',
                    startDate: '2024-03-08',
                    endDate: '2024-03-10',
                    description: 'Corte, cepillado y preparación de la base de roble'
                },
                {
                    phase: 'Molde y resina',
                    startDate: '2024-03-11',
                    endDate: '2024-03-15',
                    description: 'Creación del molde y vertido de la resina epoxi'
                },
                {
                    phase: 'Acabado y montaje',
                    startDate: '2024-03-16',
                    endDate: '2024-03-20',
                    description: 'Lijado, aceitado y montaje final'
                }
            ],
            budget: {
                estimated: 250,
                actual: 280,
                breakdown: [
                    { category: 'Madera', amount: 120 },
                    { category: 'Resina y productos', amount: 95 },
                    { category: 'Herramientas', amount: 45 },
                    { category: 'Varios', amount: 20 }
                ]
            },
            materials: [
                { name: 'Madera de roble', quantity: '1 tabla 200x60x5cm', cost: 120 },
                { name: 'Resina epoxi transparente', quantity: '4 litros', cost: 80 },
                { name: 'Pigmento azul marino', quantity: '50ml', cost: 15 },
                { name: 'Aceite de linaza', quantity: '1 litro', cost: 25 },
                { name: 'Tornillos invisibles', quantity: '16 unidades', cost: 12 },
                { name: 'Lija variedad grits', quantity: '10 unidades', cost: 18 },
                { name: 'Sellador silicona', quantity: '2 tubos', cost: 10 }
            ],
            tools: [
                { name: 'Sierra circular', quantity: '1', notes: 'Para cortes rectos' },
                { name: 'Router', quantity: '1', notes: 'Para perfiles y rebajes' },
                { name: 'Lijadora orbital', quantity: '1' },
                { name: 'Taladro inalámbrico', quantity: '1' },
                { name: 'Pistola de calor', quantity: '1', notes: 'Para eliminar burbujas' },
                { name: 'Nivel láser', quantity: '1' },
                { name: 'Sargento', quantity: '4', notes: 'Para sujeción' }
            ],
            workspace: 'Taller de 4x4 metros con buena ventilación para resina'
        },

        // PASOS DEL PROCESO
        steps: [
            {
                id: 'step-1',
                order: 1,
                title: 'Diseño y planos detallados',
                status: 'completed',

                instructions: {
                    description: 'Creación de planos técnicos detallados y cálculos estructurales para garantizar la estabilidad y proporciones correctas de la mesa.',
                    estimatedTime: 180,
                    media: [
                        {
                            type: 'image',
                            url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800',
                            caption: 'Plano técnico con medidas'
                        },
                        {
                            type: 'image',
                            url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800',
                            caption: 'Render 3D del diseño final'
                        }
                    ],
                    substeps: [
                        'Investigar referencias de diseño',
                        'Definir dimensiones finales (120x60x45cm)',
                        'Calcular volumen de resina necesario',
                        'Diseñar sistema de uniones estructurales',
                        'Crear lista de materiales detallada'
                    ]
                },

                resources: {
                    tools: [
                        { name: 'Software CAD', notes: 'Fusion 360 o similar' },
                        { name: 'Calculadora' },
                        { name: 'Papel y lápiz', notes: 'Para bocetos iniciales' }
                    ],
                    materials: [],
                    safety: {
                        level: 'low',
                        equipment: [],
                        warnings: ['Trabajar en un espacio bien iluminado para evitar errores de diseño']
                    },
                    workspace: ['Escritorio con computadora', 'Espacio para dibujar']
                },

                finishes: {
                    techniques: ['Renderizado 3D', 'Presentación visual'],
                    products: ['Software de diseño'],
                    application: 'Digital',
                    tips: ['Guardar versiones del diseño', 'Imprimir planos a escala para revisión']
                },

                quality: {
                    checkpoints: [
                        { description: 'Todas las medidas son coherentes', verified: true },
                        { description: 'Calculado volumen de resina correcto', verified: true },
                        { description: 'Consideradas tolerancias de fabricación', verified: true }
                    ],
                    tests: ['Revisión cruzada con otro maker', 'Simulación de cargas si es posible'],
                    measurements: [
                        { part: 'Superficie', dimension: '120x60cm', tolerance: '±2mm' },
                        { part: 'Altura', dimension: '45cm', tolerance: '±1mm' }
                    ],
                    tolerance: '±2mm en dimensiones críticas'
                },

                lessons: {
                    whatWorked: ['Usar software 3D ahorra tiempo en ajustes', 'Planificar desde el inicio evita problemas'],
                    improvements: ['Incluir más vistas de detalle', 'Documentar decisiones de diseño'],
                    tips: ['Dedicar al menos 2-3 horas al diseño', 'Consultar con otros antes de finalizar'],
                    mistakes: ['No considerar el peso de la resina en diseño inicial']
                },

                technical: {
                    skills: ['Diseño 3D', 'Cálculo estructural', 'Planificación de proyectos'],
                    techniques: ['Modelado 3D', 'Renderizado', 'Documentación técnica'],
                    difficulty: 'medium',
                    critical: true
                }
            },

            {
                id: 'step-2',
                order: 2,
                title: 'Corte y preparación de la madera',
                status: 'completed',

                instructions: {
                    description: 'En este paso cortaremos todas las piezas de madera de roble según las medidas especificadas en los planos. La precisión en el corte es fundamental para garantizar un ensamblaje perfecto posterior.',
                    estimatedTime: 240,
                    media: [
                        {
                            type: 'image',
                            url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
                            caption: 'Configuración de la sierra circular con guía para cortes rectos perfectos'
                        },
                        {
                            type: 'video',
                            url: 'https://example.com/video-corte-precision.mp4',
                            thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
                            duration: 180,
                            caption: 'Técnica de corte seguro y preciso con sierra circular'
                        },
                        {
                            type: 'image',
                            url: 'https://images.unsplash.com/photo-1600353066296-88d45e13b2d7?w=800',
                            caption: 'Piezas cortadas y organizadas listas para el siguiente paso'
                        }
                    ],
                    substeps: [
                        `PREPARACIÓN INICIAL: Comienza organizando tu espacio de trabajo. Asegúrate de tener buena iluminación y suficiente espacio para maniobrar las piezas de madera. Coloca la tabla de roble sobre caballetes estables y verifica que esté nivelada.\n\nLimpia la superficie de la madera para eliminar cualquier residuo que pueda interferir con las marcas de medición.`,

                        `MARCADO PRECISO: Usando una regla metálica y un lápiz de carpintero afilado, transfiere todas las medidas del plano a la madera. Marca claramente las líneas de corte, incluyendo las líneas de despiece para la base (120x60cm), las cuatro patas (40cm de largo con ángulo de 12°) y los refuerzos internos.\n\nIMPORTANTE: Marca también la cara que quedará visible para evitar confusiones durante el ensamblaje.`,

                        `CONFIGURACIÓN DE HERRAMIENTAS: Configura la sierra circular con una hoja de carburo de 60 dientes para cortes limpios. Ajusta la profundidad de corte para que sea 2-3mm mayor que el espesor de la madera. Instala una guía recta paralela para garantizar cortes perfectamente rectos.\n\nVerifica que la hoja esté bien afilada y que todas las protecciones de seguridad estén en su lugar.`,

                        `CORTE DE PIEZAS PRINCIPALES: Comienza cortando la pieza más grande primero (la base de 120x60cm). Sujeta firmemente la madera contra la guía y realiza el corte con movimiento constante y uniforme. No forces la sierra - deja que la herramienta haga el trabajo.\n\nDespués de cada corte, verifica que el borde quede limpio y recto usando una escuadra de carpintero.`,

                        `CORTES ANGULARES PARA PATAS: Para las patas con ángulo de 12°, configura la sierra circular en el ángulo correspondiente. Realiza cortes de prueba en un trozo de desecho para verificar el ángulo antes de cortar las piezas finales.\n\nMarca claramente cada pata (Pata A, Pata B, etc.) para facilitar el ensamblaje posterior.`,

                        `VERIFICACIÓN FINAL: Una vez cortadas todas las piezas, colócalas en el suelo según el diseño del plano. Verifica que todas encajen correctamente y que las medidas coincidan con lo planeado.\n\nLija ligeramente los bordes para eliminar astillas pequeñas, pero mantén la precisión dimensional de los cortes.`
                    ]
                },

                resources: {
                    tools: [
                        { name: 'Sierra circular', notes: 'Con guía para cortes rectos' },
                        { name: 'Sierra de calar', notes: 'Para cortes curvos' },
                        { name: 'Escuadra de carpintero' },
                        { name: 'Cinta métrica' },
                        { name: 'Lápiz de carpintero' }
                    ],
                    materials: [
                        { name: 'Madera de roble', quantity: '1 tabla 200x60x5cm' }
                    ],
                    safety: {
                        level: 'high',
                        equipment: ['Gafas de seguridad', 'Audífonos', 'Mascarilla antipolvo'],
                        warnings: [
                            'Siempre usar protección ocular',
                            'Mantener manos lejos de la hoja de corte',
                            'Asegurar la pieza antes de cortar'
                        ]
                    },
                    workspace: ['Mesa de trabajo estable', 'Espacio para maniobrar piezas largas']
                },

                quality: {
                    checkpoints: [
                        { description: 'Cortes rectos y precisos', verified: true },
                        { description: 'Ángulos correctos en patas', verified: true },
                        { description: 'Sin astillas en los bordes', verified: true }
                    ],
                    tests: ['Verificar encaje de piezas', 'Comprobar medidas con calibre'],
                    measurements: [
                        { part: 'Base superior', dimension: '120x60cm', actual: '119.8x59.9cm' },
                        { part: 'Largo de patas', dimension: '40cm', actual: '39.9cm' },
                        { part: 'Ángulo patas', dimension: '12°', actual: '12.1°' }
                    ],
                    tolerance: '±1mm en cortes rectos, ±0.5° en ángulos'
                },

                lessons: {
                    whatWorked: ['Usar guía para cortes rectos', 'Marcar claramente antes de cortar'],
                    improvements: ['Invertir en hoja de mejor calidad', 'Mejor sujeción de piezas'],
                    tips: ['Cortar 1mm más grande y luego ajustar', 'Verificar hoja de sierra antes de empezar'],
                    mistakes: ['No verificar el ángulo de la hoja al inicio']
                },

                technical: {
                    skills: ['Corte preciso', 'Manejo de herramientas eléctricas', 'Medición exacta'],
                    techniques: ['Corte con guía', 'Trazado de piezas', 'Verificación dimensional'],
                    difficulty: 'medium',
                    critical: true
                }
            }
            // ... más pasos se pueden agregar aquí
        ],

        // RESULTADO FINAL
        finalResult: {
            gallery: [
                'https://images.unsplash.com/photo-1503602642458-232111445657?w=800',
                'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800'
            ],
            metrics: [
                { name: 'Tiempo total', expected: '20 horas', actual: '22.5 horas' },
                { name: 'Costo final', expected: '$250', actual: '$280' },
                { name: 'Peso final', expected: '12-14kg', actual: '13.2kg' }
            ],
            costComparison: {
                estimated: 250,
                actual: 280
            }
        },

        // REFLEXIONES FINALES
        reflections: {
            whatWorked: [
                'La combinación madera-resina da un resultado espectacular',
                'El sistema de uniones invisible funciona muy bien',
                'El acabado con aceite realza la veta natural'
            ],
            improvements: [
                'Usar moldes profesionales para la resina',
                'Mejorar el sistema de medición de resina',
                'Incluir más tiempo para el curado'
            ],
            advice: [
                'Practicar con resina en proyectos pequeños primero',
                'Invertir en pigmentos de buena calidad',
                'Trabajar en un ambiente con temperatura controlada'
            ]
        },

        // ESTADÍSTICAS
        likes: 145,
        views: 2347,
        saves: 89,
        completionCount: 5,

        // METADATOS
        createdAt: '2024-03-01',
        updatedAt: '2024-03-20',
        publishedAt: '2024-03-21',

        // USUARIO
        user: mockUser,

        collaborators: [
            {
                user: {
                    id: '2',
                    name: 'Juan Pérez',
                    username: 'juan_disenador',
                    avatar: 'https://i.pravatar.cc/150?img=3',
                    bio: 'Diseñador 3D especializado en muebles',
                    joinDate: '2023-03-10',
                    projectCount: 8
                },
                role: 'Diseño 3D y renders'
            }
        ]
    }
];