import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Alert, Button, InputLabel, Snackbar, TextField } from "@mui/material";
import { css } from "@emotion/react";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "../lib/AuthContext";
import { useAuth } from "../lib/firebase";

const Signup = () => {
  const router = useRouter();
  const { user } = useAuthContext();
  const auth = useAuth();
  const isLoggedIn = !!user;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password);
    router.push("/");
  };
  const handleClose = async () => {
    await router.push("/");
  };
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };
  return (
    <div>
      <Snackbar
        open={isLoggedIn}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        key={"top" + "center"}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="warning">
          すでにログインしています
        </Alert>
      </Snackbar>
      <h2>ユーザー登録</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <InputLabel>メールアドレス</InputLabel>
          <TextField
            name="email"
            type="email"
            size="small"
            onChange={handleChangeEmail}
          />
        </div>
        <div>
          <InputLabel>パスワード</InputLabel>
          <TextField
            name="password"
            type="password"
            size="small"
            onChange={handleChangePassword}
          />
        </div>
        <div>
          <Button type="submit" variant="outlined">
            登録
          </Button>
        </div>
        <div>
          <Link href={"/login"}>
            <a>すでに登録している人はこちら</a>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
