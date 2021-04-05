import React, { FC, CSSProperties, useCallback } from 'react';
import { CloseModalButton, CreateMenu } from './styles';

interface IProps {
  style: CSSProperties;
  show: boolean;
  onCloseModal: (e: any) => void;
  closeButton?: boolean;
}
const Menu: FC<IProps> = ({ children, style, show, onCloseModal, closeButton }) => {
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  if (!show) return null;

  return (
    <CreateMenu onClick={onCloseModal}>
      <div style={style} onClick={stopPropagation}>
        {closeButton && <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>}
        {children}
      </div>
    </CreateMenu>
  );
};

Menu.defaultProps = {
  closeButton: true,
};

export default Menu;
