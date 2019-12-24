import React from 'react'
// MATERIAL-UI
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
// import { Icon } from '@material-ui/core';

export default ({ children, onClick, btnClassName, tipClassName, placement, tip, color}) => (
  <Tooltip title={tip} className={tipClassName} color={color} placement={placement}>
    <IconButton onClick={onClick} className={btnClassName}>
      {children}
    </IconButton>
  </Tooltip>
)
