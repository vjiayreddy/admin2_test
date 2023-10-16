import React, { Fragment, FC, useEffect, useState, useRef } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import makeStyles from "@material-ui/styles/makeStyles";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { DialogModal } from "../../src/components/Ui/dialog/dialogModal";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ReactToPrint from "react-to-print";
import { NextPage } from "next";
import { useRouter } from "next/router";
import _ from "lodash";
// Apollo
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import {
  GET_ALL_DPFORMS,
  GET_USER_PERSONALIZEFORM,
  GENERATE_RECO_ATTRIBUTS,
  NOTIFY_GROOMING_EMAIL,
  GET_PERSONALIZE_SUMMARY,
} from "../../src/apollo/queries/styleclub";
import { GET_GENERATE_GROOMING_RECO } from "../../src/apollo/queries/grooming";
import { nonAuthenticated } from "../../src/apollo/hoc/withAuthRedirect";
import { personalized_form } from "../../src/utils/mockData";
//UI
import LoadingIndicatorComponent from "../../src/components/Ui/loading";
import UserLayoutComponent from "../../src/components/layouts/UserLayout";
//Styles

interface props {
  label?: string;
  onClickEdit: React.MouseEventHandler<HTMLLabelElement>;
  color?: "primary" | "secondary";
}
interface styleClubSummaryProps {
  summaryData: any;
  onClose: () => void;
  catId: string;
}

const useStyles = makeStyles(() => ({
  lableWithEditBox: {
    width: "100%",
    display: "flex",
    justifyItems: "center",
    justifyContent: "flex-start",
  },
  editButton: {
    margin: 0,
  },
  backButton: {
    padding: 0,
    margin: 0,
  },
  topSticyBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  btn: {
    marginRight: 20,
    marginLeft: 20,
  },
}));

const AccordionSummaryBox: FC<props> = ({ label, onClickEdit, color }) => {
  const classes = useStyles();
  return (
    <Box
      className={classes.lableWithEditBox}
      width="100%"
      display="flex"
      component="div"
    >
      <Box flexGrow={1}>
        <Typography>{label}</Typography>
      </Box>
      <Box>
        <FormControlLabel
          label=""
          control={
            <Button color={color} classes={{ root: classes.editButton }}>
              Edit
            </Button>
          }
          onClick={onClickEdit}
        />
      </Box>
    </Box>
  );
};

