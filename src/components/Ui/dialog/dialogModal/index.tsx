import React, { forwardRef, FC, ReactNode } from "react";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import CloseIcon from "@material-ui/icons/Close";

// Styles
import useStyles from "./style";

interface props {
  open: boolean;
  onCloseModel: React.MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  maxWidth?: false | "xs" | "sm" | "md" | "lg";
  iconColor?: string
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const DialogModal: FC<props> = ({
  open,
  onCloseModel,
  children,
  maxWidth,
  iconColor
}) => {
  const classes = useStyles();
  return (
    <Dialog
      classes={{
        paperFullWidth: classes.paperFullWidth,
      }}
      fullWidth={true}
      maxWidth={maxWidth ? maxWidth : "sm"}
      open={open}
      TransitionComponent={Transition}
    >
      {children}
      <Box component="div" className={classes.modelCloseIcon}>
        <IconButton onClick={onCloseModel}>
          <CloseIcon style={{ color: iconColor }} />
        </IconButton>
      </Box>
    </Dialog>
  );
};


