import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';
import {BiInfoCircle} from 'react-icons/bi';

const ParsellInfo = () => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <div>
      <p>Skriv inn parsellnummer: <span style={{textDecoration: "underline", color:"blue"}} href="#" id="parsell"><BiInfoCircle/></span></p>
      <Tooltip placement="top" isOpen={tooltipOpen} target="parsell" toggle={toggle}>
        Skriv inn parsellnummer for ønsket søk på bildefilene
      </Tooltip>
    </div>
  );
}

export default ParsellInfo;