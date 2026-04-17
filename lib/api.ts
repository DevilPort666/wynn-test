const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;
const BASE_URL = `https://cdn.contentful.com/spaces/${SPACE_ID}`;

async function fetchContent(url: string) {
  const res = await fetch(url, {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error('Contentful fetch error');
  }

  return res.json();
}

export async function getPage(slug: string) {
  const data = await fetchContent(
    `${BASE_URL}/entries?content_type=page&fields.slug=${slug}&include=10&access_token=${ACCESS_TOKEN}`
  );

  const items = resolveIncludes(data);
  return items?.[0] || null;
}

export async function getHeader() {
  const data = await fetchContent(
    `${BASE_URL}/entries?content_type=header&limit=1&include=2&access_token=${ACCESS_TOKEN}`
  );

  const items = resolveIncludes(data);
  return items?.[0] || null;
}

export async function getFooter() {
  const data = await fetchContent(
    `${BASE_URL}/entries?content_type=footer&limit=1&include=2&access_token=${ACCESS_TOKEN}`
  );

  const items = resolveIncludes(data);
  return items?.[0] || null;
}

function resolveIncludes(data: any) {
  const entryMap = new Map();
  const assetMap = new Map();

  (data.includes?.Entry || []).forEach((item: any) => {
    entryMap.set(item.sys.id, item);
  });

  (data.includes?.Asset || []).forEach((item: any) => {
    assetMap.set(item.sys.id, item);
  });

  function resolveItem(item: any): any {
    if (!item) return item;

    if (item.sys?.type === 'Link') {
      if (item.sys.linkType === 'Asset') {
        return assetMap.get(item.sys.id) || item;
      }
      if (item.sys.linkType === 'Entry') {
        const resolved = entryMap.get(item.sys.id);
        return resolved ? resolveItem(resolved) : item;
      }
  }

  if (item.fields) {
    const resolvedFields: any = {};
    for (const key in item.fields) {
      const value = item.fields[key];
      resolvedFields[key] = Array.isArray(value)
        ? value.map(resolveItem)
        : resolveItem(value);
    }
    return { ...item, fields: resolvedFields };
  }

  return item;
}

  return data.items.map(resolveItem);
}