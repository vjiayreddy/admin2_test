import { useState, useEffect, Fragment } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import RadioGroup from "@material-ui/core/RadioGroup";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { GET_STYLING_CONFIG } from "../../../apollo/queries/orders";
import { useLazyQuery } from "@apollo/client";
import LoadingIndicatorComponent from "../../Ui/loading";
import Divider from "@material-ui/core/Divider";
import CustomImageRadioButton from "../../Ui/formFields/ImageRadioInput";
import { Button, Typography } from "@material-ui/core";
import _ from "lodash";
import { getImageUrl } from "../../../utils/utils";
import { makeStyles } from "@material-ui/styles";

interface props {
  catId: string;
  onSubmit: (data: any, note: string) => void;
  selectedFormData?: any;
  showSubmitButton?: boolean;
}

const useStyles = makeStyles((theme) => ({
  radioGroupTitle: {
    fontSize: 15,
    lineHeight: "17px",
    fontWeight: 900,
    marginTop: 30,
  },
}));

const StyleFormComponent: React.FC<props> = ({
  catId,
  onSubmit,
  selectedFormData,
  showSubmitButton = true,
}) => {


  console.log(selectedFormData);


  const { control, handleSubmit, reset, register } = useForm({});
  const classes = useStyles();
  const [formData, setFormData] = useState<any | null>(null);
  const [getOrderStylingConfig, { data, loading }] =
    useLazyQuery(GET_STYLING_CONFIG);
  useEffect(() => {
    getOrderStylingConfig({
      variables: {
        catId: catId,
      },
    });
  }, [catId]);

  useEffect(() => {
    if (data) {
      const { getStylingConfig } = data;
      if (getStylingConfig) {
        setFormData(getStylingConfig.attributes);
      }
    }
  }, [data]);

  useEffect(() => {
    if (!_.isEmpty(selectedFormData)) {
      if (!_.isEmpty(selectedFormData.styleDesign)) {
        let styleDesign = null;
        if (typeof selectedFormData.styleDesign === "string") {
          styleDesign = JSON.parse(selectedFormData.styleDesign);
        } else {
          styleDesign = selectedFormData.styleDesign;
        }

        let formObject = {};
        styleDesign.styleAttributes.map((item) => {
          formObject[item.master_name] = item.value;
        });
        formObject["note"] = styleDesign.note;
        reset(formObject);
      }
    }
  }, [selectedFormData]);

  const _onSubmit = (data) => {
    let finalPayload = [];
    for (const [key, value] of Object.entries(data)) {
      const _findOption = _.find(formData, (item) => item.masterName === key);
      if (!_.isEmpty(_findOption)) {
        const findSelectedOption = _.find(
          _findOption.options,
          (item) => item._id === value
        );
        if (!_.isEmpty(findSelectedOption)) {
          const payload = {
            master_name: key,
            value: value,
            catId: catId,
            name: findSelectedOption.name,
            image: findSelectedOption.image,
          };
          finalPayload.push(payload);
        }
      }
    }
    onSubmit(finalPayload, data.note);
  };

  return (
    <Box>
      {loading ? (
        <LoadingIndicatorComponent height={300} />
      ) : (
        <Fragment>
          {formData && (
            <Grid container>
              <Grid item xs={12}>
                <Box p={1}>
                  <Typography variant="h6">
                    ProductNo:{selectedFormData["itemNumber"]}
                  </Typography>
                </Box>
                <Divider />
                <Box p={2}>
                  <Grid container>
                    <Grid item sm={4} md={2} lg={2} xl={2}>
                      <img width={150} alt="shirt" src={getImageUrl(catId)} />
                    </Grid>
                    <Grid item sm={8} md={10} lg={10} xl={10}>
                      <textarea
                        ref={register({})}
                        name="note"
                        placeholder="Note"
                        rows={8}
                        cols={100}
                        style={{
                          width: "100%",
                          padding: "10px",
                          whiteSpace: "pre-line",
                          wordWrap: "break-word",
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Divider />
              {formData.map((_item, index) => (
                <Grid
                  style={{
                    paddingLeft: 10,
                    paddingTop: 10,
                    backgroundColor: index % 2 === 0 ? "#e3f2fd" : "#eeeeee",
                  }}
                  key={index}
                  item
                  xs={12}
                >
                  <label>{_item.label}</label>
                  <Controller
                    rules={{
                      required: {
                        value: false,
                        message: `Please select ${_item.label} type`,
                      },
                    }}
                    control={control}
                    name={_item.masterName}
                    as={
                      <RadioGroup row={true} aria-label={_item.masterName}>
                        {_item.options.map((item, index) => (
                          <CustomImageRadioButton
                            key={item._id}
                            height={75}
                            width={75}
                            value={item._id}
                            label={item.name}
                            src={item.image}
                            position={null}
                            percent={null}
                          />
                        ))}
                      </RadioGroup>
                    }
                  />
                  <Divider />
                </Grid>
              ))}
            </Grid>
          )}
          {showSubmitButton && (
            <Box p={2}>
              <Button onClick={handleSubmit(_onSubmit)}>Submit</Button>
            </Box>
          )}
        </Fragment>
      )}
    </Box>
  );
};

export default StyleFormComponent;
