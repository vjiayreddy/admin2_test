import React, { FC, Fragment } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import _ from 'lodash';
// Styles
import useStyles from "./styles";
import Button from "@material-ui/core/Button";

interface props {
  data?: any;
  index?: any;
}

const RightSlideComponent: FC<props> = ({ data, index }) => {
  const classes = useStyles();

  return (
    <Box p={2} className={clsx(classes.rightSide, classes.styleSectionWrapper)}>
      <Grid container alignItems="stretch" justify="center">
        <Grid
          container
          alignItems="center"
          justify="flex-end"
          item
          lg={6}
          md={6}
          xl={6}
          sm={6}
          xs={12}
        >
          <Box
            component="div"
            className={classes.contentSection}
            pt={8}
            pr={4}
            pl={8}
            pb={8}
          >
            <Typography
              className={classes.contentMainTitle}
              variant="h2"
              component="h2"
              align="right"
            >
              {data.label}
            </Typography>
            <Box pb={2}>
              <Typography
                className={classes.contentSubTitle}
                variant="subtitle1"
                component="span"
                align="right"
              >
                Recommended for you
              </Typography>
            </Box>

            <Typography align="right">{data.note}</Typography>
            <Box pt={3}>
              <Button>View Products</Button>
            </Box>
            <Box component="div" className={classes.circleDecorator}></Box>
          </Box>
        </Grid>

        <Grid item lg={6} md={6} xl={6} sm={6} xs={12}>
          <Box
            className={classes.productSection}
            style={{
              alignItems:"center" 
            }}
            component="div"
            pb={3}
            pr={3}
            pl={3}
          >
            <Grid
              alignItems="stretch"
              justify="flex-start"
              container
              spacing={2}
            >
              {!_.isEmpty(data.products) && <Fragment>
                  {data.products.map((product, index)=> <Grid item md={4} lg={4} sm={4} xs={6} xl={4}>
                      <Box
                        className={classes.productImageWrapper}
                        component="div"
                      >
                        <img width="100%" src={product} />
                      
                      </Box>
                    </Grid>)}
                </Fragment>}
              {/* {data.products.map((product, index) => (
                <Fragment key={index}>
                  {product.colors === null ? (
                   
                  ) : (
                    <Fragment>
                      <Fragment>
                        {product.colors.map((color, index) => (
                          <Grid
                            key={index}
                            item
                            md={4}
                            lg={4}
                            sm={4}
                            xs={6}
                            xl={4}
                          >
                            <Box
                              className={classes.productImageWrapper}
                              component="div"
                            >
                              <Box
                                style={{
                                  backgroundColor: `#${color.hashCode}`,
                                }}
                                component="div"
                                className={classes.colorCard}
                              ></Box>
                              <Box pt={1}>{color.name}</Box>
                            </Box>
                          </Grid>
                        ))}
                      </Fragment>
                    </Fragment>
                  )}
                </Fragment>
              ))} */}
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Box className={classes.numberDecoration}>{index}</Box>
    </Box>
  );
};

export default RightSlideComponent;
