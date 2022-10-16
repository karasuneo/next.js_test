import removeMd from 'remove-markdown';

export const generateIndex = async (): Promise<void> => {
  // ローカル or ヘッドレス CMS 経由で記事の情報を取得
  // 各自で実装が必要
  const posts = async getPosts(...);

  // posts のプロパティ例
  //   id, title, description, content
  const objects = posts.map((post) => {
    return {
      objectID: post.id,
      url: `https://fwywd.com/${post.id}`,
      title: post.title,
      description: post.description,
      content: removeMd(post.content),  // markdown => plaintext
    };
  });

  // 内容の確認
  console.log(objects)
};