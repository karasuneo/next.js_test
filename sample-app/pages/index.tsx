import { useCallback, useEffect, useState } from 'react';
import firebase, { initializeApp } from '@firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  signInWithCredential,
  signOut,
  Auth,
} from '@firebase/auth';

//https://console.firebase.google.com/
// プロジェクトを追加
// Authetication -> Sign-in method -> Googleを有効にする
// プロジェクトの概要 -> アプリの追加 -> ウェブ -> アプリの作成
// firebaseConfig の内容を持ってくる

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
};

const useAuth = (auth: Auth) => {
  const [state, setState] = useState<'idel' | 'progress' | 'logined' | 'logouted' | 'error'>(
    'idel'
  );
  const [error, setError] = useState<unknown>('');
  const [credential, setCredential] = useState<UserCredential>();
  const dispatch = useCallback(
    (action: { type: 'login'; payload?: { token: string } } | { type: 'logout' }) => {
      setError('');
      switch (action.type) {
        case 'login':
          setState('progress');
          const token = action.payload?.token;
          if (token) {
            signInWithCredential(auth, GoogleAuthProvider.credential(token))
              .then((result) => {
                setCredential(result);
                setState('logined');
              })
              .catch((e) => {
                setError(e);
                setState('error');
              });
          } else {
            signInWithPopup(auth, provider)
              .then((result) => {
                setCredential(result);
                setState('logined');
              })
              .catch((e) => {
                setError(e);
                setState('error');
              });
          }
          break;
        case 'logout':
          setState('progress');
          signOut(auth)
            .then(() => {
              setCredential(undefined);
              setState('logouted');
            })
            .catch((e) => {
              setError(e);
              setState('error');
            });
          break;
      }
    },
    [auth]
  );
  return { state, error, credential, dispatch };
};

//if (firebase.apps.length === 0) {
  const auth = getAuth(initializeApp(firebaseConfig));
//}
// const auth = getAuth(initializeApp(firebaseConfig));
const provider = new GoogleAuthProvider();

const Page = () => {
  const { state, dispatch, credential, error } = useAuth(auth);
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      dispatch({ type: 'login', payload: { token } });
    }
  }, [dispatch]);
  useEffect(() => {
    if (credential) {
      const token = GoogleAuthProvider.credentialFromResult(credential)?.idToken;
      token && sessionStorage.setItem('token', token);
    } else {
      sessionStorage.removeItem('token');
    }
  }, [credential]);
  const handleLogin = () => dispatch({ type: 'login' });
  const handleLogout = () => dispatch({ type: 'logout' });
  return (
    <div>
      <button onClick={handleLogin}>ログイン</button>
      <button onClick={handleLogout}>ログアウト</button>
      <div>User: {credential?.user.displayName}</div>
      <div>State: {state}</div>
      <div>Error: {String(error)}</div>
    </div>
  );
};

export default Page;