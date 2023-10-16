import React, { useState, useEffect, useRef } from "react";
import { makeStyles, Typography, Divider, Box, Grid } from "@material-ui/core";
import OrderTable from "../../src/components/Ui/tables/orderConfirm";
import { useRouter } from "next/router";
import OrderHeader from "../../src/components/forms/orderForm/orderHeader";
import ShareOrderHeader from "../../src/components/forms/orderForm/shareOrderHeader";
import ReactToPrint from "react-to-print";
import LoadingIndicatorComponent from "../../src/components/Ui/loading";
import AdminLayoutComponent from "../../src/components/layouts/AdminLayout";
import { nonAuthenticated } from "../../src/apollo/hoc/withAuthRedirect";
import { GET_SINGLE_STORE_ORDERBY_ID } from "../../src/apollo/queries/orders";
import { useLazyQuery } from "@apollo/client";

import _ from "lodash";

import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

//Share
import {
  EmailShareButton,
  WhatsappShareButton,
  EmailIcon,
  WhatsappIcon,
} from "react-share";

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

const OrderPdfForm = (props: any) => {
  const classes = useStyles();
  const [orderData, setOrderData] = useState(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const componentRef = useRef();
  const { session } = props;

  function getCurrentURL() {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
  }

  const [getUserStoreOrderById, { loading: loadingUSSO, data }] = useLazyQuery(
    GET_SINGLE_STORE_ORDERBY_ID,
    {
      onError(error) {
        alert("Something went wrong please try again");
      },
    }
  );

  useEffect(() => {
    if (!_.isEmpty(router.query)) {
      getUserStoreOrderById({
        variables: {
          orderId: router.query.id,
        },
      });
    }
  }, [router]);

  useEffect(() => {
    if (!_.isEmpty(data)) {
      const { getStoreOrderById } = data;
      if (!_.isEmpty(getStoreOrderById)) {
        setOrderData(getStoreOrderById);
      }
    }
  }, [data]);

  console.log(data);

  function WhatsAppButton(props) {
    const { orderData, router } = props;

    const handleClick = () => {
      const phoneNumber = orderData?.customerPhone;
      const countryCode = orderData?.customerCountryCode;
      const message = `Hello ${orderData?.customerFirstName},
    
    Thank you for the opportunity to serve you as our esteemed client. Please click the link below for your order copy and receipt:
    
    https://admin2.myperfectfit.co.in/viewOrder?id=${router?.query.id}
    
    For any queries or further discussion, you can connect with me.
    
    Thanks & Regards,
    ${orderData?.stylist[0].name}
    
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
      {loadingUSSO ? (
        <LoadingIndicatorComponent height={400} />
      ) : (
        <div>
          {orderData && (
            <React.Fragment>
              <ReactToPrint
                trigger={() => (
                  <ShareOrderHeader
                    btnTitle="Download"
                    onClick={() => {}}
                    title="View Order"
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
                    {orderData?.studioId === "61c55048429a4414e8755e69" && (
                      <img
                        className={classes.logoImage}
                        src="/logos/Groom2BLogo.png"
                      />
                    )}
                    {orderData?.studioId === "61d3ef5a2aa36c23004375ec" && (
                      <img
                        className={classes.logoImage}
                        src="/logos/mpf_dark.png"
                      />
                    )}
                    {orderData?.studioId === "61d3ef622aa36c23004375ed" && (
                      <img
                        className={classes.logoImage}
                        src="/logos/BlutailorLogo.png"
                      />
                    )}
                    {orderData?.studioId === "6502dd6bf765d205044dbdf8" && (
                      <img
                        className={classes.logoImage}
                        src="/logos/mpfstylelogo.png"
                      />
                    )}
                  </div>
                  <div className={classes.content}>
                    {orderData?.studioId === "61c55048429a4414e8755e69" && (
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
                    {orderData?.studioId === "61d3ef5a2aa36c23004375ec" && (
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

                    {orderData?.studioId === "61d3ef622aa36c23004375ed" && (
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

                

                    {orderData?.studioId === "6502dd6bf765d205044dbdf8" && (
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
                <div className={classes.orderTable}>
                  <Box mt={1} mb={2}>
                    <Typography align="center" variant="h6">
                      CUSTOMER ORDER FORM
                    </Typography>
                  </Box>
                  <OrderTable
                    data={orderData}
                    showsubmitbtn={false}
                    showEditBtn={false}
                    showEditPrnt={false}
                  />
                  <div className={classes.stylistBox}>
                    <div>
                      {!_.isEmpty(orderData.stylist) && (
                        <p>{orderData.stylist[0].name} (Personal Stylist)</p>
                      )}
                    </div>
                    <Box ml={1}>
                      <p>
                        {orderData.customerFirstName}
                        {orderData.customerLastName} (Customer)
                      </p>
                    </Box>
                  </div>
                  <Divider />
                  <Box mt={1} mb={2}>
                    <Typography align="left" variant="h6">
                      Terms and Conditions
                    </Typography>
                  </Box>
                  <Box mt={1} mb={2}>
                    <Typography
                      style={{ fontSize: "12px" }}
                      align="left"
                      variant="body1"
                      component="p"
                    >
                      1. On confirmation of order,the order cannot be cancelled
                      by the customer
                      <br />
                      2. Advance to be paid at the time of order confirmation,No
                      refund will be paid for the advance amounts.
                      <br />
                      3. Although we have all the fabrics available everyday,as
                      there are multiple orders happening simultaneously, there
                      is a change of stock out. In case the fabric is out of
                      stock, the customer can choose another fabric among the
                      available ones and the difference in the prices would be
                      paid/refunded. In case the customer doesn't like any
                      alternative, he can cancel only the unavailable product
                      from the order.
                      <br />
                      4. Goods once sold will not be taken back.
                      <br />
                      5. Alterations for the garments would be entertained only
                      upto 7 days from delivery of garments.
                      <br />
                      <b>
                        Bank Account
                        <br />
                      </b>
                      MPF Clothing Collections Private Limited, Acc.No:{" "}
                      <b>250201512016,</b>
                      IFSC CODE: <b>INDB0000320,</b>
                      Current account, Indusland Bank, Somajiguda branch,
                      Hyderabad.{" "}
                    </Typography>
                  </Box>
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
                <WhatsAppButton orderData={orderData} router={router} />

                <EmailShareButton
                  url=""
                  onClick={() => {
                    const emailBody =
                      encodeURIComponent(`Hello ${orderData?.customerFirstName},
    Thank you for the opportunity to serve you as our esteemed client. Please click the link below for your order copy and receipt:
    https://admin2.myperfectfit.co.in/viewOrder?id=${router?.query.id}
    
    For any queries or further discussion, you can follow the link below to connect with me:
    
    
    Thanks & Regards,

    ${orderData?.stylist[0].name}
    Personal Stylist 
    My Perfect Fit`);

                    window.location.href = `mailto:${orderData?.customerEmail}?subject=Order Receipt&body=${emailBody}`;
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

export default nonAuthenticated({
  Component: OrderPdfForm,
  baseUrl: "/orders",
});
