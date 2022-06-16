/*
정도현
*/


import React, { Fragment, useEffect, useRef, useState } from "react";

const Editor = ({ onChangeHandle, name, value, readOnly, className }) => {
  const editorRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const defaultReadOnly = false;
  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
  }, []);

  useEffect(() => {
    if (editorRef.current !== null) {
      setLoading(false);
    }
  }, [editorRef]);

  if (loading) return <div>loading...</div>;

  return (
    <Fragment>
      <CKEditor
        className={className}
        type=""
        name={name}
        disabled={readOnly === undefined ? defaultReadOnly : readOnly}
        editor={ClassicEditor}
        data={value}
        onChange={(event, editor) => {
          if (onChangeHandle !== undefined) onChangeHandle(editor.getData());
        }}
        onReady={(editor) => {
          const toolbarElement = editor.ui.view.toolbar.element;

          if (readOnly === undefined ? defaultReadOnly : readOnly) {
            toolbarElement.style.display = "none";
          } else {
            toolbarElement.style.display = "flex";
          }
        }}
        style={`
        border-color:#ffffff`}
      />
    </Fragment>
  );
};

export default Editor;
