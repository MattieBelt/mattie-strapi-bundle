---
title: Quick Start Guides
subtitle: 'Guides to quickly get started with this mattie-bundle for Strapi. 📚'
description: 'Get quickly started with these guides for this mattie-bundle for Strapi.'
position: 01
category: '🚀 Getting Started'
---

<alert>

Checkout [the example](https://github.com/MattieBelt/mattie-strapi-bundle/tree/master/example) in the monorepo for an advanced use case.

</alert>

## Search plugin with Algolia provider

This guide will provide a step-by-step explanation on how to setup content indexing to Algolia for a Strapi `v4` application.
The six steps will explain in detail how to setup a basic Strapi application, your Algolia application, the basic plugin config and how to index your first entry to Algolia.

#### Prerequisites

- Node ([supported versions](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/installation/cli.html#preparing-the-installation))
- Yarn or npm
- Basic Strapi knowledge ([Strapi quick start guide](https://docs.strapi.io/developer-docs/latest/getting-started/quick-start.html))

### 1. Strapi application

First we start by creating a fresh Strapi application, run the following command.

<code-group>
  <code-block label="Yarn" active>

```bash
yarn create strapi-app search-with-algolia --quickstart
```

  </code-block>
  <code-block label="NPM">

```bash
npx create-strapi-app search-with-algolia --quickstart
```

  </code-block>
</code-group>

After the Strapi application has been created register your first administrator.

<img src="/usage/search-with-algolia/init-admin.png" alt="Initial administrator" />

### 2. Create a _Post_ collection type

After registering the initial administrator, we can use the Content-Type Builder to create our first collection type _Post_. Navigate to the Content-Type Builder and create a new collection type with the following configurations and example fields:

<img src="/usage/search-with-algolia/create-post-collection-type-configurations.png" alt="Post collection type configurations" />
<img src="/usage/search-with-algolia/create-post-collection-type-fields.png" alt="Post collection type fields" />

Save the collection type and wait for the server to restart.

### 3. Sign up and create your Algolia application

If you don't already have an Algolia application you can create on by signing up at [_algolia.com/users/sign_up_](https://www.algolia.com/users/sign_up).
Once you have created you Algolia application, navigate to _Settings > Team and Access > API Keys_ or [_algolia.com/account/api-keys_](https://www.algolia.com/account/api-keys).

<img src="/usage/search-with-algolia/algolia-settings-api-keys.png" alt="Algolia API keys settings" />

Copy your `Application ID` and `Admin API Key` to the `.env` file in your project root.

```text [.env]
// ...
ALGOLIA_PROVIDER_APPLICATION_ID=G9Z63O9QUF
ALGOLIA_PROVIDER_ADMIN_API_KEY=043d7•••••••••••••••••••••••8102
```

### 4. Install plugin and provider

Stop your Strapi application, navigate to your strapi project with `cd search-with-algolia` in your terminal and install the Search plugin and the Algolia provider packages with:

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add @mattie-bundle/strapi-plugin-search @mattie-bundle/strapi-provider-search-algolia
```

  </code-block>
  <code-block label="NPM">

```bash
npm install @mattie-bundle/strapi-plugin-search @mattie-bundle/strapi-provider-search-algolia
```

  </code-block>
</code-group>

### 5. Configure the plugin and provider

After the packages have been installed we can configure the Search plugin and the Algolia provider in the `./config/plugins.js` file with the following example below. If the `plugins.js` file doesn't exist you can create a new file.

```js [./config/plugins.js]
'use strict';

module.exports = ({ env }) => ({
  // ...
  search: {
    enabled: true,
    config: {
      provider: 'algolia',
      providerOptions: {
        apiKey: env('ALGOLIA_PROVIDER_ADMIN_API_KEY'),
        applicationId: env('ALGOLIA_PROVIDER_APPLICATION_ID'),
      },
      contentTypes: [{ name: 'api::post.post' }],
    },
  },
});
```

### 6. Index a _Post_ entry ✨

Everything is correctly setup! Let's start the Strapi application with `yarn develop` or `npm run develop` and create the first _Post_ entry.
After the server has started go to the admin panel (http://localhost:1337/admin) and navigate to _Content Manager > COLLECTION TYPES > Post_ and click on _+ Create new Entry_. Now create your first _Post_ and hit _Save_ and _Publish_ to index this entry into your Algolia application.

<img src="/usage/search-with-algolia/create-post-entry.png" alt="Create first Post entry" />

Now the entry is saved, check your Algolia application if it has been indexed successfully, in the Algolia dashboard you should see something similar as the image below.

<img src="/usage/search-with-algolia/algolia-first-post-entry-indexes.png" alt="First Post entry indexed" />
