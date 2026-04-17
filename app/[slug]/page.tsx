import { getPage } from '@/lib/api';
import Renderer from '@/components/Renderer';
import { notFound } from 'next/navigation';

export const revalidate = 10;

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) notFound();

  return (
    <main>
      <Renderer components={page?.fields?.components || []} />
    </main>
  );
}