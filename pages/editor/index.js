import React, { useState, useCallback } from 'react';
import Editor from 'react-markdown-editor-lite';

function ArticleEditor() {
  const [article, setArticle] = useState();

  const handleChange = useCallback((value) => {
    console.log(value);
    setArticle(value);
  }, []);

  return (
    <Editor value={article} onChange={() => handleChange()} />
  );
}


export default ArticleEditor;
