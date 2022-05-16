<template>
  <div>
    <ul class="text-gray-500">
      <li
        v-for="article of articles"
        :key="article.slug"
        class="mb-7 bg-white p-5 rounded shadow"
      >
        <nuxt-link
          :to="{ name: 'articles-slug', params: { slug: article.slug } }"
          class="md:grid md:gap-4 md:grid-cols-2"
        >
          <img
            v-if="article.image"
            :src="article.image"
            alt=""
            class="w-full h-72 <md:h-60 object-cover rounded-md"
          />
          <img
            v-else
            src="https://www.dinkessbd.com/assets/img/berita/no_image.png"
            alt=""
            class="w-full h-72 <md:h-60 object-cover rounded-md"
          />
          <div>
            <h2 class="font-bold text-gray-900 text-xl mb-2 mt-2">
              {{ article.title }}
            </h2>
            <p class="text-md line-clamp-8">{{ article.description }}</p>
            <p class="font-bold text-sm text-blue-800 mt-1">Selengkapnya ..</p>
          </div>
        </nuxt-link>
      </li>
    </ul>
    <!-- <div v-if="total" class="container mx-auto my-5 max-w-5xl">
      <Pagination v-if="total > 5" :total="total" />
    </div> -->
  </div>
</template>

<script>
// import Pagination from '@/components/Pagination'

export default {
  name: 'ArticleList',
  components: {
    // Pagination,
  },
  props: {
    articles: {
      type: Array,
      default: () => [],
    },
    total: {
      type: Number,
      default: 0,
    },
  },
}
</script>
