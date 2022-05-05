<template>
  <div class="mt-11">
    <div class="flex <md:flex-col gap-2">
      <div
        class="mb-4 w-1/4 sticky top-20 self-start <md:w-full <md:mb-2 <md:static"
      >
        <div class="bg-white p-4 shadow rounded">
          <!--
          <div class="text-lg text-black mb-2">
            Total Catatan:
            <span
              class="text-sm bg-gray-900 text-white p-1 px-2 rounded lowercase hover:bg-gray-600"
            >
              {{ allArticles.length }}
            </span>
          </div>
          -->
          <div class="text-lg text-black flex items-start">
            <div>
              <img
                src="/asset/icon_tag.png"
                alt="icon_tag"
                srcset=""
                width="30"
                height="50"
              />
            </div>
            <Tags :tags="tags" />
          </div>
        </div>
      </div>

      <ArticleList
        class="w-3/4 <md:w-full"
        :articles="paginatedArticles"
        :total="allArticles.length"
      />
    </div>
    <div class="container mx-auto my-5 max-w-5xl">
      <Pagination v-if="allArticles.length > 5" :total="allArticles.length" />
    </div>
  </div>
</template>

<script>
import { getPaginateArticle, getSearchArticle } from '~/utils/getContent'
import global from '~/utils/global'
import ArticleList from '@/components/ArticleList.vue'
import Tags from '@/components/Tags.vue'

export default {
  components: { ArticleList, Tags },

  async asyncData({ $content, params, error }) {
    const content = await getPaginateArticle({ $content, params, error })

    // console.log(content)

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index
    }
    const articles = await $content('articles').only(['tags']).fetch()
    const tags = articles.flatMap((article) => article.tags).filter(onlyUnique)

    return {
      allArticles: content.allArticles,
      paginatedArticles: content.paginatedArticles,
      tags,
    }
  },
  /* -------------------------------------------------------------------------- */
  /*                                   data                                     */
  /* -------------------------------------------------------------------------- */
  data() {
    return {
      allArticles: [],
      paginatedArticles: [],
      searchQuery: '',
    }
  },
  head() {
    return {
      title: `${this.routePage}`,
      titleTemplate: `${global.siteTitle} - ${this.routePage}`,
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `${this.configBaseUrl}/articles/page/${this.routePage}`,
        },
      ],
    }
  },

  /* -------------------------------------------------------------------------- */
  /*                                 computed                                   */
  /* -------------------------------------------------------------------------- */
  computed: {
    routePage() {
      return `Halaman ${this.$route.params.page}`
    },

    configBaseUrl() {
      return this.$config.baseUrl
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                                 watcher                                    */
  /* -------------------------------------------------------------------------- */
  watch: {
    async searchQuery(val) {
      if (!val) {
        return false
      } else {
        const data = {
          $content: this.$content,
          params: this.$route.params,
          errors: this.$nuxt.error,
          q: val,
        }
        const content = await getSearchArticle(data)

        this.allArticles = content.allArticles
        this.paginatedArticles = content.paginatedArticles
      }
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                                 lifecycle                                  */
  /* -------------------------------------------------------------------------- */
  created() {},

  mounted() {},

  /* -------------------------------------------------------------------------- */
  /*                                   method                                   */
  /* -------------------------------------------------------------------------- */
  methods: {},
}
</script>
