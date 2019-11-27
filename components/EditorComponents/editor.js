import React from 'react';
import Editor from 'react-markdown-editor-lite';


function EditorTool({ renderHTML, value, onChange }) {
  return (
    <div>
      2
      <Editor
        className="editor-content"
        renderHTML={renderHTML}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default EditorTool;
