// src/page/index.tsx


import { generateIndex } from 'lib/algolia';


export default function Index(): JSX.Element {
  return (
    <>...</>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  await generateIndex();
  ...
  return { props: { ... } };
};