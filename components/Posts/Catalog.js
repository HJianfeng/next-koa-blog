/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Anchor } from 'antd';
import _ from 'lodash';
import './catalog.less';

const { Link } = Anchor;


function Catalog({ catalog }) {
  if (catalog.length === 0) return '';
  let topLevel = 4;
  const cloneCatelog = _.cloneDeep(catalog);
  const catalogArray = [];
  cloneCatelog.forEach((item) => {
    if (item.level <= topLevel) {
      topLevel = item.level;
      item.children = [];
      catalogArray.push(item);
    } else {
      catalogArray[catalogArray.length - 1].children.push(item);
    }
  });
  return (
    <Anchor>
      {
        catalogArray.map((item, index) => {
          return (
            <Link key={index} href={`#${item.title}`} title={item.title}>
              {
                item.children.map((childrenItem, childrenindex) => {
                  return <Link key={childrenindex} href={`#${childrenItem.title}`} title={childrenItem.title} />;
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
