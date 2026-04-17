import { client } from './contentful';

export async function getPage(slug: string) {
  const res = await client.getEntries({
    content_type: 'page',
    'fields.slug': slug,
    include: 5,
  });

  return res.items[0];
}

export async function getHeader() {
  const res = await client.getEntries({
    content_type: 'header',
    limit: 1,
    include: 2,
  });

  return res.items[0];
}

export async function getFooter() {
  const res = await client.getEntries({
    content_type: 'footer',
    limit: 1,
    include: 2,
  });

  return res.items[0];
}