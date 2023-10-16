import React, { FC, ReactNode, Fragment } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

//Styles
import useStyles from "./styles";
import SelectDropDown from "../../Ui/formFields/SelectDropdown";

// UI
// import FooterComponent from "../Ui/footer/index";

interface props {
  children: ReactNode;
  pageTitle?: string;
  showDivider?: boolean;
  showDropdown?: boolean;
  selectedDropdownValue?: string;
  selectedDropdownValue2?: string;
  dropDownValues?: any;
  dropDownValues2?: any;
  padding?: number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onChaneCustomerSearch?: React.ChangeEventHandler<HTMLInputElement>;
  onChangeDropDown?: (value: any) => void;
  onChangeDropDown2?: React.ChangeEventHandler<HTMLInputElement>;
  showSearch?: boolean;
  showCoustmerIdSearch?: boolean;
  showButton?: boolean;
  btnTitle?: string;
  btnTitle2?: string;
  showbtn2?: boolean;
  showDropdown2?: boolean;
  onClickBtn?: React.MouseEventHandler<HTMLButtonElement>;
  onClickBt2?: React.MouseEventHandler<HTMLButtonElement>;
  defaultValue?: string;
  defaultCustomerSearchValue?: string;
  btnIcon1?: ReactNode;
}

const MainLayout: FC<props> = ({
  children,
  pageTitle,
  showDivider,
  padding,
  btnTitle2,
  onChange,
  onChaneCustomerSearch,
  onChangeDropDown,
  onChangeDropDown2,
  showSearch,
  showCoustmerIdSearch,
  showButton,
  showDropdown,
  onClickBtn,
  onClickBt2,
  btnTitle,
  showbtn2,
  dropDownValues,
  selectedDropdownValue,
  selectedDropdownValue2,
  showDropdown2,
  dropDownValues2,
  defaultValue,
  defaultCustomerSearchValue,
  btnIcon1,
}) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography
            variant="body1"
            component="h3"
            classes={{ root: classes.pageTitleLbl }}
          >
            {pageTitle}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          {showDropdown && (
            <div style={{ padding: "10px" }}>
              <SelectDropDown
                isError={false}
                disabled={false}
                options={dropDownValues ? dropDownValues : []}
                id="height-dropdown"
                width={"170px"}
                height={35}
                value={selectedDropdownValue}
                onChange={(e) => {
                  onChangeDropDown(e.target.value);
                }}
              />
            </div>
          )}
          {showDropdown2 && (
            <div style={{ padding: "10px" }}>
              <SelectDropDown
                isError={false}
                disabled={false}
                options={dropDownValues2 ? dropDownValues2 : []}
                id="drop-2"
                width={"170px"}
                height={35}
                value={selectedDropdownValue2}
                onChange={(e) => {
                  onChangeDropDown2(e.target.value);
                }}
              />
            </div>
          )}
          {/* for serching cust id */}

          {showCoustmerIdSearch && (
            <Box>
              <input
                defaultValue={defaultCustomerSearchValue}
                onChange={onChaneCustomerSearch}
                placeholder="Search By Customer Id..."
                className={classes.searchInput}
                type="number"
              />
            </Box>
          )}

          {showSearch && (
            <Box>
              <input
                defaultValue={defaultValue}
                onChange={onChange}
                placeholder="Search..."
                className={classes.searchInput}
                type="text"
              />
            </Box>
          )}
          {showButton && (
            <Box mr={1}>
              {btnIcon1 ? (
                <IconButton onClick={onClickBtn} style={{backgroundColor:"black",borderRadius:5,height:35}}>
                  {btnIcon1}
                </IconButton>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onClickBtn}
                >
                  {btnTitle}
                </Button>
              )}
            </Box>
          )}
          {showbtn2 && (
            <Box mr={1}>
              <Button variant="contained" color="primary" onClick={onClickBt2}>
                {btnTitle2}
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      {showDivider && <Divider />}
      <Box p={padding}>{children}</Box>
    </Fragment>
  );
};

export const MainLayoutNew = () => {
  return <div></div>;
};

export default MainLayout;
