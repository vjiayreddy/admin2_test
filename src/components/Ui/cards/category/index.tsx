import React, { FC } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
// Styles
import useStyles from "./styles";

interface props {
  data: any;
  route: string;
}

const CategoryCardComponent: FC<props> = ({ data, route }) => {
  const classes = useStyles();
  const router = useRouter();

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <Grid item md={3} lg={3} xl={3} xs={6} sm={4}>
      <Box className={classes.categoryCard} component="div">
        <Box className={classes.categoryCardImage}>
          <img width="100%" src={data.personalizeImage || data.image} />
        </Box>
        <Box className={classes.categoryCardContent}>
          <Typography
            classes={{ root: classes.categoryCardTitle }}
            variant="h6"
            component="h6"
          >
            {capitalizeFirstLetter(data.label || data.name)}
          </Typography>
          <Button
            color="primary"
            onClick={() =>
              router.push(
                `${route}?uid=${router.query.uid}&&type=${
                  data.label || data.name
                }&&catId=${data._id}`
              )
            }
            classes={{ root: classes.categoryButton }}
          >
            View Styles
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default CategoryCardComponent;
