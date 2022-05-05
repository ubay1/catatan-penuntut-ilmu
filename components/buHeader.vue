<template>
  <div>
    <div class="block relative">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="cari catatan"
        class="p-1 rounded-md text-black focus:outline-none pl-2 w-52 pr-10 h-10"
      />
      <button
        class="bg-gray-900 absolute right-1 top-1 p-1 w-8 rounded-md hover:bg-gray-800"
        @click="searchArticle"
      >
        <i class="mdi mdi-magnify" />
      </button>

      <!-- list data hasil pencarian -->
      <div
        :class="`absolute top-8 bg-white shadow-md py-2 max-h-60 w-52 rounded-md rounded-t-none overflow-y-auto
                ${
                  searchQuery !== '' && paginatedArticles.length !== 0
                    ? 'block'
                    : 'hidden'
                }
                `"
        style="z-index: -10"
      >
        <div
          v-for="(item, index) in paginatedArticles"
          :key="`list artikel - ${index}`"
        >
          <nuxt-link
            class="px-0 py-1 gap-2 justify-start items-center"
            :to="{ name: 'articles-slug', params: { slug: item.slug } }"
          >
            <!-- <img :src="item.image" alt="" class="w-24"> -->
            <div
              class="text-sm text-black mb-2 px-2 capitalize line-clamp-2 border-b border-b-white"
            >
              {{ item.title }}
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>
