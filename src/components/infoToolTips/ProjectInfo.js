import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';
import {BiInfoCircle} from 'react-icons/bi';

const ProjectInfo = () => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <div>
      <p>Velg prosjekt: <span style={{textDecoration: "underline", color:"blue"}} href="#" id="Prosjekt"><BiInfoCircle/></span></p>
      <Tooltip placement="top" isOpen={tooltipOpen} target="Prosjekt" toggle={toggle}>
        Velg prosjekt du vil sortere bildefilene for
      </Tooltip>
    </div>
  );
}

export default ProjectInfo;