import moment from "moment";
import _ from "lodash";

export const getAllUsersData = (data) => {
  const { getUsersByFilter } = data;
  let allusers = [];
  getUsersByFilter.map((user) => {
    if (
      (!_.isEmpty(user.tags) && user.tags[0] === "styleClub") ||
      (!_.isEmpty(user.serviceOrder) &&
        !_.isEmpty(user.serviceOrder[0].razorPayId))
    ) {
      allusers.push({
        userId: user._id,
        id: user._id,
        cno: user.customerSrNo || "-",
        fullName: `${user.firstName} ${user.lastName}`,
        phone: user.phone,
        email: user.email,
        registred: moment(user.createdAt).format("MMM Do YYYY"),
        stylist: !_.isEmpty(user.stylist) ? user.stylist[0].name : "-",
      });
    }
  });
  return allusers;
};

export const getAllRegistreUserdData = (data) => {
  const { getUsersByFilter } = data;
  let allusers = [];
  getUsersByFilter.map((user) => {
    if (
      (!_.isEmpty(user.tags) && user.tags[0] === "styleClub") ||
      (!_.isEmpty(user.serviceOrder) &&
        !_.isEmpty(user.serviceOrder[0].razorPayId))
    ) {
      allusers.push({
        userId: user._id,
        id: user._id,
        cno: user.customerSrNo || "-",
        fullName: `${user.firstName} ${user.lastName}`,
        phone: user.phone,
        email: user.email,
        registred: moment(user.createdAt).format("MMM Do YYYY"),
        stylist: !_.isEmpty(user.stylist) ? user.stylist[0].name : "-",
      });
    }
  });
  return allusers;
};

export const getPaidUserData = (data) => {
  const { getUsersByFilter } = data;
  let allusers = [];
  getUsersByFilter.map((user) => {
    if (
      !_.isEmpty(user.serviceOrder) &&
      !_.isEmpty(user.serviceOrder[0].razorPayId)
    ) {
      allusers.push({
        userId: user._id,
        id: user._id,
        cno: user.customerSrNo || "-",
        fullName: `${user.firstName} ${user.lastName}`,
        phone: user.phone,
        email: user.email,
        registred: moment(user.createdAt).format("MMM Do YYYY"),
        stylist: !_.isEmpty(user.stylist) ? user.stylist[0].name : "-",
      });
    }
  });
  return allusers;
};
