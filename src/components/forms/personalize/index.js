import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  makeStyles,
  Typography,
  FormControlLabel,
  Checkbox,
  Box,
} from "@material-ui/core";
import clsx from "clsx";

import RadioGroup from "@material-ui/core/RadioGroup";
import CustomRadioGroup from "../../Ui/formFields/CustomRadioInput";
import CustomImageRadioGroup from "../../Ui/formFields/CustomImageRadioInput";
import { useForm, Controller } from "react-hook-form";
import TextInput from "../../Ui/formFields/TextInputField";
import _ from "lodash";
import ImageUpload from "../../Ui/upload";

// Apollo
import {
  SAVE_PERSONALIZE_FORM_DATA,
  GET_USER_PERSONALIZEFORM,
} from "../../../apollo/queries/styleclub";
import {
  SAVE_PROFILE_IMAGE,
  SAVE_MISC_PICTURE_1,
  SAVE_MISC_PICTURE_2,
  SAVE_MISC_PICTURE_3,
} from "../../../apollo/queries/user";
import { useMutation } from "@apollo/client";
// Service
import {
  handleMultiCheck,
  getFinalSelectedOptions,
  resizeFile,
  dataURIToBlob,
} from "../../../services/styleClub";

//Ui
import SectionHeader from "../../Ui/titles/sectionHeader";

const useStyles = makeStyles((theme) => ({
  mainContainerGrid: {
    minHeight: "85vh",
    //...theme.typography.gridContainer,
    paddingTop: 20,
    [theme.breakpoints.only("xs")]: {
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
    },
  },
  socialLinks: {
    // ...theme.typography.gridContainer,
    paddingTop: 20,
    paddingLeft: 200,
    paddingRight: 200,
  },
  backNavigarion: {
    position: "sticky",
    top: 70,
    width: "100%",
    backgroundColor: "#F5F7FA",
    paddingLeft: 10,
    paddingRight: 10,
    [theme.breakpoints.only("xs")]: {
      top: 69,
      zIndex: 9999,
    },
  },

  questionContainer: {
    // ...theme.typography.gridContainer,
    // paddingTop: 0,
    // paddingBottom: 0,
    // paddingBottom: 0,
    // paddingTop: 20,
  },
  defaultLayout: {
    //...theme.typography.gridContainer,
    paddingTop: 10,
    paddingBottom: 10,
    minHeight: 70,
    backgroundColor: "red",
  },
  footerSection: {
    [theme.breakpoints.only("xs")]: {
      position: "fixed",
      backgroundColor: "white",
    },
    bottom: 0,
    left: 0,
    zIndex: 1,
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
  },
  slectionRadioSection: {
    // marginTop: 29,
    marginBottom: 30,
    marginTop: 20,
    margin: "auto",
    [theme.breakpoints.only("xs")]: {
      width: "100%",
      marginBottom: 5,
      marginTop: 10,
    },
    //paddingBottom:100
  },
  errorLable: {
    fontSize: 12,
    lineHeight: "16px",
    color: theme.palette.error.main,
    marginTop: 10,
    marginBottom: 10,
  },
  radioGroupRow: {
    justifyContent: "center !important",
    alignItems: "center  !important",
  },
  linerPogressColorPrimary: {
    backgroundColor: "#E8ECF3",
  },
  badgePercentage: {
    fontSize: 12,
    lineHeight: "16px",
    fontWeight: 900,
    marginTop: 14,
    marginBottom: 30,
  },
  stickyEle: {},
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
  inputRoot: {
    height: 300,
    width: 600,
    marginTop: 20,
    [theme.breakpoints.only("xs")]: {
      width: 300,
    },
  },
  radioCheckBox: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  inputCheckBox: {
    height: 40,
    backgroundColor: `rgba(218,217,226,0.3)`,
    textAlign: "center",
    fontFamily: "MPF_HEAVY",
    margin: 0,
    paddingLeft: `16px !important`,
    paddingRight: `16px !important`,
    fontSize: 15,
    fontWeight: 500,
    lineHeight: "40px",
    width: "100%",
    color: theme.palette.secondary.main,
  },
  inputSelectedChecked: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
  },
  formLblRoot: {
    marginLeft: 0,
    marginRight: 0,
  },
  imageSelected: {
    border: `3px solid ${theme.palette.common.white}`,
    outline: `2px solid ${theme.palette.secondary.main}`,
    height: 200,
    width: 200,
    [theme.breakpoints.only("xs")]: {
      width: 152,
      height: 152,
    },
  },
  checkBoxImage: {
    height: 200,
    width: 200,
    [theme.breakpoints.only("xs")]: {
      width: 152,
      height: 152,
    },
  },
  sectionFitPreferGrid: {
    marginTop: 30,
    margin: "auto",
    width: "100%",
    [theme.breakpoints.only("xs")]: {
      width: "100%",
    },
  },
  formLblRoot: {
    marginLeft: 0,
    marginRight: 0,
  },
  formControlLabelRoot: {
    display: "flex",
    flexDirection: "column",
    margin: 0,
  },
  optionTitle: {
    fontSize: 16,
    marginTop: 10,
    lineHeight: "22px",
    fontFamily: "MPF_HEAVY",
    textAlign: "center",
    [theme.breakpoints.only("xs")]: {
      lineHeight: "20px",
      fontSize: 15,
    },
  },
  inputTroot: {
    width: 300,
  },
}));

