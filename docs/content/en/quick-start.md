---
title: Quick Start Guides
subtitle: 'Guides to quickly get started with this mattie-bundle for Strapi.'
description: 'Get quickly started with these guides for this mattie-bundle for Strapi.'
position: 01
category: '🚀 Getting Started'
---

<alert>

Checkout [the example](https://github.com/MattieBelt/mattie-strapi-bundle/tree/master/example) in the mattie-bundle monorepo.

</alert>

## Search plugin with Algolia provider

### 1. Strapi application 

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

<img src="/usage/search-with-algolia/init-admin.png" alt="Initial Admin user" />


### 2. Create a _Post_ collection type

After registering the initial Admin user, we can use the Content-Type Builder to create our first collection type _Post_.
Create a new collection type with the following configurations and example fields:

<img src="/usage/search-with-algolia/create-post-collection-type-configurations.png" alt="Post collection type configurations" />
<img src="/usage/search-with-algolia/create-post-collection-type-fields.png" alt="Post collection type fields" />

Save the collection type and wait for the server to restart.

### 3. Sign up and create your Algolia application

Create your Algolia by signing up at [algolia.com/users/sign_up](https://www.algolia.com/users/sign_up).
Once you have created you Algolia application, navigate to _Settings > Team and Access > API Keys_ ([algolia.com/account/api-keys](https://www.algolia.com/account/api-keys)). 

<img src="/usage/search-with-algolia/algolia-settings-api-keys.png" alt="Algolia API keys settings" />

Add your `Application ID` and `Admin API Key` to `./.env` file in your project.

```text
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

Add the Search plugin and Algolia provider configuration to the `./config/plugins.js` file. Create the file if it doesn't exist yet.

```js
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
      contentTypes: [
        { name: 'api::post.post' },
      ],
    },
  },
});
```

### 6. Index an _Post_ entity

Let's start the Strapi server with `yarn develop` or `npm run develop` and create the first _Post_ entity.
After the server has started go to the admin panel (http://localhost:1337/admin) and navigate to _Content Manager > COLLECTION TYPES > Post_ and click on _+ Create new Entry_. Now create your first _Post_ and hit _Save_ and _Publish_ to also index this entry into your Algolia Application.

<img src="/usage/search-with-algolia/create-post-entry.png" alt="Create first Post entry" />

Now the entry is saved, check your Algolia application if it has been indexed successfully.

<img src="/usage/search-with-algolia/algolia-first-post-entry-indexes.png" alt="First Post entry indexed" />
