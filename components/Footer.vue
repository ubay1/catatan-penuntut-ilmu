<template>
  <footer class="bg-gray-900 text-white">
    <div class="container mx-auto p-4 text-center">
      <small>&copy; {{ new Date().getFullYear() }} {{ siteName }}</small>
    </div>

    <div class="flex justify-evenly items-center pb-4">
      <a
        href="/articles/rss.xml"
        target="_blank"
        class="hover:no-underline text-white"
      >
        <img src="https://cdn.pixabay.com/photo/2012/04/24/17/57/rss-40674_640.png" alt="" srcset=""
          class="w-full h-6"
        >
      </a>
    </div>
  </footer>
</template>

<script>
import global from '~/utils/global';

export default {
  name: 'Footer',
  computed: {
    siteName() {
      return global.siteName;
    },
  },
};
</script>