const Form = ({ formData, userInfo, user }) => {
  const classes = useStyles();
  const [formIndex, setFormIndex] = React.useState(0);
  const [image, setImage] = useState("/images/no-user.png");
  const [misc1, setMisc1] = useState("/images/no-user.png");
  const [misc2, setMisc2] = useState("/images/no-user.png");
  const [misc3, setMisc3] = useState("/images/no-user.png");

  const { register, handleSubmit, errors, control, getValues } = useForm({
    defaultValues: {
      introduction_social: user.aboutMe,
    },
  });
  const [saveUserPersonalizeFormData, { loading: loadingUPF }] = useMutation(
    SAVE_PERSONALIZE_FORM_DATA,
    {
      onCompleted: () => {
        if (formIndex < formData.screens.length - 1) {
          alert("Data saved successfully");
          setFormIndex(formIndex + 1);
        } else {
          alert("Data saved successfully");
        }
      },
      refetchQueries: [
        {
          query: GET_USER_PERSONALIZEFORM,
          variables: {
            Id: userInfo.formId,
            userId: userInfo.userId,
            isEdit: true,
          },
        },
      ],
    }
  );

  const [saveUserProfilePicture, { loading: imgLoding }] = useMutation(
    SAVE_PROFILE_IMAGE,
    {
      onError(error) {
        alert("Profile Image Uploaded successfully");
      },
      onCompleted() {
        const { saveProfilePicture } = saveUserProfilePicture;
        setImage(saveProfilePicture.imageUrl);
        alert("Profile Image Uploaded successfully");
      },
    }
  );
  const [saveUserMiscPicture1, { loading: misc1Loading }] = useMutation(
    SAVE_MISC_PICTURE_1,
    {
      onError(error) {
        alert("Other Image 1 Uploaded successfully");
      },
      onCompleted() {
        const { saveMiscPicture1 } = saveUserMiscPicture1;
        setMisc1(saveMiscPicture1.imageUrl);
        alert("Profile Image Uploaded successfully");
      },
    }
  );
  const [saveUserMiscPicture2, { loading: misc2Loading }] = useMutation(
    SAVE_MISC_PICTURE_2,
    {
      onError(error) {
        alert("Other Image 2 Uploaded successfully");
      },
      onCompleted() {
        const { saveMiscPicture2 } = saveUserMiscPicture2;
        setMisc2(saveMiscPicture2.imageUrl);
        alert("Other Image 2 Uploaded successfully");
      },
    }
  );
  const [saveUserMiscPicture3, { loading: misc3Loading }] = useMutation(
    SAVE_MISC_PICTURE_3,
    {
      onError(error) {
        alert("Other Image 3 Uploaded successfully");
      },
      onCompleted() {
        const { saveMiscPicture3 } = saveUserMiscPicture3;
        setImage(saveMiscPicture3.imageUrl);
        alert("Other Image 3 Uploaded successfully");
      },
    }
  );

  const onChangeBodyProfilePicture = async (imageList, addUpdateIndex) => {
    const file = imageList[0].file;
    const image = await resizeFile(file);
    setImage(image);
    const newFile = dataURIToBlob(image);

    await saveUserProfilePicture({
      variables: {
        userId: user._id,
        picture: newFile,
      },
      fetchPolicy: "no-cache",
    });
  };
  const uploadMics1Image = async (imageList, addUpdateIndex) => {
    const file = imageList[0].file;
    const image = await resizeFile(file);
    setMisc1(image);
    const newFile = dataURIToBlob(image);

    await saveUserMiscPicture1({
      variables: {
        userId: user._id,
        picture: newFile,
      },
      fetchPolicy: "no-cache",
    });
  };
  const uploadMics2Image = async (imageList, addUpdateIndex) => {
    const file = imageList[0].file;
    const image = await resizeFile(file);
    setMisc2(image);
    const newFile = dataURIToBlob(image);

    await saveUserMiscPicture2({
      variables: {
        userId: user._id,
        picture: newFile,
      },
      fetchPolicy: "no-cache",
    });
  };
  const uploadMics3Image = async (imageList, addUpdateIndex) => {
    const file = imageList[0].file;
    const image = await resizeFile(file);
    setMisc3(image);
    const newFile = dataURIToBlob(image);

    await saveUserMiscPicture3({
      variables: {
        userId: user._id,
        picture: newFile,
      },
      fetchPolicy: "no-cache",
    });
  };

  const onSubmit = async (data) => {
    let dataKeys = [];
    for (let [key, value] of Object.entries(data)) {
      if (Array.isArray(value)) {
        value.map((itm) => {
          dataKeys.push({
            value: itm,
          });
        });
      } else {
        dataKeys.push({
          key: key,
          value: value,
        });
      }
    }

    if (dataKeys[0].key === "introduction_social") {
      await saveUserPersonalizeFormData({
        variables: {
          formData: {
            userId: userInfo.userId,
            formIds: [userInfo.formId, ...formData.dependencyFormIds],
            selections: [
              {
                master_name: "introduction_social",
                value: dataKeys[0].value,
                image: "",
                catId: "",
              },
            ],
          },
        },
      });
    } else {
      const options = getFinalSelectedOptions(data, formData);
      await saveUserPersonalizeFormData({
        variables: {
          formData: {
            userId: userInfo.userId,
            formIds: [userInfo.formId, ...formData.dependencyFormIds],
            selections: [...options],
          },
        },
      });
    }
  };

  useEffect(() => {
    if (!_.isEmpty(userInfo.qusIndex)) {
      const index = Number(userInfo.qusIndex);
      if (Number.isInteger(index)) {
        setFormIndex(index);
      }
    }
  }, [userInfo]);

  const handleBackButton = () => {
    if (formIndex === 0) {
      return;
    } else {
      setFormIndex(formIndex - 1);
    }
  };

  console.log(formData);
  return (
    <Grid container direction="column">
      {!_.isEmpty(formData) && (
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Box flexGrow={1}>
            <Button onClick={handleBackButton} variant="text">
              Back
            </Button>
          </Box>
          <Box>
            <Button color="secondary" variant="text">
              {formIndex}/{formData.screens.length - 1}
            </Button>
          </Box>
        </Box>
      )}
      <Grid
        item
        container
        xs={12}
        alignItems="center"
        justifyContent="center"
        classes={{ root: classes.questionContainer }}
      >
        <React.Fragment>
          {formData.screens.map((screen, index) => (
            <React.Fragment key={index}>
              {formIndex === index && (
                <React.Fragment>
                  {screen.questions.map((questions, index) => (
                    <React.Fragment key={index}>
                      <SectionHeader
                        optionTypeId={questions.question.optionTypeId}
                        title={questions.question.input}
                        toolTip={questions.question.infoHelpText}
                        subTitle={questions.question.description}
                      ></SectionHeader>
                      {(questions.question.optionTypeId ===
                        "60546863e0646e2994cfb7c0" ||
                        questions.question.optionTypeId ===
                          "60546863e0646e2994cfb7c2" ||
                        questions.question.optionTypeId ===
                          "60546863e0646e2994cfb7c1") && (
                        <React.Fragment>
                          {questions.question.isMultipleChoice ? (
                            <React.Fragment>
                              <Grid
                                item
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                                spacing={1}
                                xs={12}
                                classes={{
                                  root: classes.slectionRadioSection,
                                }}
                              >
                                <Controller
                                  rules={{
                                    required: true,
                                  }}
                                  name={questions.questionId}
                                  defaultValue={questions.question.value}
                                  render={(props) =>
                                    questions.question.optionsData.map(
                                      (option, index) => (
                                        <Grid item key={index}>
                                          <FormControlLabel
                                            classes={{
                                              root: classes.formControlLabelRoot,
                                              label: classes.optionTitle,
                                            }}
                                            control={
                                              <Checkbox
                                                onChange={() =>
                                                  props.onChange(
                                                    handleMultiCheck(
                                                      questions.questionId,
                                                      option._id,
                                                      getValues
                                                    )
                                                  )
                                                }
                                                defaultChecked={questions.question.value.includes(
                                                  option._id
                                                )}
                                                className={
                                                  classes.radioCheckBox
                                                }
                                                checkedIcon={
                                                  <div
                                                    className={clsx(
                                                      classes.inputCheckBox,
                                                      classes.inputSelectedChecked
                                                    )}
                                                  >
                                                    {option.name}
                                                  </div>
                                                }
                                                icon={
                                                  <div
                                                    className={
                                                      classes.inputCheckBox
                                                    }
                                                  >
                                                    {option.name}
                                                  </div>
                                                }
                                                inputProps={{
                                                  "aria-label":
                                                    "decorative checkbox",
                                                }}
                                                value={option._id}
                                              />
                                            }
                                            key={option._id}
                                          />
                                        </Grid>
                                      )
                                    )
                                  }
                                  control={control}
                                />
                              </Grid>
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              <Grid
                                item
                                xs={12}
                                classes={{
                                  root: classes.slectionRadioSection,
                                }}
                              >
                                <Controller
                                  rules={{ required: true }}
                                  control={control}
                                  name={questions.questionId}
                                  defaultValue={questions.question.value[0]}
                                  as={
                                    <RadioGroup
                                      classes={{ row: classes.radioGroupRow }}
                                      row={true}
                                    >
                                      <CustomRadioGroup
                                        master_name={
                                          questions.question.master_name
                                        }
                                        data={questions.question.optionsData}
                                      />
                                    </RadioGroup>
                                  }
                                ></Controller>
                              </Grid>
                            </React.Fragment>
                          )}
                        </React.Fragment>
                      )}

                      {questions.question.optionTypeId ===
                        "60546863e0646e2994cfb7bf" && (
                        <React.Fragment>
                          {questions.question.isMultipleChoice ? (
                            <React.Fragment>
                              <Grid
                                item
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                                spacing={2}
                                style={{
                                  width:
                                    questions.question.optionsData.length <= 6
                                      ? 660
                                      : 1100,
                                }}
                                classes={{
                                  root: classes.slectionRadioSection,
                                }}
                              >
                                <Controller
                                  rules={{
                                    required: true,
                                  }}
                                  name={questions.questionId}
                                  defaultValue={questions.question.value}
                                  render={(props) =>
                                    questions.question.optionsData.map(
                                      (option, index) => (
                                        <Grid
                                          key={index}
                                          item
                                          xs={6}
                                          md={
                                            questions.question.optionsData
                                              .length <= 6
                                              ? 4
                                              : 3
                                          }
                                          container
                                          justify="center"
                                          alignItems="center"
                                        >
                                          <FormControlLabel
                                            classes={{
                                              root: classes.formControlLabelRoot,
                                              label: classes.optionTitle,
                                            }}
                                            control={
                                              <Checkbox
                                                onChange={() =>
                                                  props.onChange(
                                                    handleMultiCheck(
                                                      questions.questionId,
                                                      option._id,
                                                      getValues
                                                    )
                                                  )
                                                }
                                                defaultChecked={questions.question.value.includes(
                                                  option._id
                                                )}
                                                className={
                                                  classes.radioCheckBox
                                                }
                                                checkedIcon={
                                                  <div>
                                                    <img
                                                      className={
                                                        classes.imageSelected
                                                      }
                                                      src={
                                                        !_.isEmpty(option.image)
                                                          ? option.image
                                                          : "/icons/noimage.png"
                                                      }
                                                    ></img>
                                                  </div>
                                                }
                                                icon={
                                                  <img
                                                    src={
                                                      !_.isEmpty(option.image)
                                                        ? option.image
                                                        : "/icons/noimage.png"
                                                    }
                                                    className={
                                                      classes.checkBoxImage
                                                    }
                                                  ></img>
                                                }
                                                inputProps={{
                                                  "aria-label":
                                                    "decorative checkbox",
                                                }}
                                                value={option._id}
                                              />
                                            }
                                            key={option._id}
                                            label={option.name}
                                          />
                                        </Grid>
                                      )
                                    )
                                  }
                                  control={control}
                                />
                              </Grid>
                            </React.Fragment>
                          ) : (
                            <Grid
                              item
                              xs={12}
                              alignItems="center"
                              justifyContent="center"
                              classes={{ root: classes.slectionRadioSection }}
                            >
                              <Controller
                                rules={{ required: true }}
                                control={control}
                                name={questions.questionId}
                                defaultValue={questions.question.value[0]}
                                as={
                                  <RadioGroup
                                    classes={{ row: classes.radioGroupRow }}
                                  >
                                    <CustomImageRadioGroup
                                      width={
                                        questions.question.optionsData.length <=
                                        6
                                          ? 660
                                          : 1100
                                      }
                                      md={
                                        questions.question.optionsData.length <=
                                        6
                                          ? 4
                                          : 3
                                      }
                                      masterName={
                                        questions.question.master_name
                                      }
                                      data={questions.question.optionsData}
                                    />
                                  </RadioGroup>
                                }
                              ></Controller>
                            </Grid>
                          )}
                        </React.Fragment>
                      )}

                      {questions.question.optionTypeId ===
                        "608d388c2831161efcb9a6f5" &&
                        questions.question.master_name ===
                          "saveProfilePicture" && (
                          <React.Fragment>
                            <Grid
                              item
                              container
                              alignItems="center"
                              justify="center"
                              xs={12}
                              style={{ marginBottom: 20 }}
                            >
                              <Box>
                                <ImageUpload
                                  onChange={onChangeBodyProfilePicture}
                                  imgUrl={
                                    !_.isEmpty(user)
                                      ? !_.isEmpty(user.images?.profile)
                                        ? user.images?.profile
                                        : image
                                      : image
                                  }
                                  imgWidth={150}
                                  imgHeight={150}
                                  btnTitle="Upload Profile Picture"
                                  id="front-picture-upload"
                                  loading={imgLoding}
                                  //error={frontPic ? false : true}
                                  onDelete={() => {}}
                                />
                              </Box>
                            </Grid>
                          </React.Fragment>
                        )}

                      {questions.question.optionTypeId ===
                        "608d388c2831161efcb9a6f5" &&
                        questions.question.master_name ===
                          "saveMiscPicture1" && (
                          <React.Fragment>
                            <Grid
                              item
                              container
                              alignItems="center"
                              justify="center"
                              xs={12}
                              style={{ marginBottom: 20 }}
                            >
                              <Box>
                                <ImageUpload
                                  onChange={uploadMics1Image}
                                  imgUrl={
                                    !_.isEmpty(questions.question.value)
                                      ? questions.question.value[0]
                                      : misc1
                                  }
                                  imgWidth={150}
                                  imgHeight={150}
                                  btnTitle="Upload"
                                  loading={misc1Loading}
                                  //error={frontPic ? false : true}
                                  onDelete={() => {}}
                                />
                              </Box>
                            </Grid>
                          </React.Fragment>
                        )}
                      {questions.question.optionTypeId ===
                        "608d388c2831161efcb9a6f5" &&
                        questions.question.master_name ===
                          "saveMiscPicture2" && (
                          <React.Fragment>
                            <Grid
                              item
                              container
                              alignItems="center"
                              justify="center"
                              xs={12}
                              style={{ marginBottom: 20 }}
                            >
                              <Box>
                                <ImageUpload
                                  onChange={uploadMics2Image}
                                  imgUrl={
                                    !_.isEmpty(questions.question.value)
                                      ? questions.question.value[0]
                                      : misc2
                                  }
                                  imgWidth={150}
                                  imgHeight={150}
                                  btnTitle="Upload"
                                  loading={misc2Loading}
                                  onDelete={() => {}}
                                />
                              </Box>
                            </Grid>
                          </React.Fragment>
                        )}
                      {questions.question.optionTypeId ===
                        "608d388c2831161efcb9a6f5" &&
                        questions.question.master_name ===
                          "saveMiscPicture3" && (
                          <React.Fragment>
                            <Grid
                              item
                              container
                              alignItems="center"
                              justify="center"
                              xs={12}
                              style={{ marginBottom: 20 }}
                            >
                              <Box>
                                <ImageUpload
                                  onChange={uploadMics3Image}
                                  imgUrl={
                                    !_.isEmpty(questions.question.value)
                                      ? questions.question.value[0]
                                      : misc3
                                  }
                                  imgWidth={150}
                                  imgHeight={150}
                                  btnTitle="Upload"
                                  loading={misc3Loading}
                                  onDelete={() => {}}
                                />
                              </Box>
                            </Grid>
                          </React.Fragment>
                        )}

                      {questions.question.optionTypeId ===
                        "60546863e0646e2994cfb7c3" && (
                        <React.Fragment>
                          <Grid
                            item
                            xs={12}
                            style={{
                              marginBottom: 50,
                              textAlign: "center",
                            }}
                          >
                            <TextInput
                              inputRef={register({
                                required: {
                                  value: true,
                                },
                              })}
                              id="description"
                              name="introduction_social"
                              multiline={20}
                              placeholder="Write about yourself..."
                              className={classes.inputRoot}
                            />
                          </Grid>
                        </React.Fragment>
                      )}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              )}
            </React.Fragment>
          ))}
        </React.Fragment>
      </Grid>
      <Grid
        item
        xs={12}
        container
        justify="center"
        alignItems="center"
        direction="column"
        classes={{ root: classes.footerSection }}
      >
        {!_.isEmpty(errors) && (
          <Grid item xs={12}>
            <Typography
              variant="h3"
              component="p"
              classes={{ root: classes.errorLable }}
            >
              Please fill all the details before proceeding to the next step.
            </Typography>
          </Grid>
        )}

        <Grid item>
          <Button
            disableElevation
            color="primary"
            isabled={loadingUPF}
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            {formIndex === formData.screens.length - 1 ? "Submit" : "Next"}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Form;
