---
title: Providers
description: 'Get started with fast content search by installing one of these strapi search providers!'
category: 🔍 Search
position: 11
badge: 1.0.0-alpha.1
supportedProviders:
  - Algolia
possibleProviders:
  - Elasticsearch
  - Meilisearch
  - Coveo
  - Addsearch
---

The Strapi search plugin uses a provider system, similar to the official Strapi Upload and Email plugin, to connect to a (third party) search service.
The following search service are supported.

<list :items="supportedProviders" icon="IconSearch"></list>

In the future the Mattie Bundle will develop and officially support multiple providers. Possible search service are the following:

<list :items="possibleProviders" icon="IconChevronRight"></list>

## Algolia

### Installation

Add `@mattie/strapi-provider-search-algolia` as dependency to your project with:

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add @mattie/strapi-provider-search-algolia
```

  </code-block>
  <code-block label="NPM">

```bash
npm install @mattie/strapi-provider-search-algolia
```

  </code-block>
</code-group>

### Configuration

#### File based

The algolia provider can be selected and configured with the `provider` and `providerOptions` in the [search plugin configuration](./plugin#file-based).

| Property                        | Description                                                                                                      | Type                |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------- |
| `provider`                      | Name of the provider, must be `'algolia'`.                                                                       | `String` (required) |
| `providerOptions`               | Provider specific options.                                                                                       | `Object` (required) |
| `providerOptions.apiKey`        | Algolia API key. The _Admin API Key_ or a custom key with ACL operations: `search`, `addObject`, `deleteObject`. | `String` (required) |
| `providerOptions.applicationId` | Algolia application ID.                                                                                          | `String` (required) |

The usage of environment variables is recommended, checkout the Strapi documentation on <strapi-docs-link route="/developer-docs/latest/setup-deployment-guides/configurations/optional/environment.html#configuration-using-environment-variables">using environment variables.</strapi-docs-link>

##### **Configuration example**

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
        // ...
      },
    },
  },
});
```

#### Admin panel

<alert>
  Configuration by admin panel is coming soon! ✨ 
</alert>

## Create your own provider

<alert>
  'Create your own provider' guide coming soon! 🗒️ 
</alert>
