import React from "react";
import Link from "next/link";
import makeStyles from "@material-ui/core/styles/makeStyles";

interface props {
  darkMode?: boolean;
  className?: string;
  mixpanel?: any;
  width?: number;
  height?: number;
}

const useStyles = makeStyles((theme) => ({
  logoImage: {
    height: 26,
    width: 165,
    [theme.breakpoints.only("xs")]: {
      height: "auto",
      width: 140,
    },
  },
}));

const LogoComponent: React.FC<props> = ({
  darkMode,
  className,
  width,
  height,
}) => {
  const classes = useStyles();
  return (
    <section className={className} id="mpf-app-logo" onClick={(): void => {}}>
      <Link href="/">
        <a>
          <img
            alt="mpf-logo"
            height={height ? height + "px" : 26}
            width={width ? width + "px" : 165}
            src={darkMode ? `/logos/mpf_dark.png` : "/logos/mpf_white.svg"}
            className={classes.logoImage}
          />
        </a>
      </Link>
    </section>
  );
};

export default LogoComponent;
