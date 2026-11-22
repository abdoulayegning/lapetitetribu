import { createClient } from 'contentful'

let client = null

// Contentful is only queried in the browser (onMounted / onBeforeMount), so the client
// is created lazily on the first request: server rendering never builds it, and a
// missing key can no longer crash the whole page with a 500.
export function useContentful() {
  const config = useRuntimeConfig()

  const getClient = () => {
    if (!client) {
      client = createClient({
        space: config.public.contentfulSpaceId,
        accessToken: config.public.contentfulApiKey, //Only published !!!
      })
    }
    return client
  }

  return {
    getEntries: (query) => getClient().getEntries(query),
  }
}
