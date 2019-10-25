/* eslint-disable no-cond-assign */

import React, { useState, useCallback } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import {
  Input, message, Col, Row
} from 'antd';
import { postArtice } from '@/utils/api/home';
import './index.less';
// 编辑器
import { zip } from '@/utils';
import marked from '@/components/marked';

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
    if (!params.category || params.category === '') {
      message.error('请输入分类');
      return;
    }
    if (!params.title || params.title === '') {
      message.error('请输入标题');
      return;
    }
    if (!params.article || params.article === '') {
      message.error('请输入文章');
      return;
    }
    const catalog = [];
    const reg = /(#+)\s+?(.+?)\n/g;
    let regExecRes = null;
    while ((regExecRes = reg.exec(params.article))) {
      catalog.push({
        level: regExecRes[1].length,
        title: regExecRes[2]
      });
    }
    const query = {
      title: params.title,
      summary: params.summary || '',
      category: params.category || '',
      content: zipArticle,
      catalog
    };
    const { data } = await postArtice(query);
    if (data.code === 200) {
      message.success('发布成功');
      Router.push('/');
    } else {
      message.error(data.msg);
    }
  }, []);

  return (
    <div className="editor-page-container">
      <div className="editor-title">
        <Row gutter={0} className="gutter-row">
          <Col className="gutter-col" span={12}>
            <Input value={title} onChange={(e) => { changeTitle(e); }} className="input" placeholder="请输入标题" />
          </Col>
          <Col className="gutter-col" span={5}>
            <Input value={summary} onChange={(e) => { changeSummary(e); }} className="input" placeholder="请输入简介" />
          </Col>
          <Col className="gutter-col" span={5}>
            <Input value={category} onChange={(e) => { changeCategory(e); }} className="input" placeholder="请输入分类" />
          </Col>
          <Col className="gutter-col" span={2}>
            <div
              className="save-btn"
              onClick={() => {
                saveArticle({
                  title, article, summary, category
                });
              }}
            >
              保存文章
            </div>
          </Col>
        </Row>
      </div>
      <div>
        <Editor
          preview
          subfield
          expand={false}
          value={article}
          onChange={val => changeArticle(val)}
        />
      </div>
    </div>
  );
}

ArticleEditor.getInitialProps = async (ctx) => {
  console.log(ctx);
  return {
    headerHidden: true,
    FooterHidden: true
  };
};

export default ArticleEditor;
