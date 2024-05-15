import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Question } from "@phosphor-icons/react";

const UnderDevelopmentTooltip: React.FC = () => {
  const renderTooltip = (props: any) => (
    <Tooltip id="under-development-tooltip" className='tooltip-layout' {...props}>
      This feature is under development.
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

export default UnderDevelopmentTooltip;
