---
title: Search plugin
subtitle: 'Get started with fast content search by installing this strapi search plugin! 🔍'
description: 'Get started with fast content search by installing this strapi search plugin!'
category: 🔍 Search
position: 10
badge: 1.0.0-alpha.1
features:
  - Index your contet
  - Configure each index and the fields
  - Search provider system
futureFeatures:
  - Multiple indexes
  - Before save/update/delete methods/lifecycles
  - Index conditions
  - Multiple providers support
  - Manage indexes from Admin panel (e.g. View or Delete indexed objects)
  - Global search bar in Strapi admin panel (e.g. InstantSearch.js)
---

<list :items="features"></list>

<alert type="warning">
  This plugin is still in development. 🚧 
</alert>

## Installation

Add `@mattie/strapi-plugin-search` as dependency to your project with:

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add @mattie/strapi-plugin-search
```

  </code-block>
  <code-block label="NPM">

```bash
npm install @mattie/strapi-plugin-search
```

  </code-block>
</code-group>

After installing the plugin, rebuild your Strapi admin panel.

<code-group>
  <code-block label="Yarn" active>

```bash
yarn build --clean
```

  </code-block>
  <code-block label="NPM">

```bash
npm run build -- --clean
```

  </code-block>
</code-group>

## Configuration

### File based

The plugin can be configured by file (`./config/plugins.js`). The file configuration uses the Strapi <strapi-docs-link route="/developer-docs/latest/setup-deployment-guides/configurations/optional/plugins.html">plugin configuration</strapi-docs-link>.

| Property              | Description                                                                                                        | Type                | Default value                      |
| --------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------- | ---------------------------------- |
| `provider`            | Name of the provider.                                                                                              | `String` (required) |                                    |
| `providerOptions`     | Provider specific options, checkout the [provider configuration](./providers#file-based) for the required options. | `Object`            |                                    |
| `prefix`              | Set a prefix on all indexes.                                                                                       | `String`            | `strapi.config. environment + '_'` |
| `excludedFields`      | Fields that are not indexed on all indexes.                                                                        | `Array<String>`     | `['created_by', 'updated_by']`     |
| `debug`               | Enable or disable the debug logs.                                                                                  | `Boolean`           | `false`                            |
| `contentTypes`        | List op indexes content types.                                                                                     | `Array<Object>`     |                                    |
| `contentTypes.name`   | UID of the content type.                                                                                           | `String` (required) |                                    |
| `contentTypes.index`  | Name of the index.                                                                                                 | `String`            | `contentTypes.name`                |
| `contentTypes.fields` | Fields that are indexed.                                                                                           | `Array<String>`     | All fields.                        |

<alert type="info">

Use `yarn strapi content-types:list` to list all existing content type UIDs with the <strapi-docs-link route="/developer-docs/latest/developer-resources/cli/CLI.html#strapi-content-types-list">Strapi CLI.</strapi-docs-link>

</alert>

#### Configuration examples

<code-group>
  <code-block label="Simple" active>

```js [./config/plugins.js]
module.exports = ({ env }) => ({
  settings: {
    search: {
      enabled: true,
      config: {
        provider: 'algolia',
        providerOptions: {
          apiKey: env('ALGOLIA_PROVIDER_ADMIN_API_KEY'),
          applicationId: env('ALGOLIA_PROVIDER_APPLICATION_ID'),
        },
        contentTypes: [{ name: 'api::podcast.podcast' }, { name: 'api::episode.episode' }, { name: 'api::category.category' }],
      },
    },
  },
});
```

  </code-block>
  <code-block label="Composite index">

```js [./config/plugins.js]
module.exports = ({ env }) => ({
  settings: {
    search: {
      enabled: true,
      config: {
        // ..
        contentTypes: [
          {
            name: 'api::podcast.podcast',
            index: 'global-search',
          },
          {
            name: 'api::episode.episode',
            index: 'global-search',
          },
        ],
      },
    },
  },
});
```

  </code-block>
  <code-block label="Complex">

```js [./config/plugins.js]
module.exports = ({ env }) => ({
  search: {
    enabled: env.bool('SEARCH_PLUGIN', false),
    config: {
      provider: 'algolia',
      providerOptions: {
        apiKey: env('ALGOLIA_PROVIDER_ADMIN_API_KEY'),
        applicationId: env('ALGOLIA_PROVIDER_APPLICATION_ID'),
      },
      prefix: 'custom-prefix_',
      excludedFields: ['createdAt', 'createdBy', 'updatedBy'],
      debug: true,
      contentTypes: [
        {
          name: 'api::podcast.podcast',
          index: 'podcast',
        },
        {
          name: 'api::episode.episode',
          index: 'episode',
          fields: ['id', 'title', 'subtitle', 'description', 'duration', 'type', 'keyWords', 'showNotes', 'podcast', 'hosts', 'quests'],
        },
        {
          name: 'api::category.category',
        },
      ],
    },
  },
});
```

  </code-block>
</code-group>

### Admin panel

<alert>
  Configuration by admin panel is coming soon! ✨ 
</alert>

## Future features

<list :items="futureFeatures" icon="IconChevronRight"></list>
