import type { Liquor } from '../model/liquor.ts'

/*
 * Catalog of spirit styles. Ids are referenced by cocktail ingredients, so
 * never rename an id; add a new entry instead.
 */
export const LIQUORS: readonly Liquor[] = [
  {
    id: 'bourbon-whiskey',
    name: 'Bourbon Whiskey',
    category: 'whiskey',
    abv: 45,
    origin: 'United States',
    description:
      'An American whiskey made mostly from corn and aged in new charred oak barrels, which gives it a rich, sweet and rounded profile.',
    flavorNotes: ['Caramel', 'Vanilla', 'Toasted oak'],
    servingSuggestions: ['Neat', 'On a large ice cube', 'In stirred classics'],
    color: '#b8651b',
  },
  {
    id: 'rye-whiskey',
    name: 'Rye Whiskey',
    category: 'whiskey',
    abv: 45,
    origin: 'United States',
    description:
      'A whiskey with a high share of rye grain. It is drier and spicier than bourbon, which makes it a sharp partner for vermouth.',
    flavorNotes: ['Black pepper', 'Baking spice', 'Dried fruit'],
    servingSuggestions: ['Neat', 'With a splash of water', 'In a Manhattan'],
    color: '#a0521d',
  },
  {
    id: 'scotch-whisky',
    name: 'Blended Scotch Whisky',
    category: 'whiskey',
    abv: 40,
    origin: 'Scotland',
    description:
      'A blend of malt and grain whiskies aged at least three years in Scotland. Balanced and approachable, with a gentle hint of smoke.',
    flavorNotes: ['Honey', 'Malt', 'Light smoke'],
    servingSuggestions: ['Neat', 'With soda water', 'On the rocks'],
    color: '#c98a2b',
  },
  {
    id: 'vodka',
    name: 'Vodka',
    category: 'vodka',
    abv: 40,
    origin: 'Eastern Europe',
    description:
      'A clean spirit distilled from grain or potatoes and filtered to be as neutral as possible, so it lets other ingredients shine.',
    flavorNotes: ['Clean', 'Subtle grain', 'Crisp finish'],
    servingSuggestions: ['Ice cold, neat', 'With tonic', 'In highballs'],
    color: '#dfe7ea',
  },
  {
    id: 'london-dry-gin',
    name: 'London Dry Gin',
    category: 'gin',
    abv: 43,
    origin: 'England',
    description:
      'A juniper forward gin whose botanicals are all added during distillation, with nothing added afterwards but water.',
    flavorNotes: ['Juniper', 'Citrus peel', 'Coriander'],
    servingSuggestions: ['With tonic', 'In a Martini', 'In a Negroni'],
    color: '#cfe3dc',
  },
  {
    id: 'white-rum',
    name: 'White Rum',
    category: 'rum',
    abv: 40,
    origin: 'Caribbean',
    description:
      'A light, lightly aged rum filtered to remove color. Fresh and grassy, it is the backbone of many tropical classics.',
    flavorNotes: ['Sugarcane', 'Light vanilla', 'Tropical fruit'],
    servingSuggestions: ['With cola and lime', 'In a Daiquiri', 'In a Mojito'],
    color: '#efe9d8',
  },
  {
    id: 'dark-rum',
    name: 'Dark Rum',
    category: 'rum',
    abv: 40,
    origin: 'Caribbean',
    description:
      'A rum aged longer in charred barrels, often made from molasses. Deep, sweet and warming.',
    flavorNotes: ['Molasses', 'Brown sugar', 'Baking spice'],
    servingSuggestions: ['Neat', 'With ginger beer', 'In tiki drinks'],
    color: '#5c2e12',
  },
  {
    id: 'blanco-tequila',
    name: 'Blanco Tequila',
    category: 'tequila',
    abv: 40,
    origin: 'Mexico',
    description:
      'An unaged tequila made from blue agave. It shows the bright, vegetal character of the plant.',
    flavorNotes: ['Cooked agave', 'Citrus', 'White pepper'],
    servingSuggestions: ['Neat, with lime on the side', 'In a Margarita', 'In a Paloma'],
    color: '#e8e4c9',
  },
  {
    id: 'mezcal',
    name: 'Mezcal',
    category: 'mezcal',
    abv: 45,
    origin: 'Mexico',
    description:
      'An agave spirit whose hearts are roasted in earthen pits, giving it its signature smoky, earthy character.',
    flavorNotes: ['Smoke', 'Roasted agave', 'Earth'],
    servingSuggestions: ['Sipped neat with orange slices', 'In smoky twists on classics'],
    color: '#d9cfa6',
  },
  {
    id: 'cognac',
    name: 'Cognac',
    category: 'brandy',
    abv: 40,
    origin: 'France',
    description:
      'A grape brandy from the Cognac region, double distilled in copper stills and aged in French oak.',
    flavorNotes: ['Dried apricot', 'Oak', 'Floral'],
    servingSuggestions: ['Neat in a snifter', 'In a Sidecar'],
    color: '#a4501a',
  },
  {
    id: 'orange-liqueur',
    name: 'Orange Liqueur',
    category: 'liqueur',
    abv: 35,
    origin: 'France',
    description:
      'A clear liqueur flavored with sweet and bitter orange peels. It adds sweetness and citrus depth to sours.',
    flavorNotes: ['Orange peel', 'Sweet citrus', 'Light bitterness'],
    servingSuggestions: ['In a Margarita', 'In a Sidecar'],
    color: '#f0b44a',
  },
  {
    id: 'coffee-liqueur',
    name: 'Coffee Liqueur',
    category: 'liqueur',
    abv: 20,
    origin: 'Mexico',
    description:
      'A sweet liqueur made with roasted coffee beans, sugar and a rum or neutral spirit base.',
    flavorNotes: ['Roasted coffee', 'Cocoa', 'Vanilla'],
    servingSuggestions: ['Over ice with cream', 'In an Espresso Martini'],
    color: '#2e1a10',
  },
  {
    id: 'bitter-aperitivo',
    name: 'Bitter Aperitivo',
    category: 'aperitif',
    abv: 25,
    origin: 'Italy',
    description:
      'A vivid red Italian bitter made from herbs, roots and citrus peels, traditionally enjoyed before a meal.',
    flavorNotes: ['Bitter orange', 'Rhubarb', 'Herbal'],
    servingSuggestions: ['With soda water', 'In a Spritz', 'In a Negroni'],
    color: '#c81d25',
  },
  {
    id: 'sweet-vermouth',
    name: 'Sweet Vermouth',
    category: 'fortified-wine',
    abv: 16,
    origin: 'Italy',
    description:
      'A red fortified wine infused with botanicals. Rich and gently bitter, it softens whiskey and gin in stirred drinks. Keep it refrigerated once opened.',
    flavorNotes: ['Dark fruit', 'Vanilla', 'Wormwood'],
    servingSuggestions: ['On the rocks with an orange slice', 'In a Manhattan'],
    color: '#6e1d1a',
  },
  {
    id: 'dry-vermouth',
    name: 'Dry Vermouth',
    category: 'fortified-wine',
    abv: 18,
    origin: 'France',
    description:
      'A pale, crisp fortified wine with delicate herbal notes. Essential for a Martini. Keep it refrigerated once opened.',
    flavorNotes: ['Herbal', 'Citrus', 'Floral'],
    servingSuggestions: ['With tonic', 'In a Martini'],
    color: '#e6e0b8',
  },
  {
    id: 'aromatic-bitters',
    name: 'Aromatic Bitters',
    category: 'bitters',
    abv: 44,
    origin: 'Caribbean',
    description:
      'A concentrated infusion of spices and bark used by the dash to season and balance cocktails, much like salt in cooking.',
    flavorNotes: ['Clove', 'Cinnamon', 'Gentian'],
    servingSuggestions: ['A few dashes in stirred drinks', 'On top of sours'],
    color: '#5a1a12',
  },
]
