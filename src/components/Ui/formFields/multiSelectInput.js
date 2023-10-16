import React, { useState } from "react";
import { Select,OutlinedInput,MenuItem } from "@material-ui/core";

const names = [
  "Humaira Sims",
  "Santiago Solis",
  "Dawid Floyd",
  "Mateo Barlow",
  "Samia Navarro",
  "Kaden Fields",
  "Genevieve Watkins",
  "Mariah Hickman",
  "Rocco Richardson",
  "Harris Glenn",
];

const MultiSelectInput = () => {
  const [selectedNames, setSelectedNames] = useState([]);

  return (
    <Select
      multiple
      value={selectedNames}
      onChange={(e) => setSelectedNames(e.target.value)}
      input={<OutlinedInput label="Multiple Select" />}
    >
      {names.map((name) => (
        <MenuItem key={name} value={name}>
          {name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default MultiSelectInput;
