
import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Input, Button, message } from 'antd';
import { postArtice } from '@/utils/api/home';
import { zip } from '@/utils';
import marked from '@/components/marked';
import './index.less';

const Editor = dynamic(import('for-editor'), {
  ssr: false
});

function ArticleEditor() {
  const [article, setArticle] = useState('');
  const [title, setTitle] = useState('');

  const changeTitle = useCallback((e) => {
    const { value } = e.target;
    setTitle(value);
  }, []);
  const handleChange = useCallback((value) => {
    setArticle(value);
  }, []);

  const saveArticle = useCallback(async (tit, val) => {
    const zipArticle = zip(marked(val));
    if (!tit || tit === '') {
      message.error('请输入标题');
      return;
    }
    if (!val || val === '') {
      message.error('请输入文章');
      return;
    }
    const params = {
      title: tit,
      content: zipArticle
    };
    const { data } = await postArtice(params);
    if (data.code === 200) {
      message.success('发布成功');
    } else {
      message.error(data.msg);
    }
  }, []);
  return (
    <div className="editor-container">
      <div className="editor-title">
        <Input value={title} onChange={(e) => { changeTitle(e); }} className="input" placeholder="请输入标题" />
        <Button type="primary" onClick={() => { saveArticle(title, article); }}>保存文章</Button>
      </div>
      <Editor
        preview
        subfield
        value={article}
        onChange={val => handleChange(val)}
      />
    </div>
  );
}

ArticleEditor.getInitialProps = async () => {
  return {
    headerHidden: true,
    FooterHidden: true
  };
};

export default ArticleEditor;
