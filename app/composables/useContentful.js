import { createClient } from 'contentful'

let client = null

export function useContentful() {
  if (!client) {
    const config = useRuntimeConfig()
    client = createClient({
      space: config.public.contentfulSpaceId,
      accessToken: config.public.contentfulApiKey, //Only published !!!
    })
  }
  return client
}
