import Link from "next/link";
import { Button, TextField, FormControl } from '@mui/material';
import styles from "../../styles/Home.module.css";
import css from "styled-jsx/css";
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic'

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading?</p>,
})

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
]

const style = css`
  .test {
    background-color: white;
    height: 60px;
    font-size: 1rem;
  }
`;

export default function ContestCreatePage() {

  let titleInputString;
  const titleInputCheck = (e) => {
    titleInputString = e.target.value;
    console.log(titleInputString);
  }

  return (
    <>
      <h1>공모전 수정</h1>
      <h2>
      <FormControl fullWidth sx={{ m: 1, width: '35ch' }}>
            <TextField
            type="title"
            name="title"
            id="title"
            className="contestCreate-class"
            label="제목" 
            variant="outlined"
            />
            </FormControl>
            </h2>
            <h2>
            <TextField
            type="area"
            name="area"
            id="area"
            className="contestCreate-class"
            label="분야" 
            variant="outlined"
            />
            </h2>
            <h2>
            <TextField
            type="prize"
            name="prize"
            id="prize"
            className="contestCreate-class"
            label="상금" 
            variant="outlined"
            />
            </h2>
            <h2>
            <TextField
            type="date"
            name="start_day"
            id="start_day"
            className="contestCreate-class"
            label="시작일" 
            variant="outlined"
            focused
            />
            <TextField
            type="date"
            name="end_day"
            id="end_day"
            className="contestCreate-class"
            label="종료일" 
            variant="outlined"
            focused
            />
            </h2>
      <QuillNoSSRWrapper modules={modules} formats={formats} theme="snow" />
      <Button 
      type="submit"
      className="primary"
      variant="outlined">
        수정</Button>
      <h2 className={styles.title}>
      <Link href="/">
      <Button variant="contained">메인화면</Button>
      </Link>
       </h2>
       <style jsx>{style}</style>
    </>
  );
}
