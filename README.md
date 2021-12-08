[![mattie-strapi-bundle](./docs/static/logo.svg)](https://mattie-bundle.mattiebelt.com/)

# mattie-strapi-bundle

[![Tests](https://github.com/MattieBelt/mattie-strapi-bundle/actions/workflows/tests.yml/badge.svg)](https://github.com/MattieBelt/mattie-strapi-bundle/actions)
[![Codecov](https://img.shields.io/codecov/c/github/MattieBelt/mattie-strapi-bundle.svg?style=flat-square)](https://codecov.io/gh/MattieBelt/mattie-strapi-bundle)
[![Strapi](https://img.shields.io/npm/dependency-version/@mattie-bundle/mattie-strapi-bundle-example/@strapi/strapi)](https://github.com/strapi/strapi)
[![License](https://img.shields.io/github/license/MattieBelt/mattie-strapi-bundle.svg?style=flat-square)](./LICENSE)

This bundle brings extra easy-to-use features to the Strapi eco-system.

## Included packages ✨
- [Search Plugin](https://mattie-bundle.mattiebelt.com/search/plugin)
- [Algolia Search Provider](https://mattie-bundle.mattiebelt.com/search/providers#algolia)

## Documentation 📚

[mattie-bundle.mattiebelt.com](https://mattie-bundle.mattiebelt.com/)

## Development workflow

### Requirements

- Node.js `12.x` or `14.x`
- NPM `6.x`
- Yarn `1.x`

### Setup bundle mono-repo

```batch
yarn setup
```

### Run example app

```batch
yarn develop
```

The `DATABASE` ENV can be used to choose another [database config](example/config/database.js).

### Format & lint

```bash
yarn format && yarn lint
```

### Tests

```bash
yarn test
```

## License

See the [MIT License](./LICENSE) file for licensing information.
