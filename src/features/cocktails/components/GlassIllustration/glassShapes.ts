import type { GlassType } from '../../model/cocktail.ts'

interface GlassShape {
  /** Filled with the drink color. */
  liquid: string
  /** Stroked glass outline, drawn on top of the liquid. */
  outline: string
}

// All shapes use a 64 × 64 view box.
const STEM_AND_FOOT = 'M32 36v20m-10 0h20'

export const GLASS_SHAPES: Readonly<Record<GlassType, GlassShape>> = {
  coupe: {
    liquid: 'M14.5 20h35c-1 9-8.5 13.5-17.5 13.5S15.5 29 14.5 20Z',
    outline: `M12 16h40c0 14-10 20-20 20S12 30 12 16Z ${STEM_AND_FOOT}`,
  },
  martini: {
    liquid: 'M15 16h34L32 33Z',
    outline: `M10 12h44L32 36Z ${STEM_AND_FOOT}`,
  },
  rocks: {
    liquid: 'M17.6 30h28.8l-1.2 21H18.8Z',
    outline: 'M16 18h32l-2 36H18Z',
  },
  highball: {
    liquid: 'M21 18h22l-1.7 37H22.7Z',
    outline: 'M20 8h24l-2 50H22Z',
  },
  'copper-mug': {
    liquid: 'M17.5 22h23L39 53H19Z',
    outline: 'M16 16h26l-2 40H18Zm26 8h6a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4h-7',
  },
  flute: {
    liquid: 'M25.8 14h12.4l-1.7 23.5c-.5 2-2 2.5-4.5 2.5s-4-.5-4.5-2.5Z',
    outline: 'M25 6h14l-2 32c-.5 3-2.5 4-5 4s-4.5-1-5-4Zm7 36v15m-8 0h16',
  },
  wine: {
    liquid: 'M18.6 18h26.8c-.4 9-3.9 15.5-13.4 16-9.5-.5-13-7-13.4-16Z',
    outline: `M18 8h28c1 14-2 26-14 28-12-2-15-14-14-28Z ${STEM_AND_FOOT}`,
  },
}
