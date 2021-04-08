import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';
import {BiInfoCircle} from 'react-icons/bi';

const DateInfo = () => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <div>
      <p>Velg en dato eller et datointervall: <span style={{textDecoration: "underline", color:"blue"}} href="#" id="dato"><BiInfoCircle/></span></p>
      <Tooltip placement="top" isOpen={tooltipOpen} target="dato" toggle={toggle}>
        Velg en ønsket dato eller et datointervall for søk i bildefilene
      </Tooltip>
    </div>
  );
}

export default DateInfo;