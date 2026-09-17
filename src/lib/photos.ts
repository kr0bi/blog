import type { CollectionEntry } from 'astro:content';
import { postUrl } from './paths';

// A photo's own date takes precedence over its post's publication date.
export function getPhotosNewestFirst(posts: CollectionEntry<'blog'>[]) {
  return posts.flatMap((post) => post.data.photos.map((photo) => ({
    ...photo,
    date: photo.date ?? post.data.pubDate,
    postLink: postUrl(post.id),
    postTitle: post.data.title,
  }))).sort((a, b) => b.date.valueOf() - a.date.valueOf());
}
