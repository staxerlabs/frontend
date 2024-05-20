import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Question } from "@phosphor-icons/react";

interface Props {
    text: string;
  }

const CustomTooltip: React.FC<Props> = ({text}) => {
  const renderTooltip = (props: any) => (
    <Tooltip id="under-development-tooltip" className='tooltip-layout' {...props}>
      {text}
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="top"
      overlay={renderTooltip}
    >
      <Question size={24} className='icon'/>
    </OverlayTrigger>
  );
};

export default CustomTooltip;
