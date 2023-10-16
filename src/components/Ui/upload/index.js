import React from "react";
import {
  Grid,
  makeStyles,
  CircularProgress,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import ImageUploading from "react-images-uploading";
import Image from "next/image";
import LoadingButton from "../../Ui/formFields/LoadingButton";

const UploadFiles = ({
  id,
  btnTitle,
  imgUrl,
  server,
  onChange,
  image,
  loading,
  imgWidth,
  imgHeight,
  onDelete,
  imageTitle,
  onClickImage,
  error,
}) => {
  const useStyles = makeStyles((theme) => ({
    avatarImage: {
      height: 215,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
    },
    imgCardHeader: {
      //marginBottom: 20,
    },
    imageCardTitle: {
      fontSize: 15,
      fontWeight: 500,
      marginTop: 4,
    },
    uploadSection: {
      width: "100%",
      height: "100%",
      padding: 15,
      border: error
        ? `1px dashed ${theme.palette.error.main}`
        : `1px dashed "#DAD9E2"`,
      borderRadius: 4,
      backgroundColor: theme.palette.common.white,
    },
    uploadbtn: {
      paddingLeft: 10,
      paddingRight: 10,
      fontSize: 14,
      marginTop: 10,
    },
    uploading: {
      color: "#838694",
      fontSize: 12,
      marginTop: 10,
      fontWeight: 500,
    },
    iconButton: {
      padding: 0,
    },
    uploadPhoto: {
      minWidth: 200,
      minHeight: 200,
      paddingTop: 20,
      backgroundColor: "white",
      border: `2px dashed #EEEEEE`,
      marginTop: 20,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 30,
    },
  }));
  const classes = useStyles();
  return (
    <ImageUploading
      value={image}
      onChange={onChange}
      maxNumber={1}
      dataURLKey="data_url"
    >
      {({ onImageUpload }) => (
        <section className={classes.uploadSection}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            classes={{ root: classes.uploadContainer }}
          >
            {server && (
              <Grid
                classes={{ root: classes.imgCardHeader }}
                container
                justify="space-between"
                alignItems="center"
                xs={12}
              >
                <Grid item>
                  <Typography
                    classes={{ root: classes.imageCardTitle }}
                    variant="h3"
                    component="h3"
                  >
                    {imageTitle}
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    onClick={onDelete}
                    classes={{ root: classes.iconButton }}
                  >
                    <Image
                      src="/icons/delete.svg"
                      width={16}
                      height={16}
                      layout="fixed"
                      alt="delete-icon"
                      priority={true}
                      loading="eager"
                    ></Image>
                  </IconButton>
                </Grid>
              </Grid>
            )}
            <Grid item xs={12}>
              <div
                className={classes.avatarImage}
                style={{
                  backgroundImage: `url(imgUrl)`,
                  height: server ? 215 : 150,
                }}
              >
                {loading ? (
                  <React.Fragment>
                    <CircularProgress />
                    <Typography
                      classes={{ root: classes.uploading }}
                      variant="h3"
                      component="h3"
                    >
                      Uploading..
                    </Typography>
                  </React.Fragment>
                ) : (
                  <img
                    width={imgWidth ? imgWidth : 49}
                    height={imgHeight ? imgHeight : 157}
                    // layout="fixed"
                    src={imgUrl}
                    // loading="eager"
                    // quality={80}
                    onClick={onClickImage}
                  />
                )}
              </div>
              {server ? (
                <div></div>
              ) : (
                <React.Fragment>
                  {!loading && (
                    <LoadingButton
                      id={id}
                      btnTitle={btnTitle}
                      color="secondary"
                      onClick={onImageUpload}
                      btnClassName={classes.uploadbtn}
                      //disabled={loadingSVP}
                      //spinner={loadingSVP}
                    ></LoadingButton>
                  )}
                </React.Fragment>
              )}
            </Grid>
          </Grid>
        </section>
      )}
    </ImageUploading>
  );
};

export const UploadProfileImage = ({
  id,
  btnTitle,
  imgUrl,
  server,
  image,
  onChange,
  uploadImage,
  loading,
  imgWidth,
  imgHeight,
  onDelete,
  imageTitle,
  onClickImage,
  error,
}) => {
  const useStyles = makeStyles((theme) => ({
    avatarImage: {
      height: 215,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
    },
    imgCardHeader: {
      //marginBottom: 20,
    },
    imageCardTitle: {
      fontSize: 15,
      fontWeight: 500,
      marginTop: 4,
    },
    uploadSection: {
      width: "100%",
      height: 235,
      padding: 15,
      border: error
        ? `1px dashed ${theme.palette.error.main}`
        : `1px dashed ${theme.palette.common.COLOR_DAD9E2}`,
      borderRadius: 4,
      backgroundColor: theme.palette.common.white,
    },
    uploadbtn: {
      paddingLeft: 10,
      paddingRight: 10,
      fontSize: 14,
      marginTop: 10,
    },
    uploading: {
      color: theme.palette.common.COLOR_838694,
      fontSize: 12,
      marginTop: 10,
      fontWeight: 500,
    },
    iconButton: {
      padding: 0,
    },
    uploadPhoto: {
      width: 200,
      height: 200,
      backgroundColor: "white",
      border: `2px dashed #EEEEEE`,
      marginTop: 20,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 30,
    },
  }));
  const classes = useStyles();

  return (
    <ImageUploading
      value={image}
      onChange={onChange}
      maxNumber={1}
      dataURLKey="data_url"
    >
      {({ onImageUpload }) => (
        <section className={classes.uploadPhoto}>
          <img
            width={125}
            height={125}
            src={uploadImage ? uploadImage : "/images/profileicon.PNG"}
          ></img>
          <Button
            disableElevation
            style={{ marginBottom: 20, marginTop: 10 }}
            color="secondary"
            onClick={onImageUpload}
            variant="contained"
            disabled={loading}
          >
            Upload Profile
          </Button>
        </section>
      )}
    </ImageUploading>
  );
};

export const UploadFileButton = ({
  id,
  btnTitle,
  onChange,
  image,
  loading,
  error,
}) => {
  const useStyles = makeStyles((theme) => ({
    avatarImage: {
      height: 215,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
    },
    imgCardHeader: {
      //marginBottom: 20,
    },
    imageCardTitle: {
      fontSize: 15,
      fontWeight: 500,
      marginTop: 4,
    },
    uploadSection: {
      width: "100%",
      height: "100%",
      padding: 15,
      border: error
        ? `1px dashed ${theme.palette.error.main}`
        : `1px dashed "#DAD9E2"`,
      borderRadius: 4,
      backgroundColor: theme.palette.common.white,
    },
    uploadbtn: {
      paddingLeft: 10,
      paddingRight: 10,
      fontSize: 14,
      marginTop: 10,
    },
    uploading: {
      color: "#838694",
      fontSize: 12,
      marginTop: 10,
      fontWeight: 500,
    },
    iconButton: {
      padding: 0,
    },
    uploadPhoto: {
      minWidth: 200,
      minHeight: 200,
      paddingTop: 20,
      backgroundColor: "white",
      border: `2px dashed #EEEEEE`,
      marginTop: 20,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 30,
    },
  }));
  const classes = useStyles();
  return (
    <ImageUploading
      value={image}
      onChange={onChange}
      maxNumber={1}
      dataURLKey="data_url"
    >
      {({ onImageUpload }) => (
        <section>
          <LoadingButton
            id={id}
            btnTitle={btnTitle}
            color="secondary"
            onClick={onImageUpload}
            btnClassName={classes.uploadbtn}
            //disabled={loadingSVP}
            spinner={loading}
          ></LoadingButton>
        </section>
      )}
    </ImageUploading>
  );
};

export default UploadFiles;
