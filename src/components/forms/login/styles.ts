import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles((theme: any) => ({
  loginForm: {
    minWidth: 300,
    padding: 30,
    border: `1px solid #E0E0E0`,
  },
  loginButton: {
    fontSize: 14,
    width: 100,
  },
  copyWriteLbl: {
    marginTop: 20,
    fontSize: 12,
  },
}));

export default useStyles;
