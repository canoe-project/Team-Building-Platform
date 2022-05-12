import Link from "next/link";
import { Button, TextField } from '@mui/material';
import styles from "../../styles/Home.module.css";
import css from "styled-jsx/css";

const style = css`
  .test {
    background-color: white;
    height: 60px;
    font-size: 1rem;
  }
`;

export default function LoginPage() {
  return (
    <>
      <h1>로그인</h1>
      <div>
        <form id="login-form">
          <h2>
            <TextField
            type="email"
            name="email"
            id="email"
            className="login-class"
            label="email" 
            variant="outlined"
            />
            </h2>
            <h2>
              <TextField
              type="password"
              name="password"
              id="password"
              className="login-class"
              label="비밀번호" 
              variant="outlined"
              />
              </h2>
              <h2>
                <Button variant="outlined"
                type="submit"
                className="primary"
                >로그인</Button>
                <Link href="/register" passHref>
                  <Button variant="outlined">회원가입</Button>
                  </Link>
                  </h2>
                  </form>
                  </div>
                  <h2 className={styles.title}>
                    <Link href="/">
                      <Button variant="contained">메인화면</Button>
                      </Link>
                      </h2>
                      <style jsx>{style}</style>
                      </>
                      );
                    }
