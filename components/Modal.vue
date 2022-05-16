<template>
  <div
    v-if="isModalOpen"
    class="absolute overflow-y-auto bg-white top-0 z-50 w-full h-full min-h-screen"
  >
    <div class="fixed w-full h-28 shadow-md border-b border-gray-200 bg-white">
      <button
        class="absolute right-2 top-2 h-6 w-6 rounded-full flex justify-center items-center bg-gray-800 text-white"
        @click="closeModalSearch"
      >
        <i class="mdi mdi-close mdi-18px" />
      </button>

      <div class="p-4 my-2 absolute w-full top-5">
        <form
          class="relative flex justify-center items-center w-full"
          action="post"
          @submit.prevent="onSubmit"
        >
          <input
            id="input-search-article"
            v-model="searchQuery"
            type="text"
            class="border border-gray-300 shadow-sm focus:border-gray-100 focus:outline-none focus:shadow-md rounded-md px-2 w-full h-10 placeholder-gray-300"
            name="input-search-article"
            placeholder="cari artikel"
          />
          <button
            class="absolute w-7 h-7 right-2 rounded-full"
            type="button"
            @click="onSubmit"
          >
            <i class="mdi mdi-magnify mdi-18px" />
          </button>
        </form>
      </div>
    </div>

    <!-- list article -->
    <div v-if="isLoadingArticle">
      <img
        class="w-8 h-8 m-auto mt-32"
        src="@/static/asset/loading.gif"
        alt="loading article .."
      />
    </div>
    <div v-else>
      <div v-if="listData.length === 0" class="text-center mt-32 text-gray-400">
        <img
          class="w-52 m-auto"
          src="https://cdn.dribbble.com/users/107759/screenshots/4588830/article-not-found.gif"
          alt="article-empty"
        />
        <p class="mt-4 text-gray-300">cari artikel yang ingin kamu baca</p>
      </div>
      <div v-else class="mt-32 m-4">
        <div v-for="(article, idx) in listData" :key="`list-article-${idx}`">
          <div
            class="mb-4 cursor-pointer shadow-md border border-gray-100 rounded-md flex <sm:flex-col"
            @click="gotoDetailArticle(article)"
          >
            <!-- <div
            class="mb-4 shadow-md border border-gray-100 rounded-md flex <sm:flex-col"
          > -->
            <div class="w-2/5 h-32 <sm:w-full <sm:h-40">
              <img
                class="w-full h-full object-cover rounded-tl-md rounded-bl-md <sm:rounded-tr-md <sm:rounded-bl-none"
                :src="article.image"
                alt="image-search-article"
              />
            </div>
            <div class="p-2 w-3/5 <sm:w-full">
              <h3 class="text-md font-bold">
                {{ article.title }}
              </h3>
              <p class="text-sm w-full line-clamp-4 <sm:line-clamp-3">
                {{ article.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSearchArticle } from '~/utils/getContent'

export default {
  props: {
    isModalOpen: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      isLoadingArticle: false,
      searchQuery: null,
      listData: [],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    closeModalSearch() {
      this.searchQuery = null
      this.listData = []
      this.$emit('closeModalSearch')
    },
    async onSubmit() {
      this.isLoadingArticle = true
      try {
        const data = {
          $content: this.$content,
          errors: this.$nuxt.error,
          q: this.searchQuery,
        }

        const { listArticles } = await getSearchArticle(data)

        this.listData = listArticles
        this.isLoadingArticle = false
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('error get article', error)
      }
    },
    gotoDetailArticle(article) {
      this.searchQuery = null
      this.listData = []
      this.$emit('gotoDetailArticle', article)
    },
  },
}
</script>
