# mattie-strapi-bundle

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
