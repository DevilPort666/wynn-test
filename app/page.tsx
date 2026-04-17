import { getPage } from '@/lib/api';
import Renderer from '@/components/Renderer';

export const revalidate = 10;

export default async function Home() {
  const page = await getPage('/'); 

  return (
    <main>
      <Renderer components={page?.fields?.components || []} />
    </main>
  );
}