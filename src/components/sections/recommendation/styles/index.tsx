import React, { FC, Fragment } from "react";
import Box from "@material-ui/core/Box";

// Ui
import LeftSlideComponent from "./leftSlide";
import RightSlideComponent from "./rightSide";

interface props {
  data: any[];
}

const StyleSectionComponent: FC<props> = ({ data }) => {
  return (
    <Box>
      {data.map((product, index) => (
        <Fragment key={index}>
          {(index + 1) % 2 === 0 ? (
            <RightSlideComponent index={index + 1} data={product} />
          ) : (
            <LeftSlideComponent index={index + 1} data={product} />
          )}
        </Fragment>
      ))}
    </Box>
  );
};

export default StyleSectionComponent;
