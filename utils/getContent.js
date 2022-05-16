let currentPage = 0
let perPage = 5
let allArticles
let totalArticles
let lastPage
let lastPageCount

const skipNumber = () => {
  if (currentPage === 1) {
    return 0
  }
  if (currentPage === lastPage) {
    return totalArticles - lastPageCount
  }
  return (currentPage - 1) * perPage
}

export const getPaginateArticle = async ({ $content, params, error }) => {
  currentPage = parseInt(params.page)
  perPage = 5
  allArticles = await $content('articles').fetch()
  totalArticles = allArticles.length

  // use Math.ceil to round up to the nearest whole number
  lastPage = Math.ceil(totalArticles / perPage)

  // use the % (modulus) operator to get a whole remainder
  lastPageCount = totalArticles % perPage

  const paginatedArticles = await $content('articles')
    .only(['title', 'description', 'image', 'slug', 'published'])
    .sortBy('published', 'desc')
    .limit(perPage)
    .skip(skipNumber())
    .fetch()

  if (currentPage === 0 || !paginatedArticles.length) {
    return error({ statusCode: 404, message: 'No articles found!' })
  }

  return {
    allArticles,
    paginatedArticles,
  }
}

export const getSearchArticle = async ({ $content, error, q }) => {
  const listArticles = await $content('articles')
    .only(['title', 'description', 'image', 'slug', 'published'])
    .sortBy('published', 'desc')
    // .limit(perPage)
    .search(q)
    // .skip(skipNumber())
    .fetch()

  return {
    listArticles,
  }
}
