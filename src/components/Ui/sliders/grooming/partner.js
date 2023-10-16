import React, { Fragment } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";
import Slider from "react-slick";
import _ from "lodash";
import { Typography, Button } from "@material-ui/core";

const settings_one = {
  dots: false,
  arrows: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        center: true,
        slidesToScroll: 1,
        arrows: true,
      },
    },
  ],
};

const useStyles = makeStyles((theme) => ({
  blogCard: {
    border: `1px solid gainsboro`,
    backgroundColor: `white`,
    padding: `20px`,
    minHeight: `250px`,
  },
  blogCardTitle: {
    fontSize: 14,
    lineHeight: "20px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  blogCardDes: {
    fontSize: 14,
    lineHeight: "20px",
    fontWeight: 500,
    marginTop: 8,
    [theme.breakpoints.only("xs")]: {
      fontSize: 12,
    },
  },
  blogImage: {
    width: 150,
    height: 100,
    backgroundPosition: "top center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    [theme.breakpoints.only("xs")]: {
      backgroundSize: "contain",
    },
  },
}));


const PartnersSlider = ({ data }) => {
  const classes = useStyles();
  return (
    <Fragment>
      {!_.isEmpty(data) && (
        <Slider className="blogslider" {...settings_one}>
          {data.map((item, index) => (
            <Box p={1} component="div" key={index}>
              <Box
                flexDirection="column"
                display="flex"
                component="div"
                className={classes.blogCard}
              >
                <Box display="flex" component="div">
                  <Box
                    flex={1}
                    className={classes.blogImage}
                    style={{
                      backgroundImage: `url(${
                        !_.isEmpty(item.images)
                          ? item.images[0]
                          : "/images/no-image.png"
                      })`,
                    }}
                  ></Box>
                  <Box flex={2} pl={2}>
                    <Typography
                      variant="h3"
                      component="h3"
                      onClick={() => {
                        window.open(`${item.url}`);
                      }}
                      classes={{ root: classes.blogCardTitle }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="h3"
                      component="h3"
                      classes={{ root: classes.blogCardDes }}
                    >
                      {item.note}
                    </Typography>
                  </Box>
                </Box>
                <Box mt={1}>
                  <Typography
                    variant="h3"
                    component="h3"
                    classes={{ root: classes.blogCardTitle }}
                  >
                    Address
                  </Typography>
                  <Typography
                    variant="h3"
                    component="h3"
                    classes={{ root: classes.blogCardDes }}
                  >
                    {item.address}{" "}
                    {!_.isEmpty(item.phone) && `, Mobile : ${item.phone}`}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Slider>
      )}
    </Fragment>
  );
};

export default PartnersSlider;
