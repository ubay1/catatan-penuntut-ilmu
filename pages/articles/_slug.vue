<template>
  <article>
    <header class="text-white mx-auto text-xs mt-11">
      <div class="py-3 px-2 mb-5 rounded md:inline-block">
        <div class="text-sm">
          <span class="capitalize">Published:</span>
          <span>{{ article.published }}</span>
        </div>
        <div class="flex mt-4">
          <img
            src="/asset/icon_tag_white.png"
            alt="icon_tag"
            srcset=""
            width="20"
            height="50"
            class="filter saturate-0"
          />
          <ul class="flex ml-2">
            <li v-for="tag in article.tags" :key="tag" class="mr-1">
              <nuxt-link
                :to="{ name: 'tags-tag', params: { tag: tag.toLowerCase() } }"
                class="underline capitalize space-x-0"
              >
                {{ tag }}
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <div class="bg-white p-5 rounded mx-auto">
      <nuxt-content :document="article" class="prose prose-lg text-gray-500" />
    </div>
    <footer class="py-5 mt-5">
      <prev-next :prev="prev" :next="next" />
    </footer>
  </article>
</template>

<script>
import global from '~/utils/global'
import getSiteMeta from '~/utils/getSiteMeta'
import PrevNext from '@/components/PrevNext.vue'

export default {
  name: 'ArticlePage',
  components: {
    PrevNext,
  },
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    const [prev, next] = await $content('articles')
      .only(['title', 'slug', 'published'])
      .sortBy('published', 'desc')
      .surround(params.slug)
      .fetch()

    return {
      article,
      prev,
      next,
    }
  },
  head() {
    return {
      title: this.article.title,
      meta: [
        ...this.meta,
        {
          property: 'article:published_time',
          content: this.article.createdAt,
        },
        {
          property: 'article:modified_time',
          content: this.article.updatedAt,
        },
        {
          property: 'article:tag',
          content: this.article.tags ? this.article.tags.toString() : '',
        },
        { name: 'twitter:label1', content: 'Written by' },
        { name: 'twitter:data1', content: global.author || '' },
        { name: 'twitter:label2', content: 'Filed under' },
        {
          name: 'twitter:data2',
          content: this.article.tags ? this.article.tags.toString() : '',
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `${this.$config.baseUrl}/articles/${this.$route.params.slug}`,
        },
      ],
    }
  },
  computed: {
    meta() {
      const metaData = {
        type: 'article',
        title: this.article.title,
        description: this.article.description,
        url: `${this.$config.baseUrl}/articles/${this.$route.params.slug}`,
        mainImage: this.article.image,
      }
      return getSiteMeta(metaData)
    },
  },
}
</script>
