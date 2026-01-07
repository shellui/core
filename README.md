# ShellUI Monorepo

> A lightweight microfrontend shell to ship apps faster.

This monorepo contains the ShellUI packages:

- **@shellui/cli** - Command-line tool for ShellUI
- **@shellui/core** - Core React application runtime
- **@shellui/sdk** - JavaScript SDK for ShellUI integration

## Structure

```
.
├── packages/
│   ├── cli/          # CLI package
│   ├── core/          # Core React app
│   └── sdk/           # SDK package
└── package.json       # Root workspace configuration
```

## Development

### Install dependencies

```bash
npm install
```

### Build all packages

```bash
npm run build
```

### Build individual packages

```bash
npm run build:cli
npm run build:core
npm run build:sdk
```

### Run tests

```bash
npm test
```

## Publishing

### Publish all packages

```bash
npm run publish:all
```

### Publish individual packages

```bash
npm run publish:cli
npm run publish:core
npm run publish:sdk
```

## Workspace Scripts

- `npm run build` - Build all packages
- `npm run build:cli` - Build CLI package
- `npm run build:core` - Build Core package
- `npm run build:sdk` - Build SDK package
- `npm run publish:all` - Publish all packages
- `npm run publish:cli` - Publish CLI package
- `npm run publish:core` - Publish Core package
- `npm run publish:sdk` - Publish SDK package
- `npm run clean` - Clean all node_modules

## License

MIT
