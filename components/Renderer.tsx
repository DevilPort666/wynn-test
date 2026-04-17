import { componentMap } from './registry';

type ContentfulComponent = {
  sys: {
    id: string;
    contentType: {
      sys: {
        id: keyof typeof componentMap;
      };
    };
  };
  fields: any;
};

export default function Renderer({
  components,
}: {
  components: ContentfulComponent[];
}) {
  if (!components) return null;

  return (
    <>
      {components.map((item) => {
        const type = item.sys.contentType.sys.id;
        const Component = componentMap[type];

        if (!Component) return null;

        return <Component key={item.sys.id} {...item.fields} />;
      })}
    </>
  );
}