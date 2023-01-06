import React from "react";
import { EditorState } from "draft-js";

import StyleButton from "./StyleButton";

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  // { label: "H3", style: "header-three" },
  // { label: "H4", style: "header-four" },
  // { label: "H5", style: "header-five" },
  // { label: "H6", style: "header-six" },
  // { label: '"quote"', style: "blockquote" },
  {
    label: <i title="Unordered List" className="fas fa-list-ul"></i>,
    style: "unordered-list-item",
  },
  {
    label: <div title="Ordered List" className="fas fa-list-ol"></div>,
    style: "ordered-list-item",
  },
  // { label: "Code Block", style: "code-block" },
];

type Props = {
  editorState: EditorState;
  onToggle: (bockType: string) => void;
};

const BlockStyleControls = ({ editorState, onToggle }: Props) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type, i) => (
        <StyleButton
          key={i}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export default React.memo(BlockStyleControls);
