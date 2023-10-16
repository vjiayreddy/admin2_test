import React, { useState } from "react";
import { Button, TableRow } from "@material-ui/core";
import _ from "lodash";
import InfoDialogComponent from "../dialog/infoDialog";
import router from "next/router";

const ProductViewTable = ({ data, onClick }) => {
  const [isOpen, setIsOpen] = useState();
  const changeButtonStatus = (itemNumber) => {
    if (data?.orderQualityChecks?.length > 0) {
      const findItemNumber = _.find(
        data.orderQualityChecks,
        (item) => item.itemNumber === itemNumber
      );
      if (findItemNumber) {
        console.log(findItemNumber);
        return true;
      }
    }

    return false;
  };

  const getProductId = (itemNumber) => {
    if (data?.orderQualityChecks?.length > 0) {
      const findItemNumber = _.find(
        data.orderQualityChecks,
        (item) => item.itemNumber === itemNumber
      );
      if (findItemNumber) {
        console.log(findItemNumber);
        return findItemNumber._id;
      }
    }
    return null;
  };

  return (
    <div>
      <div className="orderTable"></div>
      <div className="orderFormTable">
        <table className="table">
          <tr style={{ backgroundColor: "cornsilk" }}>
            <td>Product</td>
            <td>Product No</td>
            <td>Color</td>
            <td>Fabric Code</td>
            <td>Action</td>
          </tr>

          <tbody>
            {data?.orderItems.map((item, index) => (
              <TableRow key={index}>
                <td>{item.itemName}</td>
                <td>{item.itemNumber}</td>
                <td>{item.itemColor}</td>
                <td>{item.fabricCode}</td>
                <td>
                  {changeButtonStatus(item.itemNumber) && (
                    <Button
                      style={{ marginRight: 10 }}
                      color={"secondary"}
                      onClick={() => {
                        const _qc_item_id = getProductId(item.itemNumber);
                        router.push({
                          pathname: "/qualitycheck/form/view",
                          query: {
                            itemId: _qc_item_id,
                            itemNumber: item.itemNumber,
                          },
                        });
                      }}
                    >
                      View
                    </Button>
                  )}

                  <Button
                    color={"primary"}
                    onClick={() => {
                      let isEdit = changeButtonStatus(item.itemNumber)
                        ? true
                        : false;
                      const _qc_item_id = getProductId(item.itemNumber);
                      onClick(item._id, isEdit, item.itemNumber, _qc_item_id);
                    }}
                  >
                    {changeButtonStatus(item.itemNumber) ? "Edit" : "Enter"}
                  </Button>
                </td>
              </TableRow>
            ))}
          </tbody>
        </table>
      </div>
      <InfoDialogComponent open={isOpen} onCloseModel={() => setIsOpen(false)}>
        <div></div>
      </InfoDialogComponent>
    </div>
  );
};

export default ProductViewTable;
