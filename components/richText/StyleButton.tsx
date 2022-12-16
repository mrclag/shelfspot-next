import React from "react";

type Props = {
  active: boolean;
  style: string;
  label: any;
  onToggle: (bockType: string) => void;
};

const StyleButton = ({ active, style, label, onToggle }: Props) => {
  const _onToggle = (e: any) => {
    e.preventDefault();
    onToggle(style);
  };

  const className = "RichEditor-styleButton";

  return (
    <button
      className={className + `${active ? " RichEditor-activeButton" : ""}`}
      onClick={_onToggle}
    >
      <div className="editor-button-content">{label}</div>
    </button>
  );
};

export default React.memo(StyleButton);
