import React, { useState, useEffect } from "react";
import ImageUpload from "../../../Ui/upload";
import {
  Grid,
  Dialog,
  DialogContent,
  makeStyles,
  IconButton,
  FormHelperText,
  Box,
} from "@material-ui/core";

import _ from "lodash";
import LoadingIndicator from "../../../Ui/loading";
import CloseIcon from "@material-ui/icons/Close";
import LoadingButton from "../../../Ui/formFields/LoadingButton";
import Resizer from "react-image-file-resizer";
import axios from "axios";

// Apollo
import {
  SAVE_FRONT_PICTURE,
  SAVE_BACK_PICTURE,
  SAVE_SIDE_PICTURE,
  GET_BODYPROFILE,
} from "../../../../apollo/queries/measurments";

import { useMutation, useLazyQuery } from "@apollo/client";

const useStyles = makeStyles((theme) => ({
  imageUploadFormWrapper: {
    padding: 30,
    width: "100%",
    margin: 0,
  },
  modelImage: {
    width: "100%",
    height: 400,
    position: "relative",
  },
  image: {
    objectFit: "contain",
    objectPosition: "top center",
  },
  modelCloseIcon: {
    position: "absolute",
    top: 0,
    right: 10,
    [theme.breakpoints.only("xs")]: {
      top: -10,
      right: 0,
    },
  },
  btnButton: {
    marginTop: 40,
    width: "300px",
  },
  validationText: {
    color: `${theme.palette.error.main} !important`,
  },
}));

