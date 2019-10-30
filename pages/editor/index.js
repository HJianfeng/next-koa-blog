/* eslint-disable no-cond-assign */
import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import EditorTop from 'components/EditorComponents/editTop';
import marked from '@/components/marked';
import {
  getArticeOne
} from '@/utils/api/home';
import './index.less';
// const Editor = dynamic(import('for-editor'), {
//   ssr: false
// });
const Editor = dynamic(import('react-markdown-editor-lite'), {
  ssr: false
});

function ArticleEditor({ articleData }) {
  const [article, setArticle] = useState(articleData.content || '');

  const changeArticle = useCallback((value) => {
    setArticle(value);
  }, []);
  return (
    <div className="editor-page-container">
      <EditorTop article={article} articleData={articleData} />
      <div className="md-editor-content">
        <Editor
          renderHTML={text => marked(text)}
          value={article}
          onChange={val => changeArticle(val.text)}
        />
        {/* <Editor
          preview
          subfield
          expand={false}
          value={article}
          onChange={val => changeArticle(val)}
        /> */}
      </div>
    </div>
  );
}

ArticleEditor.getInitialProps = async (ctx) => {
  const { id } = ctx.query;
  let editType = 'create';
  let articleData = null;
  if (id && id !== '') {
    const params = { id };
    const { data } = await getArticeOne(params);
    if (data && data.code === 200) {
      editType = 'update';
      articleData = data.data;
    }
    return {
      headerHidden: true,
      FooterHidden: true,
      articleData: articleData || {},
      editType
    };
  }
  return {
    headerHidden: true,
    FooterHidden: true,
    articleData: articleData || {},
    editType
  };
};

export default ArticleEditor;