const StyleClubPage: NextPage = (props: any) => {
  const { session, user } = props;

  const router = useRouter();
  const componentRef = useRef();
  const [openDialogModal, setOpenDialogModal] = useState(false);
  const [summaryData, setSummaryData] = useState(null);
  const [expanded, setExpanded] = React.useState<number | boolean>(false);
  const { data: { getAllPersonalizeForms } = {} } = useQuery(GET_ALL_DPFORMS);
  const [
    getUserPersonalizeFormFilledSummary,
    { data: dataGUFF, loading: dataGUFFLoading },
  ] = useLazyQuery(GET_PERSONALIZE_SUMMARY);
  const { data: dataSummary } = useQuery(GET_USER_PERSONALIZEFORM, {
    variables: {
      Id: "60c2fa761ede7a3740f41775",
      userId: router.query.uid,
    },
    skip: _.isEmpty(router.query.uid),
  });

  const [
    generateGroomingRecommendedAttributes,
    { error: errorGRA, loading: loadingGRA },
  ] = useMutation(GET_GENERATE_GROOMING_RECO, {
    onError(error) {
      console.log(error);
    },
    onCompleted(res) {
      alert("Grooming Recomendations Generated Successfully");
    },
  });

  const [userInitiateGroomingRecommendationEmail, { loading: loadingGR }] =
    useMutation(NOTIFY_GROOMING_EMAIL, {
      onError(error) {},
      onCompleted() {
        alert("Successfully send email notification");
      },
    });
  const classes = useStyles();
  const [generateUserAttributes] = useMutation(GENERATE_RECO_ATTRIBUTS, {
    onCompleted() {
      alert("Recomendations Generated Successfully");
    },
  });

  useEffect(() => {
    setExpanded(Number(router.query.acconIndex));
  }, [router]);

  const handleAccordion = (index) => {
    router.push(
      `/styleclub?uid=${router.query.uid}&&acconIndex=${index}`,
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    getUserPersonalizeFormFilledSummary({
      variables: {
        userId: router.query.uid,
      },
    });
  }, []);

  useEffect(() => {
    if (!_.isEmpty(dataGUFF)) {
      let data = [];
      let options = [];
      personalized_form.screens.map((screen) => {
        screen.questions.map((question) => {
          const findQues = _.find(
            dataGUFF.getUserPersonalizeFormFilledSummary,
            (item) => item._id === question.questionId
          );
          if (findQues) {
            if (!_.isEmpty(findQues.value)) {
              options = [];
              findQues.value.map((val) => {
                const selectedAns = question.question.optionsData.filter(
                  (_item) => _item._id === val
                );
                if (findQues._id === question.questionId) {
                  if (
                    question.questionId === "60c75a6e1ede7a3740f4177f" ||
                    question.questionId === "62300d165417ab1e143a525d" ||
                    question.questionId === "62300dd95417ab1e143a525e" ||
                    question.questionId === "62300e095417ab1e143a525f"
                  ) {
                    options.push({ image: val, name: "", _id: "" });
                  } else {
                    options.push(...selectedAns);
                  }
                }
              });
              if (findQues) {
                data.push({
                  input: findQues.input,
                  options: options,
                });
              }
            }
          }
        });
      });
      setSummaryData(data);
    }
  }, [dataGUFF]);

  return (
    <UserLayoutComponent session={session} user={user}>
      <Fragment>
        {user.loading ? (
          <LoadingIndicatorComponent height={null} />
        ) : (
          <Fragment>
            {user.data ? (
              <Fragment>
                {!_.isEmpty(getAllPersonalizeForms) && (
                  <Fragment>
                    <Box p={2}>
                      <Button
                        className={classes.btn}
                        onClick={async () => {
                          await generateUserAttributes({
                            variables: {
                              userId: router.query.uid,
                            },
                          });
                        }}
                      >
                        Generate Recomendations
                      </Button>

                      <Button
                        className={classes.btn}
                        color="secondary"
                        disabled={loadingGRA}
                        onClick={async () => {
                          await generateGroomingRecommendedAttributes({
                            variables: {
                              userId: router.query.uid,
                            },
                          });
                        }}
                      >
                        Generate Grooming Recomendations
                      </Button>

                      <Button
                        disabled={loadingGR}
                        onClick={async () => {
                          await userInitiateGroomingRecommendationEmail({
                            variables: {
                              phone: user.data.phone,
                            },
                          });
                        }}
                      >
                        Notify Email
                      </Button>

                      <Button
                        className={classes.btn}
                        color="secondary"
                        // disabled={loadingGR}
                        onClick={async () => {
                          setOpenDialogModal(true);
                        }}
                      >
                        View Summary
                      </Button>
                    </Box>

                    {getAllPersonalizeForms.map((form, index) => (
                      <Accordion
                        expanded={index === expanded ? true : false}
                        onChange={() => handleAccordion(index)}
                        key={index}
                      >
                        <AccordionSummary>
                          <AccordionSummaryBox
                            label={form.label}
                            onClickEdit={(event) => {
                              event.stopPropagation();
                              router.push(
                                `/styleclub/personalization?uid=${router.query.uid}&&formId=${form._id}`
                              );
                            }}
                          />
                        </AccordionSummary>
                        <Box>
                          {form.screens.map((screen, index) => (
                            <Accordion key={index}>
                              <AccordionSummary>
                                <AccordionSummaryBox
                                  color="secondary"
                                  label={`Form - ${index + 1}`}
                                  onClickEdit={(event) => {
                                    router.push(
                                      `/styleclub/personalization?uid=${router.query.uid}&&formId=${form._id}&&formIndex=${index}`
                                    );
                                  }}
                                />
                              </AccordionSummary>
                              <Box>
                                {screen.questions.map((ques, index) => (
                                  <AccordionSummary key={index}>
                                    <Typography key={index}>
                                      {ques.input}
                                    </Typography>
                                  </AccordionSummary>
                                ))}
                              </Box>
                            </Accordion>
                          ))}
                        </Box>
                      </Accordion>
                    ))}
                  </Fragment>
                )}
              </Fragment>
            ) : (
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                Something went wrong ....
              </Box>
            )}
          </Fragment>
        )}
      </Fragment>

      <DialogModal
        maxWidth="lg"
        iconColor="white"
        open={openDialogModal}
        onCloseModel={() => {
          setOpenDialogModal(false);
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "white",
            paddingLeft: 30,
            paddingRight: 30,
            backgroundColor: "#31354C",
          }}
        >
          <Box>
            <ReactToPrint
              trigger={() => <Button style={{ marginRight: 10 }}>PRINT</Button>}
              content={() => componentRef.current}
            ></ReactToPrint>
          </Box>
        </div>

        <div
          ref={componentRef}
          style={{
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            padding: "15px",
          }}
        >
          <div style={{ flexGrow: 1 }}>
            <div className="styleFormTable" style={{ padding: 0 }}>
              {/* {!_.isEmpty(summaryData) && ( */}
              <Box mb={1}>
                <table>
                  <thead>
                    <tr>
                      <th>CusId</th>
                      <th>NAME</th>
                      <th>STYLIST</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                  <tr>
                    <td style={{ padding: 5, textAlign: "center" }}>
                      {user.data?.customerSrNo}
                    </td>
                    <td style={{ padding: 5, textAlign: "center" }}>
                      {user.data?.firstName} {user.data?.lastName}
                    </td>
                    <td style={{ padding: 5, textAlign: "center" }}>
                      {!_.isEmpty(user.data?.stylist) && (
                        <>{user.data.stylist[0]["name"]}</>
                      )}
                    </td>
                  </tr>
                </table>
              </Box>

              {/* )} */}
            </div>
          </div>
          {!_.isEmpty(summaryData) && (
            <div
              style={{ paddingLeft: 0, paddingRight: 0 }}
              className="orderTable"
              ref={componentRef}
            >
              <table className="table">
                {summaryData.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <Box>
                        <p style={{ fontSize: 14, margin: 0 }}>{item.input}</p>
                      </Box>
                      <Box style={{ display: "flex" }}>
                        {_.uniqBy(item.options, "_id").map((item, index) => (
                          <>
                            {!_.isEmpty(item.image) ? (
                              <Box
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  width: "90px",
                                  padding: "5px",
                                }}
                                key={index}
                              >
                                <img width="90%" src={item.image} />
                                <span style={{ textAlign: "center" }}>
                                  <b>{item.name}</b>
                                </span>
                              </Box>
                            ) : (
                              <span style={{ textAlign: "center" }}>
                                <b>{item.name} , </b>
                              </span>
                            )}
                          </>
                        ))}
                      </Box>
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          )}
        </div>
      </DialogModal>
    </UserLayoutComponent>
  );
};

export default nonAuthenticated({
  Component: StyleClubPage,
  baseUrl: "/styleclub",
});
