import React, { FC } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Slider from "react-slick";

// Styles
import useStyles from "./styles";

// UI
import LooksCardComponent from "../../../Ui/cards/looks";

interface props {
  data: any;
}
const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
};
export const LooksComponent: FC<props> = ({ data }) => {
  const classes = useStyles();
  return (
    <Box p={2} component="div" className={classes.looksWrapperBox}>
      <Box pt={2} pb={5}>
        <Typography
          classes={{ root: classes.sectionMainTitle }}
          variant="h1"
          component="h1"
          align="center"
        >
          {data.title}
        </Typography>
        <Typography classes={{ root: classes.sectionSubTile }}>
          {data.dec}
        </Typography>
      </Box>

      <Grid container className="looks_slider">
        <Grid style={{ width: 500 }} item xs={12}>
          <Slider {...settings}>
            {data.looks.map((look, index) => (
              <Box
                key={index}
                component="div"
                className={classes.looksCardWrapper}
              >
                <LooksCardComponent
                  data={{
                    title: look.title,
                    imgUrl: look.images[0],
                  }}
                />
              </Box>
            ))}
          </Slider>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LooksComponent;
