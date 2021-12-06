<template>
  <span>
    <a :href="strapiDocsBaseUrl + route" target="_blank" class="no-underline hover:underline">
      <slot/>
    </a>
    <sup class="px-1 rounded-full leading-1 tracking-tight bg-primary-100 dark:bg-primary-900 text-primary-500">v4</sup>
  </span>
</template>

<script>
export default {
  props: {
    route: {
      type: String,
      default: '',
    }
  },
  data: () => ({
    strapiDocsBaseUrl: process.env.strapiDocsBaseUrl,
  }),
}
</script>
