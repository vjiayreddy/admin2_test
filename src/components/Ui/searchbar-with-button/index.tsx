import React, { FC } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

// Styles
import useStyles from "./style";

interface props {
  pageTitle?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  btnTitle?: string;
  onClickBtn?: React.MouseEventHandler<HTMLButtonElement>;
  isShowBtn?: boolean;
}

const SearchBarWithButton: FC<props> = ({
  pageTitle,
  onChange,
  onClickBtn,
  btnTitle,
  isShowBtn,
}) => {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box>
        <Typography
          variant="body1"
          component="h3"
          classes={{ root: classes.pageTitleLbl }}
        >
          {pageTitle}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Box>
          <input
            onChange={onChange}
            placeholder="Search..."
            className={classes.searchInput}
            type="text"
          />
        </Box>
        {isShowBtn && (
          <Box mr={1}>
            <Button variant="contained" color="primary" onClick={onClickBtn}>
              {btnTitle}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SearchBarWithButton;
