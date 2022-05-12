import Link from "next/link";
import { Button, TextField, FormControl } from '@mui/material';
import styles from "../../styles/Home.module.css";
import css from "styled-jsx/css";

const style = css`
  .test {
    background-color: white;
    height: 60px;
    font-size: 1rem;
  }
`;

export default function RegisterPage() {
  return (
    <>
      <h1>회원가입</h1>
      <div>
        <form id="register-form">
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
              <TextField
              type="password"
              name="passwordcheck"
              id="passwordcheck"
              className="login-class"
              label="비밀번호 확인" 
              variant="outlined"
              />
              </h2>
              <h2>
              <TextField
              type="nickname"
              name="nickname"
              id="nickname"
              className="login-class"
              label="닉네임" 
              variant="outlined"
              />
              </h2>
              <h2>
              <TextField
              type="academic_background"
              name="academic_background"
              id="academic_background"
              className="login-class"
              label="학력" 
              variant="outlined"
              />
              </h2>
              <h2>
              <TextField
              type="contact_information"
              name="contact_information"
              id="contact_information"
              className="contact_information"
              label="연락처" 
              variant="outlined"
              />
              </h2>
              <h2>
              <FormControl fullWidth sx={{ m: 1, width: '35ch' }}>
              <TextField
              type="address"
              name="address"
              id="address"
              className="address"
              label="주소" 
              variant="outlined"
              />
              </FormControl>
              </h2>
              <h2>
              <FormControl fullWidth sx={{ m: 1, width: '50ch' }}>
              <TextField
              type="self_introduction"
              name="self_introduction"
              id="self_introduction"
              className="self_introduction"
              label="자기소개" 
              multiline
              maxRows={4}
              variant="outlined"
              />
              </FormControl>
              </h2>
              <h2>
              <TextField
              type="area_of_interest"
              name="area_of_interest"
              id="area_of_interest"
              className="area_of_interest"
              label="관심분야" 
              variant="outlined"
              />
              </h2>
            
            <Button 
            type="submit"
            className="primary"
            variant="outlined">
              확인</Button>
            
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
