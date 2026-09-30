import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  findRoute,
  isPathActive,
  matchPath,
  normalizePathname,
  parseHashLocation,
  toHref,
} from '../../src/shared/router/location.ts'

describe('parseHashLocation', () => {
  it('treats an empty hash as the home page', () => {
    assert.deepEqual(parseHashLocation(''), { pathname: '/', search: '' })
    assert.deepEqual(parseHashLocation('#'), { pathname: '/', search: '' })
  })

  it('splits the path and the query string', () => {
    assert.deepEqual(parseHashLocation('#/cocktails?base=gin'), {
      pathname: '/cocktails',
      search: '?base=gin',
    })
  })

  it('keeps question marks that belong to the query', () => {
    assert.equal(parseHashLocation('#/a?q=why?').search, '?q=why?')
  })

  it('drops an empty query string', () => {
    assert.equal(parseHashLocation('#/cocktails?').search, '')
  })
})

describe('normalizePathname', () => {
  it('adds a leading slash and removes trailing and repeated slashes', () => {
    assert.equal(normalizePathname('cocktails/'), '/cocktails')
    assert.equal(normalizePathname('//cocktails//negroni'), '/cocktails/negroni')
    assert.equal(normalizePathname('/'), '/')
  })
})

describe('toHref', () => {
  it('builds a hash link', () => {
    assert.equal(toHref('/liquors/mezcal'), '#/liquors/mezcal')
    assert.equal(toHref('/cocktails?base=rum'), '#/cocktails?base=rum')
  })
})

describe('matchPath', () => {
  it('matches static paths', () => {
    assert.deepEqual(matchPath('/cocktails', '/cocktails'), {})
    assert.equal(matchPath('/cocktails', '/liquors'), null)
  })

  it('extracts and decodes parameters', () => {
    assert.deepEqual(matchPath('/cocktails/:cocktailId', '/cocktails/french%2075'), {
      cocktailId: 'french 75',
    })
  })

  it('does not match a different number of segments', () => {
    assert.equal(matchPath('/cocktails/:cocktailId', '/cocktails'), null)
    assert.equal(matchPath('/cocktails', '/cocktails/negroni'), null)
  })

  it('rejects malformed encodings instead of throwing', () => {
    assert.equal(matchPath('/cocktails/:cocktailId', '/cocktails/%E0%A4%A'), null)
  })

  it('matches anything with the wildcard', () => {
    assert.deepEqual(matchPath('*', '/any/path'), {})
  })
})

describe('findRoute', () => {
  const routes = [
    { path: '/', name: 'home' },
    { path: '/cocktails/:cocktailId', name: 'cocktail' },
    { path: '*', name: 'not-found' },
  ]

  it('returns the first matching route', () => {
    assert.equal(findRoute(routes, '/')?.route.name, 'home')
    assert.equal(findRoute(routes, '/cocktails/negroni')?.route.name, 'cocktail')
    assert.equal(findRoute(routes, '/missing')?.route.name, 'not-found')
  })
})

describe('isPathActive', () => {
  it('marks nested paths as active unless the match must be exact', () => {
    assert.equal(isPathActive('/cocktails/negroni', '/cocktails', false), true)
    assert.equal(isPathActive('/cocktails/negroni', '/cocktails', true), false)
    assert.equal(isPathActive('/cocktailsx', '/cocktails', false), false)
  })

  it('only marks the home link on the home page', () => {
    assert.equal(isPathActive('/cocktails', '/', false), false)
    assert.equal(isPathActive('/', '/', false), true)
  })
})
