import React from 'react';
import Editor from 'react-markdown-editor-lite';


function EditorTool({ renderHTML, value, onChange }) {
  return (
    <Editor
      className="editor-content"
      renderHTML={renderHTML}
      value={value}
      onChange={onChange}
    />
  );
}

export default EditorTool;
