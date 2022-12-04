import React, { useRef } from "react";
import useOnClickOutside from "../../utils/useOnClickOutside";
// import styled from 'styled-components'

const Modal = ({ showModal, setShowModal, children }) => {
  const ref = useRef();

  useOnClickOutside(ref, () => {
    if (showModal) {
      setShowModal(false);
    }
  });

  return (
    <div className="modal">
      {showModal && (
        <div className="popup">
          <div className="popup_inner" ref={ref}>
            <div className="exit" onClick={() => setShowModal(false)}>
              <i className="fas fa-times"></i>
            </div>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
