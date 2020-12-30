import marked from 'marked';
import hljs from 'highlight.js';

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight(code) {
    return hljs.highlightAuto(code).value;
  },
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});


const renderer = new marked.Renderer();

// 段落解析
const paragraphParse = text => `<p>${text}</p>`;

// 链接解析
const linkParse = (href, title, text) => {
  return `<a href=${href}
      title=${title || href}
      target='_blank'
      }>${text}</a>`;
};
const slugger = new marked.Slugger();
const heading = (text, level) => {
  const titleId = slugger.slug('heading');
  return `<h${level} data-id="${titleId}" data-level="${level}" data-text="${text}" id="${titleId}">${text}</h${level}>`;
};
renderer.paragraph = paragraphParse;
renderer.link = linkParse;
renderer.heading = heading;

const markedComponent = (content) => {
  if (typeof content !== 'string') return '';

  return marked(content, { renderer });
};
export default markedComponent;
