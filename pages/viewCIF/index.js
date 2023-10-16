import React, { useState, useEffect, useRef } from "react";
import { makeStyles, Typography, Divider, Box, Grid } from "@material-ui/core";
import ReactToPrint from "react-to-print";
import { useLazyQuery } from "@apollo/client";

import _ from "lodash";

import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { GET_SINGLE_CUSTOMER_INFO } from "../../src/apollo/queries/customerinfo";

//Share
import {
  EmailShareButton,
  WhatsappShareButton,
  EmailIcon,
  WhatsappIcon,
} from "react-share";
import { useRouter } from "next/router";
import AdminLayoutComponent from "../../src/components/layouts/AdminLayout";
import LoadingIndicatorComponent from "../../src/components/Ui/loading";
import ShareOrderHeader from "../../src/components/forms/orderForm/shareOrderHeader";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  printBody: {
    backgroundColor: "white",
  },
  printHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 20,
  },
  logoImage: {
    width: 280,

    [theme.breakpoints.down("xs")]: {
      width: 250,
      paddingRight: 30,
    },
    [theme.breakpoints.down("md")]: {
      width: 250,
      paddingRight: 30,
    },
  },
  span: {
    fontSize: 12,
    color: "#757575",
  },
  content: {
    width: 400,
  },
  address: {
    fontSize: 12,
  },
  orderTable: {
    padding: 20,
  },
  stylistBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  dialogPaper: {
    minwidth: 100,
    minHeight: 180,
    background: "#ffff",
  },
  dialogContainer: {
    height: "100%",
    position: "relative",
    paddingBottom: 20,
    paddingTop: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  dialogTitle: {
    fontSize: 15,
    fontWeight: 800,
    color: theme.palette.common.black,
    marginBottom: 15,
    fontFamily: "MPF_HEAVY",
  },
  dialogSubTitle: {
    fontSize: 14,
    marginBottom: 25,
    lineHeight: "22px",
  },
  dialogCloseIcon: {
    position: "absolute",
    top: 0,
    right: 0,
  },
}));

