import { useState, useEffect } from "react";

export default function Home() {
  const [result, setResult] = useState("");
  useEffect(() => {
    const fetchResult = async () => {
      const response = await fetch(
        "https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426?applicationId=1039167989114446384"
      );
      const data = await response.json();
      setResult(data);
    };
    fetchResult();
  }, []);

  return (
    <div>
      <ul>
        {result.map((result) => (
          <li key={result.user.id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
}
