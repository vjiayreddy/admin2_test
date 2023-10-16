import React, { FC } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";
import Button from "@material-ui/core/Button";

interface props {
  btn1Name?: string;
  btn2Name?: string;
  id?: number;
  onClickBtn1?: () => void;
  onClickBtn2?: () => void;
}

const useStyles = makeStyles((theme: any) => ({
  mui_main_box: {
    minHeight: `calc(100vh - 70px)`,
    width: "100vw",
    background: "#808080",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  mui_content_box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  mui_Typography_h1: {
    color: theme.palette.common.white,
  },
  mui_Typography_body1: {
    color: theme.palette.common.white,
  },
  mui_buttons_box: {
    display: "flex",
    alignContent: "center",
    justifyItems: "center",
  },
  MuiButton: {
    minWidth: 170,
    [theme.breakpoints.only("xs")]: {
      minWidth: 150,
    },
  },
}));

const SlideComponent: FC<props> = ({
  btn1Name,
  btn2Name,
  onClickBtn1,
  onClickBtn2,
  id,
}) => {
  const classes = useStyles();
  return (
    <Box className={classes.mui_main_box}>
      <Box className={classes.mui_content_box} p={10}>
        <Box>
          <Typography
            classes={{ root: classes.mui_Typography_h1 }}
            variant="h1"
            component="h1"
            align="center"
          >
            Fashion. Personalized.
          </Typography>
        </Box>
        <Box>
          <Typography
            classes={{ root: classes.mui_Typography_body1 }}
            variant="body1"
            component="p"
            align="center"
          >
            We make you look your best, each day everyday.
          </Typography>
        </Box>
        <Box className={classes.mui_buttons_box}>
          <Box p={0.5}>
            <Button
              id={`mpf-app-shopnow-btn-${id}`}
              onClick={onClickBtn1}
              classes={{ root: classes.MuiButton }}
            >
              {btn1Name ? btn1Name : "Shop Now"}
            </Button>
          </Box>
          <Box p={0.5}>
            <Button
              id={`mpf-app-Knowyourstyle-btn-${id}`}
              onClick={onClickBtn2}
              classes={{ root: classes.MuiButton }}
              color="secondary"
            >
              {btn2Name ? btn2Name : "Know your style"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SlideComponent;
