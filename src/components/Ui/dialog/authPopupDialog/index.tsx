import React, { FC, forwardRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";

// Styles
import useStyles from "./styles";

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

interface props {
  open: boolean;
  onCloseModel: React.MouseEventHandler<HTMLButtonElement>;
}

const FullScreenDialogComponent: FC<props> = ({ open, onCloseModel }) => {
  const classes = useStyles();
  return (
    <Dialog
      classes={{
        paperFullWidth: classes.paperFullWidth,
        paperWidthSm: classes.paperWidthSm,
      }}
      fullWidth={true}
      maxWidth={"sm"}
      open={open}
      TransitionComponent={Transition}
    >
      <h1>Login Container</h1>
      <button onClick={onCloseModel}>Close</button>
    </Dialog>
  );
};

export default FullScreenDialogComponent;
