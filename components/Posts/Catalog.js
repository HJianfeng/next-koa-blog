/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Anchor } from 'antd';
import _ from 'lodash';
import marked from 'marked';
import { getCatalog } from '@/utils';
import './catalog.less';

const slugger = new marked.Slugger();
const { Link } = Anchor;


function Catalog({ artice }) {
  const catalog = getCatalog(artice);
  if (catalog && catalog.length === 0) return '';
  let topLevel = 4;
  const cloneCatelog = _.cloneDeep(catalog);
  const catalogArray = [];
  cloneCatelog.forEach((item) => {
    item.heading = slugger.slug('heading');
    if (item.level <= topLevel) {
      topLevel = item.level;
      item.children = [];
      catalogArray.push(item);
    } else {
      const len = catalogArray.length - 1;
      catalogArray[len].children.push(item);
    }
  });
  return (
    <Anchor offsetTop={55}>
      {
        catalogArray.map((item, index) => {
          return (
            <Link key={index} href={`#${item.heading}`} title={item.title}>
              {
                item.children.map((childrenItem, childrenindex) => {
                  return <Link key={childrenindex} href={`#${childrenItem.heading}`} title={childrenItem.title} />;
                })
              }
            </Link>
          );
        })
      }
    </Anchor>
  );
}


export default Catalog;
