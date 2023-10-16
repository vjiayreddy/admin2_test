import React, { FC, Fragment } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import _ from 'lodash';

// Styles
import useStyles from "./styles";
import { Button } from "@material-ui/core";

interface props {
  data?: any;
  index?: any;
}

const LeftSlideComponent: FC<props> = ({ data, index }) => {
  const classes = useStyles();
  return (
    <Box p={2} className={clsx(classes.leftSide, classes.styleSectionWrapper)}>
      <Grid container alignItems="stretch" justify="center">
        <Grid item lg={6} md={6} xl={6} sm={6} xs={12}>
          <Box
            className={classes.productSection}
            style={{
              alignItems:"center",
            }}
            component="div"
            p={3}
          >
            <Grid
              alignItems="stretch"
              justify="center"
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
            </Grid>
          </Box>
        </Grid>
        <Grid item lg={6} md={6} xl={6} sm={6} xs={12}>
          <Box
            component="div"
            className={classes.contentSection}
            pt={8}
            pr={8}
            pl={4}
            pb={8}
          >
            <Typography
              className={classes.contentMainTitle}
              variant="h2"
              component="h2"
            >
              {data.label}
            </Typography>
            <Box pb={2}>
              <Typography
                className={classes.contentSubTitle}
                variant="subtitle1"
                component="span"
              >
                Recommended for you
              </Typography>
            </Box>

            <Typography>{data.note}</Typography> 
            <Box pt={3}>
              <Button>View Products</Button>
            </Box>
            <Box component="div" className={classes.circleDecorator}></Box>
          </Box>
        </Grid>
      </Grid>
      <Box className={classes.numberDecoration}>{index}</Box>

    </Box>
  );
};

export default LeftSlideComponent;
