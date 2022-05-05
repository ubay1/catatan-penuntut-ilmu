<template>
  <header
    class="bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-md text-white fixed w-full z-20"
  >
    <div class="p-4">
      <div class="flex justify-between items-center">
        <h1 class="uppercase font-bold">
          <nuxt-link
            to="/articles/page/1"
            class="md:grid md:gap-4 md:grid-cols-2 hover:no-underline"
          >
            {{ siteName }}
          </nuxt-link>
        </h1>
        <div class="flex justify-center items-center">
          <button class="w-8" type="button" data-modal-toggle="defaultModal">
            <i class="mdi mdi-magnify mdi-24px" />
          </button>
        </div>
      </div>
    </div>

    <!-- Main Modal -->
  </header>
</template>

<script>
import global from '~/utils/global'
// import { inputSearch } from '~/store'
import { getSearchArticle } from '~/utils/getContent'

export default {
  /* -------------------------------------------------------------------------- */
  /*                                   data                                     */
  /* -------------------------------------------------------------------------- */
  data() {
    return {
      message: 'test',
      screen_size: 0,
      searchQuery: '',
      articles: [],
      paginatedArticles: [],
    }
  },

  /* -------------------------------------------------------------------------- */
  /*                                 computed                                   */
  /* -------------------------------------------------------------------------- */
  computed: {
    siteName() {
      return global.siteName
    },

    compSearchQuery() {
      return this.searchQuery
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                                 watcher                                    */
  /* -------------------------------------------------------------------------- */
  watch: {
    compSearchQuery(val) {
      // if (val !== '') {
      //   if (inputSearch.search !== true) {
      //     inputSearch.setSearchActive(true)
      //   }
      // } else {
      //   this.paginatedArticles = []
      //   inputSearch.setSearchActive(false)
      // }
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                                 lifecycle                                  */
  /* -------------------------------------------------------------------------- */
  created() {
    this.handleResize()
  },

  beforeMount() {
    this.screen_size = window.innerWidth

    if (this.screen_size < 768) {
      this.searchQuery = ''
      this.paginatedArticles = []
    } else {
      this.searchQuery = ''
      this.paginatedArticles = []
    }
  },

  mounted() {
    window.addEventListener('resize', this.handleResize)
  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },

  /* -------------------------------------------------------------------------- */
  /*                                   method                                   */
  /* -------------------------------------------------------------------------- */
  methods: {
    handleResize() {
      this.screen_size = window.innerWidth
    },

    openModalSearch() {
      console.log('test')
    },

    async searchArticle() {
      // EventBus.$emit('query', this.searchQuery)
      const data = {
        $content: this.$content,
        params: this.$route.params,
        errors: this.$nuxt.error,
        q: this.searchQuery,
      }
      const { paginatedArticles } = await getSearchArticle(data)

      // this.allArticles = content.allArticles
      this.paginatedArticles = paginatedArticles
    },

    openSearchMobile() {
      this.paginatedArticles = []
      this.searchQuery = ''
    },

    clearSearchMobile() {
      this.searchQuery = ''
    },

    closeSearchMobile() {
      this.paginatedArticles = []
      this.searchQuery = ''
    },
  },
}
</script>
