/* eslint-disable no-cond-assign */
import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import _ from 'lodash';
import EditorTop from 'components/EditorComponents/editTop';
import marked from '@/components/marked';
import { getArticeOne } from '@/utils/api/home';
import { wordCount } from '@/utils';
import './index.less';

const Editor = dynamic(
  () => import('react-markdown-editor-fix'),
  { ssr: false }
);

function ArticleEditor({ articleData }) {
  let initWord = 0;
  if (articleData.content) {
    initWord = wordCount(articleData.content);
  }
  const [article, setArticle] = useState(articleData.content || '');
  const [wordNum, setWordNum] = useState(initWord);

  const changeWord = _.throttle((value) => {
    const count = wordCount(value);
    setWordNum(count);
  }, 1000);
  const changeArticle = useCallback((value) => {
    setArticle(value);
    changeWord(value);
  }, []);
  return (
    <div className="editor-page-container">
      <EditorTop article={article} articleData={articleData} />
      <div className="md-editor-content">
        <div className={wordNum > 3000 ? 'word-num active' : 'word-num'}>{`字数：${wordNum}`}</div>
        <Editor
          className="editor-content"
          renderHTML={text => marked(text)}
          value={article}
          onChange={val => changeArticle(val.text)}
        />
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
