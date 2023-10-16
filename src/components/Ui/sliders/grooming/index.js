import React, { Fragment, useEffect, useState } from "react";
import { makeStyles, Box, Typography } from "@material-ui/core";
import Slider from "react-slick";

// Apollo
import { GET_CELEBRITIES_MATCHING_STYLES } from "../../../../apollo/queries/grooming";
import { useLazyQuery } from "@apollo/client";

import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  productsSliderSection: {
    //marginTop: 100,
  },
  sectionTitle: {
    ...theme.typography.h1,
    fontSize: 24,
    marginBottom: 20,
  },
  clientCardBox: {
    height: "auto",
  },
  clientCardWrapper: {
    overflow: "hidden",
    boxShadow: `rgba(0, 0, 0, 0.16) 0px 1px 4px`,
  },
  clientImage: {
    height: 300,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top center",
    overflow: "hidden",
  },
  clientSlider: {
    backgroundColor: "#FFFFFF",
    paddingTop: "50px",
    width:"600px",
    paddingBottom: "50px",
    [theme.breakpoints.only("xs")]: {
      paddingTop: "20px",
      paddingBottom: "20px",
    },
  },
  clientSlideTitle: {
    fontSize: 25,
  },
}));

const GroomingSlider = ({ faceTypeId, styleIds, title, bgColor, catId }) => {
  const classes = useStyles();
  const [matchCelPics, setMatchCelPics] = useState([]);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    className: "center",
    centerMode: true,

    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          className: "center",
          centerMode: true,
        },
      },
    ],
  };

  const [getUserCelebrities, { data: dataMUC }] = useLazyQuery(
    GET_CELEBRITIES_MATCHING_STYLES
  );

  useEffect(() => {
    if (faceTypeId) {
      if (faceTypeId && styleIds) {
        if (catId === "615477102dacb312bc63159a") {
          getUserCelebrities({
            variables: {
              params: {
                faceShapeId: faceTypeId,
                hairStyleIds: styleIds,
              },
            },
          });
        } else {
          getUserCelebrities({
            variables: {
              params: {
                beardStyleIds: styleIds,
                faceShapeId: faceTypeId,
              },
            },
          });
        }
      } else {
        getUserCelebrities({
          variables: {
            params: {
              faceShapeId: faceTypeId,
            },
          },
        });
      }
    }
  }, [faceTypeId, styleIds]);

  useEffect(() => {
    if (!_.isEmpty(dataMUC)) {
      const { getCelebrities } = dataMUC;
      let data = [];
      if (!_.isEmpty(getCelebrities.celebrities)) {
        getCelebrities.celebrities.map((item, index) => {
          data.push({
            name: item.title,
            imgUrl: item.images[0],
          });
        });
        setMatchCelPics(data);
      }
    }
  }, [dataMUC]);

  return (
    <Fragment>
      {!_.isEmpty(matchCelPics) && (
        <Box
          className={classes.clientSlider}
          style={{ backgroundColor: bgColor }}
        >
          <Box p={2}>
            <Typography
              classes={{ root: classes.clientSlideTitle }}
              align="center"
              variant="h3"
              component="h4"
            >
              {title}
            </Typography>
          </Box>

          <Box
            pl={{ xs: 2, md: 10, lg: 10, sm: 3, xl: 10 }}
            pr={{ xs: 2, md: 10, lg: 10, sm: 3, xl: 10 }}
            component="div"
            className="styleclub-client-slider"
          >
            <Slider
              {...settings}
              infinite={matchCelPics.length <= 4 ? false : true}
              className="style-club-section"
            >
              {matchCelPics.map((item, index) => (
                <div key={index}>
                  <Box className={classes.clientCardBox}>
                    <Box m={1} className={classes.clientCardWrapper} p={1}>
                      <Box
                        className={classes.clientImage}
                        style={{
                          backgroundImage: `url(${item.imgUrl})`,
                        }}
                      ></Box>
                    </Box>
                  </Box>
                </div>
              ))}
            </Slider>
          </Box>
        </Box>
      )}
    </Fragment>
  );
};

export default GroomingSlider;
