<template>
  <div>
    <Header @openModalSearch="openModalSearch" />
    <main class="bg-gray-700 pt-5">
      <div class="p-4">
        <Nuxt />
      </div>
    </main>
    <Footer />
    <Modal
      :is-modal-open="isModalOpen"
      @closeModalSearch="closeModalSearch"
      @gotoDetailArticle="gotoDetailArticle"
    />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Modal from '@/components/Modal'

export default {
  name: 'MainLayout',
  components: {
    Header,
    Footer,
    Modal,
  },
  data() {
    return {
      isModalOpen: false,
    }
  },
  methods: {
    openModalSearch() {
      document.querySelector('html').style.overflowY = 'hidden'
      this.isModalOpen = true
    },
    closeModalSearch() {
      document.querySelector('html').style.overflowY = 'auto'
      this.isModalOpen = false
    },
    gotoDetailArticle(article) {
      document.querySelector('html').style.overflowY = 'auto'
      this.isModalOpen = false
      return this.$router.push({
        name: 'articles-slug',
        params: { slug: article.slug },
      })
    },
  },
}
</script>