const ViewCIFPdfForm = (props) => {
  const classes = useStyles();
  const [cifInfo, setCifInfo] = useState(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const componentRef = useRef();
  const { session } = props;

  const [
    getSingleCustomerInformation,
    { loading: loadingGSCI, data: dataGSCI },
  ] = useLazyQuery(GET_SINGLE_CUSTOMER_INFO, {});

  useEffect(() => {
    if (router?.query?.id) {
      getSingleCustomerInformation({
        variables: {
          id: router?.query?.id,
        },
      });
    }
  }, [router]);

  useEffect(() => {
    if (dataGSCI) {
      let sourceCatId = {};
      let sourceSubCatId = {};
      let stylistId = {};
      const { getSingleCustomerInformation } = dataGSCI;
      if (getSingleCustomerInformation?.source?.length > 0) {
        sourceCatId = {
          name: getSingleCustomerInformation?.source[0].name,
          value: getSingleCustomerInformation?.source[0]._id,
        };
        if (getSingleCustomerInformation?.source[0].subCategory?.length > 0) {
          const findItem = _.find(
            getSingleCustomerInformation?.source[0].subCategory,
            (item) => item?._id === getSingleCustomerInformation?.sourceSubCatId
          );
          if (findItem) {
            sourceSubCatId = {
              name: findItem?.name,
              value: findItem?._id,
            };
          }
        }
      }
      if (getSingleCustomerInformation?.stylist?.length > 0) {
        stylistId = {
          name: getSingleCustomerInformation?.stylist[0]?.name,
          value: getSingleCustomerInformation?.stylist[0]?._id,
        };
      }

      const payload = {
        countryCode: getSingleCustomerInformation?.countryCode,
        formNo: getSingleCustomerInformation?.cifSerialNumber,
        firstName: getSingleCustomerInformation?.firstName,
        lastName: getSingleCustomerInformation?.lastName,
        phone: getSingleCustomerInformation?.phone,
        email: getSingleCustomerInformation?.email,
        studioId: getSingleCustomerInformation?.studioId,
        customerInfoStatus: getSingleCustomerInformation?.customerInfoStatus,
        eventType: getSingleCustomerInformation?.eventType,
        eventDate: getSingleCustomerInformation?.eventDate?.timestamp,
        createdDate: getSingleCustomerInformation?.createdDate?.timestamp,
        lookingFor: getSingleCustomerInformation?.lookingFor,
        note: getSingleCustomerInformation?.note,
        sourceCatId: sourceCatId,
        sourceSubCatId: sourceSubCatId,
        stylistId: stylistId,
        customerSerialNo: getSingleCustomerInformation?.customerSerialNo,
        occasionDetails: getSingleCustomerInformation?.occasionDetails,
      };
      setCifInfo(payload);
    }
  }, [dataGSCI]);

  function WhatsAppButton(props) {
    const { cifInfo, router } = props;

    const handleClick = () => {
      const phoneNumber = cifInfo?.phone;
      const countryCode = cifInfo?.countryCode;
      const message = `Hello Mr.${cifInfo?.firstName},
    
    Thank you for the opportunity to serve you . Please click the link below for your inquiry:
    
    https://admin2.myperfectfit.co.in/viewCIF?id=${router?.query.id}
    
    For any queries or further discussion, you can connect with me.
    
    Thanks & Regards,
    ${cifInfo?.stylistId.name}
    
    Personal Stylist
    My Perfect Fit`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${countryCode}${phoneNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl, "_blank");
    };

    return (
      <div onClick={handleClick}>
        <WhatsappShareButton url="">
          <WhatsappIcon size={50} round={true} />
        </WhatsappShareButton>
      </div>
    );
  }

  return (
    <AdminLayoutComponent session={session}>
      {loadingGSCI ? (
        <LoadingIndicatorComponent height={400} />
      ) : (
        <div>
          {cifInfo && (
            <React.Fragment>
              <ReactToPrint
                trigger={() => (
                  <ShareOrderHeader
                    btnTitle="Download"
                    onClick={() => {}}
                    title="View Customer Information Form"
                    btnTitle1="Share"
                    onClick1={() => setOpen(true)}
                  ></ShareOrderHeader>
                )}
                content={() => componentRef.current}
                bodyClass="printBody"
              ></ReactToPrint>

              <div className={classes.printBody} ref={componentRef}>
                <div className={classes.printHeader}>
                  <div>
                    {cifInfo?.studioId === "61c55048429a4414e8755e69" && (
                      <img
                        className={classes.logoImage}
                        src="/logos/Groom2BLogo.png"
                      />
                    )}
                    {cifInfo?.studioId === "61d3ef5a2aa36c23004375ec" && (
                      <img
                        className={classes.logoImage}
                        src="/logos/mpf_dark.png"
                      />
                    )}
                    {cifInfo?.studioId === "61d3ef622aa36c23004375ed" && (
                      <img
                        className={classes.logoImage}
                        src="/logos/BlutailorLogo.png"
                      />
                    )}
                    {cifInfo?.studioId === "6502dd6bf765d205044dbdf8" && (
                      <img
                        className={classes.logoImage}
                        src="/logos/mpfstylelogo.png"
                      />
                    )}
                  </div>
                  <div className={classes.content}>
                    {cifInfo?.studioId === "61c55048429a4414e8755e69" && (
                      <Typography variant="body2" component="p">
                        <b> GROOM2B (by My Perfect Fit) </b>
                        <span className={classes.span}></span>
                        <br /> <b>Address</b>:{" "}
                        <span className={classes.address}>
                          1st Floor, Plot No.1108,Road No:55, Opp.Peddammagudi
                          Entrance, CBI Colony, Jubliee Hills, Hyderabad,
                          Telangana, 500033.
                          <br />
                          call: +91 95151 00372 | Mail:reachgroom2b@gmail.com
                          <br />
                          Website:www.groom2b.in
                        </span>
                      </Typography>
                    )}
                    {cifInfo?.studioId === "61d3ef5a2aa36c23004375ec" && (
                      <>
                        <Typography variant="body2" component="p">
                          <b>My Perfect Fit, </b>
                          <span className={classes.span}>
                            MPF Clothing Collections, Pvt. Ltd
                          </span>
                          <br /> <b>Address</b>:{" "}
                          <span className={classes.address}>
                            1st Floor, Plot No.1108,Road No:55, Opp.Peddammagudi
                            Entrance, CBI Colony, Jubliee Hills, Hyderabad,
                            Telangana, 500033.
                            <br />
                            call: +91 80083 29992 |
                            Mail:reachus@myperfectfit.co.in
                            <br />
                            Website:www.myperfectfit.co.in
                          </span>
                        </Typography>
                      </>
                    )}

                    {cifInfo?.studioId === "61d3ef622aa36c23004375ed" && (
                      <Typography variant="body2" component="p">
                        <b>BLUTAILOR (by My Perfect Fit) </b>
                        <span className={classes.span}></span>
                        <br /> <b>Address</b>:{" "}
                        <span className={classes.address}>
                          1st Floor, Plot No.1108,Road No:55, Opp.Peddammagudi
                          Entrance, CBI Colony, Jubliee Hills, Hyderabad,
                          Telangana, 500033.
                          <br />
                          call: +91 99597 48025 | Mail:theblutailor@gmail.com
                          <br />
                          Website:www.blutailor.com
                        </span>
                      </Typography>
                    )}
                    {cifInfo?.studioId === "6502dd6bf765d205044dbdf8" && (
                      <Typography variant="body2" component="p">
                        <b>MPF Styleclub Fashtech Pvt Ltd , </b>
                        <br /> <b>Address</b>:{" "}
                        <span className={classes.address}>
                          1st Floor, Plot No.1108,Road No:55, Opp.Peddammagudi
                          Entrance, CBI Colony, Jubliee Hills, Hyderabad,
                          Telangana, 500033.
                          <br />
                          call: +91 9959032518 | Mail:mpfstyleclub@gmail.com
                          <br />
                          Website:www.mpfstyleclub.com
                        </span>
                      </Typography>
                    )}
                  </div>
                </div>
                <Divider />
                <Box mt={1} mb={2}>
                  <Typography align="center" variant="h6">
                    CUSTOMER INFORMATION FORM
                  </Typography>
                </Box>
                <Divider />

                <div className={classes.orderTable}>
                  <div className="orderTable">
                    <table className="table">
                      <tr>
                        <td className="cellSelect">Form No</td>
                        <td>{cifInfo?.formNo}</td>
                        <td className="cellSelect">CustomerId</td>
                        <td>{cifInfo?.customerSerialNo}</td>
                      </tr>
                      <tr>
                        <td className="cellSelect">First Name</td>
                        <td>{cifInfo?.firstName}</td>
                        <td className="cellSelect">Last Name</td>
                        <td>{cifInfo?.lastName}</td>
                      </tr>
                      <tr>
                        <td className="cellSelect">Mobile</td>
                        <td>
                          {`+${cifInfo?.countryCode}`}-{cifInfo?.phone}
                        </td>

                        <td className="cellSelect">Creation Date</td>
                        <td>
                          {cifInfo?.createdDate
                            ? moment(cifInfo?.createdDate).format("DD/MM/YYYY")
                            : "-"}
                        </td>
                      </tr>
                      <tr>
                        <td className="cellSelect">Event Date</td>
                        <td>
                          {moment(cifInfo?.eventDate).format("DD/MM/YYYY")}
                        </td>
                        <td className="cellSelect">Event Type</td>
                        <td>{cifInfo?.eventType}</td>
                      </tr>
                      <tr>
                        <td className="cellSelect">Event Looking For</td>
                        <td>{cifInfo?.lookingFor}</td>
                        <td className="cellSelect">Source (Main category)</td>
                        <td>{cifInfo?.sourceCatId?.name}</td>
                      </tr>
                      <tr>
                        <td className="cellSelect">Source (Sub category)</td>
                        <td>{cifInfo?.sourceSubCatId?.name}</td>
                        <td className="cellSelect">Stylist</td>
                        <td>{cifInfo?.stylistId?.name}</td>
                      </tr>
                      <tr>
                        <td className="cellSelect">Status</td>
                        <td>{cifInfo?.customerInfoStatus}</td>
                        <td className="cellSelect">Email</td>
                        <td>{cifInfo?.email}</td>
                      </tr>
                    </table>
                  </div>
                  <Box mt={1} mb={1}>
                    <Typography
                      style={{ fontSize: "16px", marginTop: 20 }}
                      align="center"
                      variant="h6"
                    >
                      OCCASION DETAILS
                    </Typography>
                  </Box>
                  <div className="orderTable">
                    <table className="table">
                      <tr>
                        <th className="cellSelect">Occasion</th>
                        <th className="cellSelect">Outfit Notes</th>
                        <th className="cellSelect">Ref Image</th>
                        <th className="cellSelect">Budget</th>
                        <th className="cellSelect">Price Quote</th>
                      </tr>
                      {cifInfo?.occasionDetails?.map((item) => (
                        <tr>
                          <td style={{ height: 50 }}>{item?.occasion}</td>
                          <td>{item?.outfitsNote}</td>
                          <td>
                            <img width={100} src={item?.refImage} />
                          </td>
                          <td>{item?.budget}</td>
                          <td>{item?.priceQuote}</td>
                        </tr>
                      ))}
                    </table>
                  </div>
                  <div className="orderTable" style={{ marginTop: 30 }}>
                    <table className="table">
                      <tr>
                        <td className="cellSelect">Stylist Notes</td>
                      </tr>
                      <tr>
                        <td style={{ padding: "10px" }}>{cifInfo?.note}</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      )}
      <Dialog classes={{ paper: classes.dialogPaper }} open={open}>
        <DialogContent className={classes.dialogContainer}>
          <Grid container>
            <Grid item xs={12}>
              <Typography align="center" className={classes.dialogTitle}>
                SHARE
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <WhatsAppButton cifInfo={cifInfo} router={router} />

                <EmailShareButton
                  url=""
                  onClick={() => {
                    const emailBody =
                      encodeURIComponent(`Hello Mr.${cifInfo?.firstName},
    Thank you for the opportunity to serve you as our esteemed client. Please click the link below for your order copy and receipt:
    https://admin2.myperfectfit.co.in/viewCIF?id=${router?.query.id}
    
    For any queries or further discussion, you can follow the link below to connect with me:
    
    
    Thanks & Regards,

    ${cifInfo?.stylistId.name}
    Personal Stylist 
    My Perfect Fit`);

                    window.location.href = `mailto:${cifInfo?.email}?subject=Customer Information &body=${emailBody}`;
                  }}
                >
                  <EmailIcon size={50} round={true} />
                </EmailShareButton>
              </Box>
            </Grid>
          </Grid>

          <div className={classes.dialogCloseIcon}>
            <IconButton
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon style={{ color: "black" }} />
            </IconButton>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayoutComponent>
  );
};

export default ViewCIFPdfForm;
