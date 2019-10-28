/* eslint-disable no-cond-assign */
import React, { useState, useCallback } from 'react';
import Router from 'next/router';
import {
  Input, Col, message, Row
} from 'antd';
import {
  postArtice
} from '@/utils/api/home';
// 编辑器
import { zip } from '@/utils';

function EditorTop({ articleData, article }) {
  const [title, setTitle] = useState(articleData.title || '');
  const [summary, setSummary] = useState(articleData.summary || '');
  const [category, setCategory] = useState(articleData.category || '');

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

  const saveArticle = useCallback(async (params) => {
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
    const zipArticleMarkdown = zip(params.article);
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
      content: zipArticleMarkdown,
      catalog
    };
    if (articleData._id && articleData._id !== '') {
      query.id = articleData._id;
    }
    const { data } = await postArtice(query);
    if (data.code === 200) {
      message.success(data.msg);
      if (query.id) {
        Router.push(`/post/${query.id}`);
        return;
      }
      Router.push('/');
    } else {
      message.error(data.msg);
    }
  }, []);
  return (
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
  );
}

export default EditorTop;
