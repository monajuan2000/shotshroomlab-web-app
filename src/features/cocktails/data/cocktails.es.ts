import type { CocktailCatalogTranslation } from '../model/cocktailTranslation.ts'

/*
 * Spanish texts of the cocktail catalog. `cocktails.ts` is the source of
 * truth: keys are cocktail ids and English ingredient names, and every step
 * list must have the same length as the English one. The data integrity
 * tests enforce it.
 */
export const COCKTAILS_ES: CocktailCatalogTranslation = {
  terms: {
    'Agave syrup': 'Jarabe de agave',
    'Aromatic bitters': 'Amargo aromático',
    'Bitter aperitivo': 'Aperitivo amargo',
    'Blanco tequila': 'Tequila blanco',
    'Bourbon whiskey': 'Whiskey bourbon',
    Cognac: 'Coñac',
    'Coffee liqueur': 'Licor de café',
    Cola: 'Refresco de cola',
    'Demerara syrup': 'Jarabe de azúcar demerara',
    'Dry sparkling wine': 'Vino espumoso seco',
    'Dry vermouth': 'Vermut seco',
    'Egg white': 'Clara de huevo',
    'Flaky salt': 'Sal en escamas',
    'Fresh espresso': 'Espresso recién preparado',
    'Fresh lemon juice': 'Jugo de limón amarillo fresco',
    'Fresh lime juice': 'Jugo de limón fresco',
    'Ginger beer': 'Cerveza de jengibre',
    'Grapefruit soda': 'Soda de toronja',
    'Heavy cream': 'Crema de leche',
    'Lemon peel': 'Piel de limón amarillo',
    'London dry gin': 'Ginebra London dry',
    Mezcal: 'Mezcal',
    Mint: 'Hierbabuena',
    'Orange liqueur': 'Licor de naranja',
    'Orange peel': 'Piel de naranja',
    'Rye whiskey': 'Whiskey de centeno',
    Salt: 'Sal',
    'Simple syrup': 'Jarabe simple',
    'Soda water': 'Agua con gas',
    Sugar: 'Azúcar',
    'Sweet vermouth': 'Vermut dulce',
    Vodka: 'Vodka',
    'White rum': 'Ron blanco',
    // "To taste" notes
    'For the rim': 'Para el borde',
    'Top up': 'Hasta completar',
  },
  cocktails: {
    margarita: {
      tagline: 'Brillante, ácida y perfectamente equilibrada.',
      description:
        'Un pilar de la familia de los sours que combina el destilado de agave con limón fresco y licor de naranja. Sírvela sin hielo o con hielo, con o sin borde de sal.',
      steps: [
        'Enfría la copa. Si quieres borde de sal, pasa un gajo de limón por la mitad del borde y sumérgelo en sal.',
        'Agrega el tequila, el licor de naranja y el jugo de limón a una coctelera con hielo.',
        'Agita con fuerza de 10 a 12 segundos, hasta que la coctelera se sienta muy fría.',
        'Cuela dos veces sobre la copa fría.',
      ],
      garnish: 'Rueda de limón',
    },
    'old-fashioned': {
      tagline: 'Destilado, azúcar, amargo y nada más.',
      description:
        'El cóctel original: whiskey ligeramente endulzado y sazonado con amargo. La dilución lenta sobre un cubo de hielo grande lo mantiene suave hasta el último sorbo.',
      steps: [
        'Agrega el jarabe y el amargo a un vaso mezclador.',
        'Vierte el bourbon y llena el vaso mezclador con hielo.',
        'Mezcla de 20 a 30 segundos, hasta que esté frío y ligeramente diluido.',
        'Cuela sobre un cubo de hielo grande en un vaso corto.',
        'Exprime la piel de naranja sobre la bebida para liberar sus aceites y luego déjala caer dentro.',
      ],
      garnish: 'Piel de naranja',
    },
    negroni: {
      tagline: 'Partes iguales, profundidad infinita.',
      description:
        'Un clásico italiano de partes iguales de ginebra, vermut dulce y aperitivo amargo. Intenso, agridulce e ideal antes de la cena.',
      steps: [
        'Agrega todos los ingredientes a un vaso mezclador con hielo.',
        'Mezcla durante unos 20 segundos.',
        'Cuela en un vaso corto con hielo nuevo.',
      ],
      garnish: 'Rodaja de naranja',
    },
    mojito: {
      tagline: 'Hierbabuena, limón y una brisa fresca.',
      description:
        'Un trago largo cubano que equilibra el ron blanco con hierbabuena fresca, limón y un toque de azúcar, alargado con agua con gas.',
      steps: [
        'Presiona suavemente las hojas de hierbabuena con el jarabe y el jugo de limón en el vaso. No las rompas.',
        'Agrega el ron y llena el vaso con hielo picado.',
        'Revuelve con una cuchara de bar para integrar todo.',
        'Completa con agua con gas y corona con más hielo picado.',
      ],
      garnish: 'Ramita de hierbabuena',
    },
    daiquiri: {
      tagline: 'Tres ingredientes, equilibrio puro.',
      description:
        'El sour de ron clásico: fresco, ácido y sencillo. La prueba perfecta para cualquier bartender y cualquier ron.',
      steps: [
        'Agrega todos los ingredientes a una coctelera con hielo.',
        'Agita con fuerza de 10 a 12 segundos.',
        'Cuela dos veces sobre una copa coupé fría.',
      ],
      garnish: 'Rueda de limón',
    },
    'dry-martini': {
      tagline: 'Frío, cristalino y elegante.',
      description:
        'Ginebra suavizada con un susurro de vermut seco y mezclada hasta quedar helada. Sencillo en el papel y una verdadera prueba de técnica.',
      steps: [
        'Enfría la copa en el congelador o con agua helada.',
        'Mezcla la ginebra y el vermut con abundante hielo durante unos 30 segundos.',
        'Cuela sobre la copa fría.',
        'Exprime la piel de limón sobre la superficie y úsala como decoración.',
      ],
      garnish: 'Twist de limón amarillo o aceituna',
    },
    manhattan: {
      tagline: 'Intenso, especiado y sofisticado.',
      description:
        'Whiskey de centeno unido al vermut dulce y al amargo. Suave, cálido y atemporal.',
      steps: [
        'Agrega todos los ingredientes a un vaso mezclador con hielo.',
        'Mezcla de 20 a 30 segundos.',
        'Cuela sobre una copa coupé fría.',
      ],
      garnish: 'Cereza para cóctel',
    },
    'moscow-mule': {
      tagline: 'Jengibre picante con un toque cítrico.',
      description:
        'Un trago largo animado de vodka, limón y cerveza de jengibre, servido tradicionalmente en una taza de cobre helada.',
      steps: [
        'Llena la taza con hielo.',
        'Agrega el vodka y el jugo de limón.',
        'Completa con cerveza de jengibre y revuelve suavemente.',
      ],
      garnish: 'Gajo de limón',
    },
    'espresso-martini': {
      tagline: 'Café y vodka con una espuma aterciopelada.',
      description:
        'Un clásico moderno que combina espresso recién preparado, licor de café y vodka, agitados con fuerza para lograr una crema sedosa.',
      steps: [
        'Prepara el espresso y déjalo enfriar un minuto.',
        'Agrega todos los ingredientes a una coctelera con hielo.',
        'Agita con mucha fuerza durante 15 segundos para formar la espuma.',
        'Cuela dos veces sobre una copa fría.',
      ],
      garnish: 'Tres granos de café',
    },
    'whiskey-sour': {
      tagline: 'Sedoso, ácido y reconfortante.',
      description:
        'Bourbon equilibrado con limón amarillo y azúcar. La clara de huevo es opcional y le da a la bebida una espuma suave y cremosa.',
      steps: [
        'Agrega el bourbon, el jugo de limón, el jarabe y la clara de huevo a una coctelera sin hielo.',
        'Agita durante 10 segundos para batir la clara.',
        'Agrega hielo y vuelve a agitar hasta que esté bien frío.',
        'Cuela en un vaso corto con hielo nuevo.',
        'Añade unas gotas de amargo sobre la espuma.',
      ],
      garnish: 'Gotas de amargo aromático',
    },
    paloma: {
      tagline: 'Toronja, agave y una pizca de sal.',
      description:
        'Un trago largo favorito en México: tequila alargado con soda de toronja, un chorrito de limón y un poco de sal.',
      steps: [
        'Llena un vaso alto con hielo.',
        'Agrega el tequila, el jugo de limón y la sal.',
        'Completa con soda de toronja y revuelve suavemente.',
      ],
      garnish: 'Gajo de toronja',
    },
    'oaxaca-old-fashioned': {
      tagline: 'Un giro ahumado de agave sobre un clásico.',
      description:
        'El tequila y el mezcal comparten escenario en esta versión de agave del Old Fashioned, endulzada con jarabe de agave.',
      steps: [
        'Agrega todos los ingredientes a un vaso mezclador con hielo.',
        'Mezcla de 20 a 30 segundos.',
        'Cuela sobre un cubo de hielo grande en un vaso corto.',
        'Exprime una piel de naranja sobre la bebida y déjala caer dentro.',
      ],
      garnish: 'Piel de naranja',
    },
    sidecar: {
      tagline: 'Brandy, naranja y limón en armonía.',
      description:
        'Un sour refinado de la década de 1920 que combina coñac con licor de naranja y limón amarillo fresco.',
      steps: [
        'Si quieres borde de azúcar, humedece el borde de la copa y sumérgelo en azúcar.',
        'Agrega el coñac, el licor de naranja y el jugo de limón a una coctelera con hielo.',
        'Agita de 10 a 12 segundos.',
        'Cuela dos veces sobre la copa coupé fría.',
      ],
      garnish: 'Twist de naranja',
    },
    'cuba-libre': {
      tagline: 'Ron y cola, avivados con limón.',
      description:
        'Más que un ron con cola: el limón fresco convierte este sencillo trago largo en una bebida equilibrada y refrescante.',
      steps: [
        'Llena un vaso alto con hielo.',
        'Agrega el ron y el jugo de limón.',
        'Completa con refresco de cola y revuelve suavemente.',
      ],
      garnish: 'Gajo de limón',
    },
    'bitter-spritz': {
      tagline: 'Burbujas y naranja agridulce.',
      description:
        'Un aperitivo ligero y burbujeante de aperitivo amargo, vino espumoso y soda. Perfecto para las tardes largas.',
      steps: [
        'Llena una copa de vino con hielo.',
        'Vierte el vino espumoso y luego el aperitivo.',
        'Completa con agua con gas y revuelve una vez, con suavidad.',
      ],
      garnish: 'Rodaja de naranja',
    },
    'french-75': {
      tagline: 'Un sour de ginebra coronado con burbujas.',
      description:
        'Ginebra, limón amarillo y azúcar agitados y completados con vino espumoso. Festivo, fresco y peligrosamente fácil de beber.',
      steps: [
        'Agrega la ginebra, el jugo de limón y el jarabe a una coctelera con hielo.',
        'Agita durante 10 segundos.',
        'Cuela sobre una copa flauta fría.',
        'Completa lentamente con vino espumoso.',
      ],
      garnish: 'Twist de limón amarillo',
    },
    'white-russian': {
      name: 'Ruso Blanco',
      tagline: 'El confort cremoso del café.',
      description:
        'Vodka y licor de café suavizados con una capa de crema. Intenso, dulce e ideal para el postre.',
      steps: [
        'Llena un vaso corto con hielo.',
        'Agrega el vodka y el licor de café.',
        'Vierte la crema lentamente sobre el dorso de una cuchara para que flote encima.',
        'Revuelve antes de beber, si lo prefieres.',
      ],
    },
  },
}
