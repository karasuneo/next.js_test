import React, { FC, useEffect } from "react";
import { useRouter } from "next/router";

import { auth } from "../utils/firebase";

const SignUp: FC = () => {
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user.emailVerified && router.push("/");
    });
  }, []);

  const sendEmailVerification = async () => {
    try {
      await auth.currentUser.sendEmailVerification();
      alert("認証メールを再送しました");
      router.push("/sent");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <p>メール内のリンクをクリックしてユーザーを有効化してください。</p>
      <button onClick={sendEmailVerification}>再送する</button>
    </div>
  );
};

export default SignUp;
