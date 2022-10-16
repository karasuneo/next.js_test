export default async function handler(req, res) {
  const response = await fetch(
    "https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426?applicationId=1039167989114446384"
  );
  const results = await response.json();
  res.status(200).json({ results });
}