const UploadImagesForm = ({ user, btnName }) => {
  const classes = useStyles();
  const [viewAllImages, setViewAllImages] = useState(false);
  const [openImg, setOpenImage] = useState(false);
  const [frontPic, setFrontPic] = useState(null);
  const [sidePic, setSidePic] = useState(null);
  const [backPic, setBackPic] = useState(null);
  const [modelImage, setModelImage] = useState(null);
  const [error, setError] = useState(false);
  const [isFrontImgeUpload, setIsFrontImageUpload] = useState(false);
  const [isBackImgeUpload, setIsBackImageUpload] = useState(false);
  const [isSideImgeUpload, setIsSideImageUpload] = useState(false);

  const [
    getGetUserBodyProfile,
    { loading: loadingGBP, data: { getBodyProfile } = {} },
  ] = useLazyQuery(GET_BODYPROFILE, {
    onCompleted({ getBodyProfile }) {},
  });

  const saveUserFrontImage = (file) => {
    var formData = new FormData();
    formData.append("frontImage", file);
    setIsFrontImageUpload(true);
    axios
      .post(
        `https://api3.myperfectfit.co.in:5679/v2/api/bodyProfile/images/frontImage/${user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setTimeout(function () {
          setIsFrontImageUpload(false);
          //setFrontPic(res.data.details.imageUrl);
          getGetUserBodyProfile({
            variables: {
              userId: user._id,
            },
            fetchPolicy: "network-only",
          });
        }, 5000);
      })
      .catch((error) => {
        setIsFrontImageUpload(false);
        alert("Something went to wrong please try again");
      });
  };
  const saveUserBackImage = (file) => {
    var formData = new FormData();
    formData.append("backImage", file);
    setIsBackImageUpload(true);
    axios
      .post(
        `https://api3.myperfectfit.co.in:5679/v2/api/bodyProfile/images/backImage/${user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setTimeout(function () {
          setIsBackImageUpload(false);
          // setBackPic(res.data.details.imageUrl);
          getGetUserBodyProfile({
            variables: {
              userId: user._id,
            },
            fetchPolicy: "network-only",
          });
        }, 5000);
      })
      .catch((error) => {
        setIsBackImageUpload(false);
        alert("Something went to wrong please try again");
      });
  };
  const saveUserSideImage = (file) => {
    var formData = new FormData();
    formData.append("sideImage", file);
    setIsSideImageUpload(true);
    axios
      .post(
        `https://api3.myperfectfit.co.in:5679/v2/api/bodyProfile/images/sideImage/${user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setTimeout(function () {
          setIsSideImageUpload(false);
          //setSidePic(res.data.details.imageUrl);
          getGetUserBodyProfile({
            variables: {
              userId: user._id,
            },
            fetchPolicy: "network-only",
          });
        }, 500);
      })
      .catch((error) => {
        console.log(error);
        setIsSideImageUpload(false);
        alert("Something went to wrong please try again");
      });
  };

  const [saveFrontPicture, { loading: loadingFP, data: dataSFP }] = useMutation(
    SAVE_FRONT_PICTURE,
    {
      onCompleted(data) {
        if (!_.isEmpty(data)) {
          const { saveBodyProfileFrontPicture } = data;
          setFrontPic(saveBodyProfileFrontPicture.imageUrl);
        }
      },
    }
  );

  const [saveSidePicture, { loading: loadingSP }] = useMutation(
    SAVE_SIDE_PICTURE,
    {
      onCompleted(data) {
        if (!_.isEmpty(data)) {
          const { saveBodyProfileSidePicture } = data;
          setSidePic(saveBodyProfileSidePicture.imageUrl);
        }
      },
    }
  );

  const [saveBackPicture, { loading: loadingBP }] = useMutation(
    SAVE_BACK_PICTURE,
    {
      onCompleted(data) {
        if (!_.isEmpty(data)) {
          const { saveBodyProfileBackPicture } = data;
          setBackPic(saveBodyProfileBackPicture.imageUrl);
        }
      },
    }
  );

  // Compress Image
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        500,
        400,
        "PNG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const dataURIToBlob = (dataURI) => {
    const splitDataURI = dataURI.split(",");
    const byteString =
      splitDataURI[0].indexOf("base64") >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(":")[1].split(";")[0];
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);
    return new Blob([ia], { type: mimeString });
  };

  const onChangeFrontPicture = async (imageList, addUpdateIndex) => {
    const file = imageList[0].file;
    const image = await resizeFile(file);
    const newFile = dataURIToBlob(image);
    saveUserFrontImage(file);
    // await saveFrontPicture({
    //   variables: {
    //     userId: user._id,
    //     picture: newFile,
    //   },
    //   fetchPolicy: "no-cache",
    // });
  };

  const onChangeSidePicture = async (imageList, addUpdateIndex) => {
    const file = imageList[0].file;
    const image = await resizeFile(file);
    const newFile = dataURIToBlob(image);
    saveUserSideImage(file);
    // await saveSidePicture({
    //   variables: {
    //     userId: user._id,
    //     picture: newFile,
    //   },
    // });
  };

  const onChangeBackPicture = async (imageList, addUpdateIndex) => {
    const file = imageList[0].file;
    const image = await resizeFile(file);
    const newFile = dataURIToBlob(image);
    saveUserBackImage(file);

    // await saveBackPicture({
    //   variables: {
    //     userId: user._id,
    //     picture: newFile,
    //   },
    // });
  };

  useEffect(async () => {
    if (!_.isEmpty(user)) {
      await getGetUserBodyProfile({
        variables: {
          userId: user._id,
        },
        fetchPolicy: "network-only",
      });
    }
  }, [user]);

  useEffect(() => {
    if (!_.isEmpty(getBodyProfile)) {
      if (!_.isEmpty(getBodyProfile[0])) {
        if (!_.isEmpty(getBodyProfile[0].frontPicture)) {
          setFrontPic(getBodyProfile[0].frontPicture);
        }
        if (!_.isEmpty(getBodyProfile[0].sidePicture)) {
          setSidePic(getBodyProfile[0].sidePicture);
        }
        if (!_.isEmpty(getBodyProfile[0].backPicture)) {
          setBackPic(getBodyProfile[0].backPicture);
        }
      }
    }
  }, [getBodyProfile, dataSFP]);

  // Handle Button

  const handleButton = () => {
    if (_.isEmpty(frontPic) || _.isEmpty(sidePic) || _.isEmpty(sidePic)) {
      setError(true);
    } else {
      setError(false);
      setViewAllImages(true);
      setOpenImage(true);
    }
  };

  return (
    <Grid
      classes={{ root: classes.imageUploadFormWrapper }}
      spacing={3}
      container
      item
    >
      {loadingGBP ? (
        <LoadingIndicator />
      ) : (
        <React.Fragment>
          <Grid item xs={12} md={4}>
            <ImageUpload
              onChange={onChangeFrontPicture}
              imgUrl={frontPic ? frontPic : "/images/front.jpg"}
              imgWidth={frontPic ? 150 : null}
              imgHeight={frontPic ? 150 : null}
              server={frontPic ? true : false}
              btnTitle="Upload Front Picture"
              id="front-picture-upload"
              loading={isFrontImgeUpload}
              imageTitle="Front Picture"
              error={frontPic ? false : true}
              onClickImage={() => {
                if (frontPic) {
                  setOpenImage(true);
                  setModelImage(frontPic);
                  setViewAllImages(false);
                }
              }}
              onDelete={() => setFrontPic(null)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <ImageUpload
              onChange={onChangeSidePicture}
              btnTitle="Upload Side Picture"
              id="side-picture-upload"
              imgUrl={sidePic ? sidePic : "/images/side.jpg"}
              imgWidth={sidePic ? 150 : null}
              imgHeight={sidePic ? 150 : null}
              server={sidePic ? true : false}
              onDelete={() => setSidePic(null)}
              loading={isSideImgeUpload}
              error={sidePic ? false : true}
              imageTitle="Side Picture"
              onClickImage={() => {
                if (sidePic) {
                  setOpenImage(true);
                  setModelImage(sidePic);
                  setViewAllImages(false);
                }
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <ImageUpload
              onChange={onChangeBackPicture}
              btnTitle="Upload Back Picture"
              id="back-picture-upload"
              imgUrl={backPic ? backPic : "/images/back.jpg"}
              imgWidth={backPic ? 150 : null}
              imgHeight={backPic ? 150 : null}
              server={backPic ? true : false}
              error={backPic ? false : true}
              onDelete={() => setBackPic(null)}
              loading={isBackImgeUpload}
              imageTitle="Back Picture"
              onClickImage={() => {
                if (backPic) {
                  setOpenImage(true);
                  setModelImage(backPic);
                  setViewAllImages(false);
                }
              }}
            />
          </Grid>
          {error && (
            <Grid item xs={12}>
              <FormHelperText className={classes.validationText}>
                Please fill in all the details before proceeding to the next
                step.
              </FormHelperText>
            </Grid>
          )}

          <Grid item xs={12}>
            <LoadingButton
              id="btn-proceed-measurments"
              btnTitle="View All Photos"
              color="primary"
              onClick={handleButton}
              btnClassName={classes.btnButton}
            ></LoadingButton>
          </Grid>
        </React.Fragment>
      )}
      <Dialog
        fullWidth={true}
        maxWidth={viewAllImages ? "md" : "xs"}
        open={openImg}
        onClose={() => setOpenImage(false)}
      >
        <DialogContent>
          {viewAllImages ? (
            <Box display="flex">
              <Box>
                <img width="80%" src={frontPic} className={classes.image} />
              </Box>
              <Box>
                <img width="80%" src={sidePic} className={classes.image} />
              </Box>
              <Box>
                <img width="80%" src={backPic} className={classes.image} />
              </Box>
            </Box>
          ) : (
            <div className={classes.modelImage}>
              <img width="75%" src={modelImage} className={classes.image} />
            </div>
          )}

          <div className={classes.modelCloseIcon}>
            <IconButton onClick={() => setOpenImage(false)}>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default UploadImagesForm;
