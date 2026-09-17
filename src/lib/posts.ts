import { getCollection } from 'astro:content';

// Use the same publishing rules for pages, galleries, and RSS.
export async function getPublishedPosts() {
  return (await getCollection('blog', ({ data }) => !data.draft && data.pubDate <= new Date()))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf() || a.id.localeCompare(b.id));
}
