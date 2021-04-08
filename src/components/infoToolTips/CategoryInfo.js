import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';
import {BiInfoCircle} from 'react-icons/bi';

const CategoryInfo = () => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <div>
      <p>Velg kategori/er: <span style={{textDecoration: "underline", color:"blue"}} href="#" id="kategorier"><BiInfoCircle/></span></p>
      <Tooltip placement="top" isOpen={tooltipOpen} target="kategorier" toggle={toggle}>
        Velg en eller fler kategorier for søk i bildefilene
      </Tooltip>
    </div>
  );
}

export default CategoryInfo;