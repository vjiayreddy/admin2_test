<TableContainer>
  <Table size="medium">
    <TableHead
      style={{
        backgroundColor: "cornsilk",
        borderTop: "1px solid gainsboro",
      }}
    >
      <TableRow>
        {initialConfig.data.tableRows.map((item, index) => (
          <TableCell style={{ paddingLeft: 10 }} key={index}>
            {item}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  </Table>
  <TableBody>
    {fields.map((item, index) => (
      <TableRow key={item.id}>
        <TableCell classes={{ root: classes.tableCellRoot }}>
          <Controller
            control={control}
            name={`orderItems[${index}].itemName`}
            defaultValue={`${item.itemName}`}
            render={(props) => (
              <SelectDropDown
                disabled={checkIsImagesUpload(item)}
                value={props.value}
                className={checkError(errors, `orderItems[${index}].itemName`)}
                options={storeProducts}
                onChange={(e) => {
                  props.onChange(e.target.value);
                  handleChangeOrderItemField(
                    "itemName",
                    e.target.value,
                    index,
                    getValues("customerPhone")
                  );
                  reset(updateProductNumber(getValues("customerPhone")));
                }}
              />
            )}
          />
        </TableCell>
        <TableCell classes={{ root: classes.tableCellRoot }}>
          <TextInputField
            inputRef={register({
              required: true,
            })}
            name={`orderItems[${index}].itemNumber`}
            value={item.itemNumber}
            readOnly
            className={checkError(errors, `orderItems[${index}].itemNumber`)}
            onBlur={(e) => {
              handleChangeOrderItemField(
                "itemNumber",
                e.target.value,
                index,
                getValues("customerPhone")
              );
            }}
          ></TextInputField>
        </TableCell>
        <TableCell classes={{ root: classes.tableCellRoot }}>
          <Controller
            defaultValue={`orderItems[${index}].itemColor`}
            render={(props) => (
              <Autocomplete
                {...props}
                options={colors}
                style={{ width: 150 }}
                className={checkError(errors, `orderItems[${index}].itemColor`)}
                placeholder="Select Color"
                getOptionLabel={(option) => option.color || option}
                renderOption={(option) => <span>{option.color}</span>}
                renderInput={(params) => <TextField {...params} />}
                onChange={(_, data) => {
                  props.onChange({
                    colorname: data.color,
                    color: data.color,
                  });
                  handleChangeOrderItemField(
                    "itemColor",
                    {
                      colorname: data.color,
                      color: data.color,
                    },
                    index,
                    getValues("customerPhone")
                  );
                }}
              />
            )}
            name={`orderItems[${index}].itemColor`}
            control={control}
            rules={{
              required: true,
            }}
          />
        </TableCell>
        <TableCell classes={{ root: classes.tableCellRoot }}>
          <TextInputField
            name={`orderItems[${index}].fabricCode`}
            defaultValue={!_.isEmpty(item.fabricCode) ? item.fabricCode : ""}
            inputRef={register({
              required: true,
            })}
            className={checkError(errors, `orderItems[${index}].fabricCode`)}
            id="fabric-code-input"
            placeholder="Fabric Code"
            onChange={(e) => {
              handleChangeOrderItemField(
                "fabricCode",
                e.target.value,
                index,
                getValues("customerPhone")
              );
            }}
          />
        </TableCell>

        <TableCell classes={{ root: classes.tableCellRoot }}>
          <Button
            className={classes.btnClass}
            variant="outlined"
            size="small"
            onClick={() => {
              const phone = getValues("customerPhone");
              const orderItem = getItemByIndex(index, phone);
              if (!_.isEmpty(orderItem) && !_.isEmpty(orderItem.itemNumber)) {
                setOrderIndex(index);
                setSelectedItem(orderItem);
                setFabricImage(orderItem.fabricImage);
                setIsUploadFabricImage(true);
              } else {
                alert("Please select product number");
              }
            }}
          >
            {_.has(item, "fabricImage")
              ? !_.isEmpty(item.fabricImage)
                ? "View"
                : "Upload"
              : " Upload"}
          </Button>
        </TableCell>
        <TableCell classes={{ root: classes.tableCellRoot }}>
          <Button
            className={classes.btnClass}
            variant="outlined"
            size="small"
            onClick={() => {
              const phone = getValues("customerPhone");
              const orderItem = getItemByIndex(index, phone);
              if (!_.isEmpty(orderItem) && !_.isEmpty(orderItem.itemNumber)) {
                setOrderIndex(index);
                setSelectedItem(orderItem);
                setReferenceImage(orderItem.referenceImage);
                setIsUploadRefImage(true);
              } else {
                alert("Please select product number");
              }
            }}
          >
            {_.has(item, "referenceImage")
              ? !_.isEmpty(item.referenceImage)
                ? "View"
                : "Upload"
              : " Upload"}
          </Button>
        </TableCell>
        <TableCell classes={{ root: classes.tableCellRoot }}>
          <Button
            className={classes.btnClass}
            variant="outlined"
            size="small"
            onClick={() => {
              const getOrder = getSingleOrderByMobile(
                getValues("customerPhone")
              );

              if (_.has(getOrder, "orderNo")) {
                const orderItem = getItemByIndex(
                  index,
                  getValues("customerPhone")
                );
                if (!_.isEmpty(orderItem)) {
                  setOrderIndex(index);
                  setSelectedItem(orderItem);
                  setDesignerImage(
                    _.has(orderItem, "styleDesignImage")
                      ? orderItem.styleDesignImage
                      : null
                  );
                  setIsUploadDesignerImage(true);
                }
              }
            }}
          >
            {_.has(item, "styleDesignImage")
              ? !_.isEmpty(item.styleDesignImage)
                ? "View"
                : "Upload"
              : " Upload"}
          </Button>
        </TableCell>

        <TableCell classes={{ root: classes.tableCellRoot }}>
          <Controller
            name={`orderItems[${index}].trialDate`}
            control={control}
            rules={{
              required: true,
            }}
            setValue={setValue}
            defaultValue={item.trialDate}
            render={({ value, name }) => (
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  invalidLabel=""
                  clearable
                  className={checkError(
                    errors,
                    `orderItems[${index}].trialDate`
                  )}
                  onChange={(date) => {
                    setValue(name, date);
                    handleChangeOrderItemField(
                      "trialDate",
                      date,
                      index,
                      getValues("customerPhone")
                    );
                  }}
                  format="DD/MM/YYYY"
                  keyboardIcon={<EventIcon classes={{ root: classes.icon }} />}
                  value={value}
                />
              </MuiPickersUtilsProvider>
            )}
          ></Controller>
        </TableCell>

        <TableCell classes={{ root: classes.tableCellRoot }}>
          <TextInputField
            type="number"
            name={`orderItems[${index}].itemPrice`}
            defaultValue={item.itemPrice}
            className={checkError(errors, `orderItems[${index}].itemPrice`)}
            inputRef={register({
              required: true,
            })}
            id="fabric-code-input"
            placeholder="Price"
            onChange={(e) => {
              handleChangeOrderItemField(
                "itemPrice",
                e.target.value,
                index,
                getValues("customerPhone")
              );
              orderCalculation(getValues("customerPhone"), setValue);
            }}
          />
        </TableCell>
        <TableCell classes={{ root: classes.tableActionButtons }}>
          {index !== 0 && (
            <IconButton
              onClick={() => {
                remove(index);
                removeOrderItem(index, getValues("customerPhone"));
                orderCalculation(getValues("customerPhone"), setValue);
              }}
              size="small"
            >
              <DeleteIcon style={{ color: "crimson" }} />
            </IconButton>
          )}
          <IconButton
            onClick={() => {
              const appendValue = {
                itemName: "full_shirt",
                itemPrice: 0,
                itemNumber: "",
                fabricCode: "",
                trialDate: getValues("trialDate"),
              };
              append(appendValue);
              handleAddOrderFormItem(getValues("customerPhone"), appendValue);
              reset(updateProductNumber(getValues("customerPhone")));
            }}
            size="small"
          >
            <AddBoxIcon style={{ color: "cadetblue" }} />
          </IconButton>
        </TableCell>
      </TableRow>
    ))}
    <TableRow style={{ backgroundColor: "cornsilk" }}>
      <TableCell
        style={{ paddingTop: 5, paddingBottom: 5 }}
        colSpan={4}
      ></TableCell>
      <TableCell colSpan={2} style={{ paddingTop: 5, paddingBottom: 5 }}>
        Total
      </TableCell>
      <TableCell
        colSpan={2}
        style={{ paddingTop: 5, paddingBottom: 5 }}
      ></TableCell>
      <TableCell
        colSpan={2}
        style={{
          paddingTop: 5,
          paddingBottom: 5,
          paddingLeft: 5,
        }}
      >
        <Box display="flex" alignItems="center">
          <Box>
            <span style={{ fontWeight: "bold" }}> र</span>
          </Box>
          <Box>
            <TextInputField
              type="number"
              name="orderTotal"
              readOnly={true}
              defaultValue={0}
              inputRef={register()}
              style={{
                backgroundColor: "transparent",
                border: "none",
                paddingTop: 0,
                paddingBottom: 0,
                height: "auto",
                fontWeight: "bold",
              }}
            />
          </Box>
        </Box>
      </TableCell>
    </TableRow>

    <TableRow style={{ backgroundColor: "cornsilk" }}>
      <TableCell
        style={{ paddingTop: 5, paddingBottom: 5 }}
        colSpan={4}
      ></TableCell>
      <TableCell colSpan={2} style={{ paddingTop: 5, paddingBottom: 5 }}>
        Other Charges
      </TableCell>
      <TableCell colSpan={2} style={{ paddingTop: 5, paddingBottom: 5 }}>
        <Button
          onClick={() => {
            const getOrder = getSingleOrderByMobile(getValues("customerPhone"));
            if (!_.isEmpty(getOrder)) {
              if (getOrder.orderNo && getOrder.orderTotal > 0) {
                setIsOtherCharges(true);
              }
            }
          }}
        >
          View/Add
        </Button>
      </TableCell>
      <TableCell
        colSpan={2}
        style={{
          paddingTop: 5,
          paddingBottom: 5,
          paddingLeft: 5,
        }}
      >
        <Box display="flex" alignItems="center">
          <Box>
            <TextInputField
              type="number"
              name="otherCharges"
              readOnly={true}
              defaultValue={0}
              inputRef={register()}
            />
          </Box>
        </Box>
      </TableCell>
    </TableRow>

    <TableRow style={{ backgroundColor: "cornsilk" }}>
      <TableCell
        style={{ paddingTop: 5, paddingBottom: 5 }}
        colSpan={4}
      ></TableCell>
      <TableCell colSpan={2} style={{ paddingTop: 5, paddingBottom: 5 }}>
        Grand Total
      </TableCell>
      <TableCell
        colSpan={2}
        style={{ paddingTop: 5, paddingBottom: 5 }}
      ></TableCell>
      <TableCell
        colSpan={2}
        style={{
          paddingTop: 5,
          paddingBottom: 5,
          paddingLeft: 5,
        }}
      >
        <Box display="flex" alignItems="center">
          <Box>
            <span style={{ fontWeight: "bold" }}> र</span>
          </Box>
          <Box>
            <TextInputField
              type="number"
              name="afterChargesTotal"
              readOnly={true}
              defaultValue={0}
              inputRef={register()}
              style={{
                backgroundColor: "transparent",
                border: "none",
                paddingTop: 0,
                paddingBottom: 0,
                height: "auto",
                fontWeight: "bold",
              }}
            />
          </Box>
        </Box>
      </TableCell>
    </TableRow>

    <TableRow style={{ backgroundColor: "cornsilk" }}>
      <TableCell
        style={{ paddingTop: 5, paddingBottom: 5 }}
        colSpan={4}
      ></TableCell>
      <TableCell colSpan={2} style={{ paddingTop: 5, paddingBottom: 5 }}>
        Deductions
      </TableCell>
      <TableCell colSpan={2} style={{ paddingTop: 5, paddingBottom: 5 }}>
        <Button
          onClick={() => {
            const getOrder = getSingleOrderByMobile(getValues("customerPhone"));
            if (!_.isEmpty(getOrder)) {
              if (getOrder.orderNo && getOrder.orderTotal > 0) {
                setIsDeductionsPayment(true);
              }
            }
          }}
        >
          View/Add
        </Button>
      </TableCell>
      <TableCell
        colSpan={2}
        style={{
          paddingTop: 5,
          paddingBottom: 5,
          paddingLeft: 5,
        }}
      >
        <TextInputField
          type="number"
          name="deductions"
          readOnly={true}
          defaultValue={0}
          inputRef={register()}
        />
      </TableCell>
    </TableRow>

    <TableRow style={{ backgroundColor: "cornsilk" }}>
      <TableCell
        style={{ paddingTop: 5, paddingBottom: 5 }}
        colSpan={4}
      ></TableCell>
      <TableCell colSpan={2} style={{ paddingTop: 5, paddingBottom: 5 }}>
        Net Amount
      </TableCell>
      <TableCell
        colSpan={2}
        style={{ paddingTop: 5, paddingBottom: 5 }}
      ></TableCell>
      <TableCell
        colSpan={2}
        style={{
          paddingTop: 5,
          paddingBottom: 5,
          paddingLeft: 5,
        }}
      >
        <Box display="flex" alignItems="center">
          <Box>
            <span style={{ fontWeight: "bold" }}> र</span>
          </Box>
          <Box>
            <TextInputField
              type="number"
              name="afterDeductionsTotal"
              readOnly={true}
              defaultValue={0}
              inputRef={register()}
              style={{
                backgroundColor: "transparent",
                border: "none",
                paddingTop: 0,
                paddingBottom: 0,
                height: "auto",
                fontWeight: "bold",
              }}
            />
          </Box>
        </Box>
      </TableCell>
    </TableRow>
    <TableRow style={{ backgroundColor: "cornsilk" }}>
      <TableCell
        style={{ paddingTop: 5, paddingBottom: 5 }}
        colSpan={4}
      ></TableCell>
      <TableCell colSpan={2} style={{ paddingTop: 5, paddingBottom: 5 }}>
        Advance payment
      </TableCell>
      <TableCell colSpan={2} style={{ paddingTop: 5, paddingBottom: 5 }}>
        <Button
          onClick={() => {
            const getOrder = getSingleOrderByMobile(getValues("customerPhone"));
            if (!_.isEmpty(getOrder)) {
              if (getOrder.orderNo) {
                setIsAdvancePayment(true);
              }
            }
          }}
        >
          View/Add
        </Button>
      </TableCell>
      <TableCell
        colSpan={2}
        style={{
          paddingTop: 5,
          paddingBottom: 5,
          paddingLeft: 5,
        }}
      >
        <Box display="flex" alignItems="center">
          <Box>
            <span style={{ fontWeight: "bold" }}> र</span>
          </Box>
          <Box>
            <TextInputField
              type="number"
              name="paymentBreakdownTotal"
              readOnly={true}
              defaultValue={0}
              inputRef={register()}
              style={{
                backgroundColor: "transparent",
                border: "none",
                paddingTop: 0,
                paddingBottom: 0,
                height: "auto",
                fontWeight: "bold",
              }}
            />
          </Box>
        </Box>
      </TableCell>
    </TableRow>
    <TableRow style={{ backgroundColor: "cornsilk" }}>
      <TableCell
        style={{ paddingTop: 5, paddingBottom: 5 }}
        colSpan={4}
      ></TableCell>
      <TableCell colSpan={2} style={{ paddingTop: 5, paddingBottom: 5 }}>
        Balance Amount
      </TableCell>
      <TableCell
        colSpan={2}
        style={{ paddingTop: 5, paddingBottom: 5 }}
      ></TableCell>
      <TableCell
        colSpan={2}
        style={{
          paddingTop: 5,
          paddingBottom: 5,
          paddingLeft: 5,
        }}
      >
        <Box display="flex" alignItems="center">
          <Box>
            <span style={{ fontWeight: "bold" }}> र</span>
          </Box>
          <Box>
            <TextInputField
              type="number"
              name="balanceAmount"
              readOnly={true}
              defaultValue={0}
              inputRef={register()}
              style={{
                backgroundColor: "transparent",
                border: "none",
                paddingTop: 0,
                paddingBottom: 0,
                height: "auto",
                fontWeight: "bold",
              }}
            />
          </Box>
        </Box>
      </TableCell>
    </TableRow>
    <TableRow style={{ backgroundColor: "cornsilk" }}>
      <TableCell
        style={{ paddingTop: 5, paddingBottom: 5 }}
        colSpan={4}
      ></TableCell>
      <TableCell colSpan={2} style={{ paddingTop: 5, paddingBottom: 5 }}>
        Order Status
      </TableCell>
      <TableCell
        colSpan={2}
        style={{ paddingTop: 5, paddingBottom: 5 }}
      ></TableCell>
      <TableCell
        colSpan={2}
        style={{
          paddingTop: 5,
          paddingBottom: 5,
          paddingLeft: 5,
        }}
      >
        <Controller
          control={control}
          name="orderStatus"
          defaultValue="RUNNING"
          render={(props) => (
            <SelectDropDown
              value={props.value}
              options={initialConfig.data.orderStatus}
              onChange={(e) => {
                props.onChange(e.target.value);
                handleChangeField(
                  "orderStatus",
                  e.target.value,
                  getValues("customerPhone")
                );
              }}
            />
          )}
        />
      </TableCell>
    </TableRow>
  </TableBody>
</TableContainer>;
