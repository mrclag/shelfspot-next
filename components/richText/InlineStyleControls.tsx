import React from "react";
import { EditorState } from "draft-js";

import StyleButton from "./StyleButton";
import Image from "next/image";
import bold from "../../public/static/icons/type-bold.svg";
import italic from "../../public/static/icons/type-italic.svg";
import underline from "../../public/static/icons/type-underline.svg";
import mono from "../../public/static/icons/chat-square-quote.svg";

const INLINE_STYLES = [
  {
    label: <i title="Bold" className="fas fa-bold"></i>,
    style: "BOLD",
  },
  { label: <i title="Italics" className="fas fa-italic"></i>, style: "ITALIC" },
  {
    label: <i title="Underlined" className="fas fa-underline"></i>,
    style: "UNDERLINE",
  },
];

type Props = {
  editorState: EditorState;
  onToggle: (bockType: string) => void;
};

const InlineStyleControls = ({ editorState, onToggle }: Props) => {
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type, index) => (
        <StyleButton
          active={currentStyle.has(type.style)}
          key={index}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export default React.memo(InlineStyleControls);
