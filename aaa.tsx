export async function getServerSideProps() {
  const response = await fetch(
    "https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426?applicationId=1039167989114446384"
  );
  const data = await response.json();

  return { props: { data } };
}

export default function Home({ data }) {
  return (
    <div>
      <ul>
        {data.result.large.map((recipe) => (
          <li key={recipe.categoryId}>{recipe.categoryName}</li>
        ))}
      </ul>
      {/* {data.result && <p>東京の天気：{data.result.large[1].categoryId}</p>} */}
    </div>
  );
}
// {results.result && <p>カテゴリーID:{results.result.large[0].categoryId}</p>}
