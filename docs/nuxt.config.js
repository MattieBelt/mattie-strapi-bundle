import theme from '@nuxt/content-theme-docs';

export default theme({
  docs: { primaryColor: '#007EFF' },
  env: {
    strapiDocsBaseUrl: process.env.STRAPI_DOCS_BASE_URL || 'https://docs.strapi.io/',
  },
});
