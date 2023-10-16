import React, { FC } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Slider from "react-slick";

// Styles
import useStyles from "./styles";
import Grid from "@material-ui/core/Grid/Grid";
import BlogCardComponent from "../../../Ui/cards/blog";

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  speed: 5000,
  autoplaySpeed: 2000,
  cssEase: "linear",
};

interface props {
  data: any;
}

const BlogSectionComponent: FC<props> = ({ data }) => {
  const classes = useStyles();
  return (
    <Box component="div" className={classes.blogWrapperBox} p={2}>
      <Box pt={2} pb={3}>
        <Typography
          classes={{ root: classes.sectionMainTitle }}
          variant="h1"
          component="h1"
          align="center"
        >
          Know more about your {data.title} Styles
        </Typography>
      </Box>
      <Grid container className="looks_slider">
        <Grid style={{ width: 500 }} item xs={12}>
          <Slider {...settings}>
            {data.blogs.map((blog, index) => (
              <Box
                key={index}
                component="div"
                className={classes.looksCardWrapper}
              >
                <BlogCardComponent data={blog} />
              </Box>
            ))}
          </Slider>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BlogSectionComponent;
