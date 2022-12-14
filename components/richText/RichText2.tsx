import React, { useState, useRef, useEffect } from "react";

import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  ContentBlock,
  DraftHandleValue,
  convertFromHTML,
  convertFromRaw,
  convertToRaw,
  ContentState,
  RawDraftContentState,
} from "draft-js";
import "draft-js/dist/Draft.css";

import BlockStyleControls from "./BlockStyleControls";
import InlineStyleControls from "./InlineStyleControls";

type Props = {
  setContent: (state: RawDraftContentState) => void;
  initialContent: any;
};

const RTEditor = ({
  setContent,
  initialContent = EditorState.createEmpty(),
}: Props) => {
  const editorRef = useRef(null);
  const [editorState, setEditorState] = useState(initialContent);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  const styleMap = {
    CODE: {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
    },
  };

  const getBlockStyle = (block: ContentBlock) => {
    switch (block.getType()) {
      case "blockquote":
        return "RichEditor-blockquote";
      default:
        return "";
    }
  };

  const onChange = (state: EditorState) => {
    setEditorState(state);
    setContent(convertToRaw(editorState.getCurrentContent()));
  };

  const mapKeyToEditorCommand = (e: any): string | null => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
      if (newEditorState !== editorState) {
        onChange(newEditorState);
      }
      return null;
    }
    return getDefaultKeyBinding(e);
  };

  const handleKeyCommand = (
    command: string,
    editorState: EditorState,
    eventTimeStamp: number
  ): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  const toggleBlockType = (blockType: string) => {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle: string) => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  return (
    <div className="RichEditor-root">
      {editorRef && (
        <div className="RichEditor-control-group">
          <BlockStyleControls
            editorState={editorState}
            onToggle={toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={toggleInlineStyle}
          />
        </div>
      )}
      <Editor
        ref={editorRef}
        editorState={editorState}
        placeholder="Tell a story..."
        customStyleMap={styleMap}
        blockStyleFn={(block: ContentBlock) => getBlockStyle(block)}
        keyBindingFn={(e) => mapKeyToEditorCommand(e)}
        onChange={onChange}
        spellCheck={true}
        handleKeyCommand={handleKeyCommand}
      />
    </div>
  );
};

export default React.memo(RTEditor);
