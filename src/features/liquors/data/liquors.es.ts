import type { LiquorCatalogTranslation } from '../model/liquor.ts'

/*
 * Spanish texts of the liquor catalog, keyed by liquor id. `liquors.ts` is the
 * source of truth; the data integrity tests check that every liquor is
 * translated and that its lists keep the same length.
 */
export const LIQUORS_ES: LiquorCatalogTranslation = {
  'bourbon-whiskey': {
    name: 'Whiskey Bourbon',
    origin: 'Estados Unidos',
    description:
      'Un whiskey estadounidense elaborado principalmente con maíz y añejado en barricas nuevas de roble tostado, lo que le da un perfil rico, dulce y redondo.',
    flavorNotes: ['Caramelo', 'Vainilla', 'Roble tostado'],
    servingSuggestions: ['Solo', 'Sobre un cubo de hielo grande', 'En clásicos mezclados'],
  },
  'rye-whiskey': {
    name: 'Whiskey de Centeno',
    origin: 'Estados Unidos',
    description:
      'Un whiskey con una alta proporción de centeno. Es más seco y especiado que el bourbon, lo que lo convierte en un gran compañero del vermut.',
    flavorNotes: ['Pimienta negra', 'Especias de repostería', 'Frutos secos'],
    servingSuggestions: ['Solo', 'Con un chorrito de agua', 'En un Manhattan'],
  },
  'scotch-whisky': {
    name: 'Whisky Escocés de Mezcla',
    origin: 'Escocia',
    description:
      'Una mezcla de whiskies de malta y de grano añejados al menos tres años en Escocia. Equilibrado y accesible, con un suave toque de humo.',
    flavorNotes: ['Miel', 'Malta', 'Humo ligero'],
    servingSuggestions: ['Solo', 'Con agua con gas', 'Con hielo'],
  },
  vodka: {
    origin: 'Europa del Este',
    description:
      'Un destilado limpio elaborado con granos o papas y filtrado para ser lo más neutro posible, de modo que deja brillar a los demás ingredientes.',
    flavorNotes: ['Limpio', 'Grano sutil', 'Final fresco'],
    servingSuggestions: ['Helado, solo', 'Con agua tónica', 'En tragos largos'],
  },
  'london-dry-gin': {
    name: 'Ginebra London Dry',
    origin: 'Inglaterra',
    description:
      'Una ginebra con protagonismo del enebro, cuyos botánicos se añaden durante la destilación, sin agregar después nada más que agua.',
    flavorNotes: ['Enebro', 'Piel de cítricos', 'Cilantro'],
    servingSuggestions: ['Con agua tónica', 'En un Martini', 'En un Negroni'],
  },
  'white-rum': {
    name: 'Ron Blanco',
    origin: 'Caribe',
    description:
      'Un ron ligero, poco añejado y filtrado para quitarle el color. Fresco y herbáceo, es la base de muchos clásicos tropicales.',
    flavorNotes: ['Caña de azúcar', 'Vainilla ligera', 'Frutas tropicales'],
    servingSuggestions: ['Con cola y limón', 'En un Daiquiri', 'En un Mojito'],
  },
  'dark-rum': {
    name: 'Ron Oscuro',
    origin: 'Caribe',
    description:
      'Un ron añejado por más tiempo en barricas tostadas, a menudo elaborado con melaza. Profundo, dulce y reconfortante.',
    flavorNotes: ['Melaza', 'Azúcar morena', 'Especias de repostería'],
    servingSuggestions: ['Solo', 'Con cerveza de jengibre', 'En cócteles tiki'],
  },
  'blanco-tequila': {
    name: 'Tequila Blanco',
    origin: 'México',
    description:
      'Un tequila sin añejar elaborado con agave azul. Muestra el carácter brillante y vegetal de la planta.',
    flavorNotes: ['Agave cocido', 'Cítricos', 'Pimienta blanca'],
    servingSuggestions: ['Solo, con limón al lado', 'En una Margarita', 'En una Paloma'],
  },
  mezcal: {
    origin: 'México',
    description:
      'Un destilado de agave cuyas piñas se asan en hornos de tierra, lo que le da su característico sabor ahumado y terroso.',
    flavorNotes: ['Humo', 'Agave asado', 'Tierra'],
    servingSuggestions: ['Solo, con rodajas de naranja', 'En versiones ahumadas de los clásicos'],
  },
  cognac: {
    name: 'Coñac',
    origin: 'Francia',
    description:
      'Un brandy de uva de la región de Cognac, destilado dos veces en alambiques de cobre y añejado en roble francés.',
    flavorNotes: ['Albaricoque seco', 'Roble', 'Floral'],
    servingSuggestions: ['Solo, en copa balón', 'En un Sidecar'],
  },
  'orange-liqueur': {
    name: 'Licor de Naranja',
    origin: 'Francia',
    description:
      'Un licor transparente aromatizado con cáscaras de naranja dulce y amarga. Aporta dulzor y profundidad cítrica a los sours.',
    flavorNotes: ['Piel de naranja', 'Cítrico dulce', 'Amargor ligero'],
    servingSuggestions: ['En una Margarita', 'En un Sidecar'],
  },
  'coffee-liqueur': {
    name: 'Licor de Café',
    origin: 'México',
    description:
      'Un licor dulce elaborado con granos de café tostado, azúcar y una base de ron o de alcohol neutro.',
    flavorNotes: ['Café tostado', 'Cacao', 'Vainilla'],
    servingSuggestions: ['Con hielo y crema', 'En un Espresso Martini'],
  },
  'bitter-aperitivo': {
    name: 'Aperitivo Amargo',
    origin: 'Italia',
    description:
      'Un amargo italiano de un rojo intenso elaborado con hierbas, raíces y cáscaras de cítricos, que tradicionalmente se toma antes de comer.',
    flavorNotes: ['Naranja amarga', 'Ruibarbo', 'Herbal'],
    servingSuggestions: ['Con agua con gas', 'En un Spritz', 'En un Negroni'],
  },
  'sweet-vermouth': {
    name: 'Vermut Dulce',
    origin: 'Italia',
    description:
      'Un vino fortificado tinto infusionado con botánicos. Intenso y suavemente amargo, suaviza el whiskey y la ginebra en los tragos mezclados. Guárdalo en la nevera una vez abierto.',
    flavorNotes: ['Frutos oscuros', 'Vainilla', 'Ajenjo'],
    servingSuggestions: ['Con hielo y una rodaja de naranja', 'En un Manhattan'],
  },
  'dry-vermouth': {
    name: 'Vermut Seco',
    origin: 'Francia',
    description:
      'Un vino fortificado pálido y fresco con delicadas notas herbales. Imprescindible para un Martini. Guárdalo en la nevera una vez abierto.',
    flavorNotes: ['Herbal', 'Cítricos', 'Floral'],
    servingSuggestions: ['Con agua tónica', 'En un Martini'],
  },
  'aromatic-bitters': {
    name: 'Amargo Aromático',
    origin: 'Caribe',
    description:
      'Una infusión concentrada de especias y cortezas que se usa por golpes para sazonar y equilibrar los cócteles, como la sal en la cocina.',
    flavorNotes: ['Clavo', 'Canela', 'Genciana'],
    servingSuggestions: ['Unos golpes en tragos mezclados', 'Sobre los sours'],
  },
}
