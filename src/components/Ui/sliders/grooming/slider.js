import React, { Fragment } from "react";
import Box from "@material-ui/core/Box";

// Ui
import LeftSlideComponent from "./leftSlide";
import RightSlideComponent from "./rightSide";

const StyleSectionComponent = ({ left, item, index }) => {
  return (
    <Box>
      {left ? (
        <Box style={{ backgroundColor: "#E1F4FF" }}>
          <LeftSlideComponent data={item} />
        </Box>
      ) : (
        <Box style={{ backgroundColor: "#F5F7FA" }}>
          <RightSlideComponent data={item} />
        </Box>
      )}
    </Box>
  );
};

export default StyleSectionComponent;
