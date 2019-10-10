
import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import {
  Input, Button, message, Col, Row
} from 'antd';
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
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState('');

  const changeTitle = useCallback((e) => {
    const { value } = e.target;
    setTitle(value);
  }, []);
  const changeSummary = useCallback((e) => {
    const { value } = e.target;
    setSummary(value);
  }, []);

  const changeCategory = useCallback((e) => {
    const { value } = e.target;
    setCategory(value);
  }, []);
  const changeArticle = useCallback((value) => {
    setArticle(value);
  }, []);

  const saveArticle = useCallback(async (params) => {
    const zipArticle = zip(marked(params.article));
    if (!params.title || params.title === '') {
      message.error('请输入标题');
      return;
    }
    if (!params.article || params.article === '') {
      message.error('请输入文章');
      return;
    }
    const query = {
      title: params.title,
      summary: params.summary || '',
      category: params.category || '',
      content: zipArticle
    };
    const { data } = await postArtice(query);
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
        <Button
          type="primary"
          onClick={() => {
            saveArticle({
              title, article, summary, category
            });
          }}
        >
          保存文章
        </Button>
      </div>
      <div className="editor-describe">
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            <Input value={summary} onChange={(e) => { changeSummary(e); }} className="input" placeholder="请输入简介" />
          </Col>
          <Col className="gutter-row" span={4}>
            <Input value={category} onChange={(e) => { changeCategory(e); }} className="input" placeholder="请输入分类" />
          </Col>
        </Row>
      </div>
      <Editor
        preview
        subfield
        value={article}
        onChange={val => changeArticle(val)}
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
