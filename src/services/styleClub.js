import _ from "lodash";
import Resizer from "react-image-file-resizer";
const saveSelectedOptions = (keyName, data) => {
  localStorage.setItem(keyName, JSON.stringify(data));
};

const getLocalSavedOptions = (keyName) => {
  const getData = JSON.parse(localStorage.getItem(keyName));
  return getData;
};

export const extractAllFormOptions = (data) => {
  let formOptions = [];
  const currentScreen = [...data.screens];
  currentScreen.map((qus1) => {
    qus1.questions.map((qus2) => {
      qus2.question.optionsData.map((option) => {
        formOptions.push({
          ...option,
          catId: qus2.question.categoryId,
          master_name: qus2.question.master_name,
        });
      });
    });
  });
  return formOptions;
};

export const getMasterNameByQusId = (qusId, form) => {
  let mastername = null;
  const allScreens = [...form.screens];
  allScreens.map((scrn) => {
    scrn.questions.map((qus) => {
      if (qusId === qus.questionId) {
        mastername = qus.question.master_name;
        return;
      }
    });
  });
  return mastername;
};

export const getMasterNameByOptId = (optId, form) => {
  let mastername = null;
  const allScreens = [...form.screens];
  allScreens.map((qus1) => {
    qus1.questions.map((qus2) => {
      qus2.question.optionsData.map((option) => {
        if (optId === option._id) {
          mastername = qus2.question.master_name;
          return;
        }
      });
    });
  });
  return mastername;
};

export const converToOptions = (data) => {
  let dataKeys = [];
  for (let [key, value] of Object.entries(data)) {
    dataKeys.push({
      qusId: key,
      value: value,
    });
  }

  if (!_.isEmpty(getLocalSavedOptions("formOptions"))) {
    const getLocalOptions = getLocalSavedOptions("formOptions");
    const filtredOptions = _.uniqBy([...getLocalOptions, ...dataKeys], "qusId");
    dataKeys.map((dataKey) => {
      var index = _.findIndex(
        filtredOptions,
        (opt) => opt.qusId === dataKey.qusId
      );
      if (index !== -1) {
        filtredOptions[index].value = dataKey.value;
        saveSelectedOptions("formOptions", filtredOptions);
      } else {
        saveSelectedOptions("formOptions", filtredOptions);
      }
    });
  } else {
    saveSelectedOptions("formOptions", dataKeys);
  }
  const getSelectedOptions = getLocalSavedOptions("formOptions");
  return getSelectedOptions;
};

export const getPersonalizeFinalOptions = (selectedOptions, screens) => {
  const payloadOptions = [];
  const allScreensOptions = extractAllFormOptions(screens);
  const getSelectedOptions = converToOptions(selectedOptions);
  getSelectedOptions.map((opt) => {
    if (Array.isArray(opt.value)) {
      opt.value.map((v) => {
        const getOption = _.find(allScreensOptions, (ot) => ot._id === v);
        payloadOptions.push({
          master_name: getMasterNameByQusId(opt.qusId, screens),
          value: v,
          image: !_.isEmpty(getOption) ? getOption.image : "",
          catId: "",
        });
      });
    } else {
      const getOption = _.find(allScreensOptions, (ot) => ot._id === opt.value);
      payloadOptions.push({
        master_name: getMasterNameByQusId(opt.qusId, screens),
        value: opt.value,
        image: !_.isEmpty(getOption) ? getOption.image : "",
        catId: "",
      });
    }
  });
  return payloadOptions;
};

export const getFormPayload = (options, userId, formId, _formData) => {
  const formData = {
    userId: userId,
    formIds: [formId, ..._formData.dependencyFormIds],
    selections: [...options],
  };
  if (!_.isEmpty(userId)) {
    localStorage.removeItem("dpFormPayload");
  } else {
    saveSelectedOptions("dpFormPayload", formData);
  }
  return formData;
};

export const getSelectedRadio = (qusId) => {
  let id = null;
  if (!_.isEmpty(getLocalSavedOptions("formOptions"))) {
    const getLocalOptions = getLocalSavedOptions("formOptions");
    getLocalOptions.map((item) => {
      if (qusId === item.qusId) {
        id = item.value;
      }
    });
  }
  return id;
};

export const getMultiSelectedIds = (qusId) => {
  let selectedIds = [];
  if (!_.isEmpty(getLocalSavedOptions("formOptions"))) {
    const getLocalOptions = getLocalSavedOptions("formOptions");
    getLocalOptions.map((item) => {
      if (qusId === item.qusId) {
        if (Array.isArray(item.value)) {
          selectedIds.push(...item.value);
        }
      }
    });
  }
  return selectedIds;
};

export const handleMultiCheck = (qusId, checkedId, getValues) => {
  const { [qusId]: ids } = getValues();
  const newIds = ids?.includes(checkedId)
    ? ids?.filter((id) => id !== checkedId)
    : [...(ids ?? []), checkedId];
  return newIds;
};

export const findFormStatus = (formData, index) => {
  const screens = [...formData.screens];
  const allScreens = screens[index];
  var status = null;
  allScreens.questions.map((qus1) => {
    if (qus1.question.optionTypeId === "608d388c2831161efcb9a6f5") {
      status = "profile";
    }
  });
  return status;
};

export const resizeFile = (file) =>
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

export const dataURIToBlob = (dataURI) => {
  const splitDataURI = dataURI.split(",");
  const byteString =
    splitDataURI[0].indexOf("base64") >= 0
      ? atob(splitDataURI[1])
      : decodeURI(splitDataURI[1]);
  const mimeString = splitDataURI[0].split(":")[1].split(";")[0];
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
  return new Blob([ia], { type: mimeString });
};

export const getOptionsWithAuth = (data, screens) => {
  let dataKeys = [];
  const payloadOptions = [];
  for (let [key, value] of Object.entries(data)) {
    dataKeys.push({
      qusId: key,
      value: value,
    });
  }
  const allScreensOptions = extractAllFormOptions(screens);
  dataKeys.map((opt) => {
    if (Array.isArray(opt.value)) {
      opt.value.map((v) => {
        const getOption = _.find(allScreensOptions, (ot) => ot._id === v);
        payloadOptions.push({
          master_name: getMasterNameByQusId(opt.qusId, screens),
          value: v,
          image: !_.isEmpty(getOption) ? getOption.image : "",
          catId: "",
        });
      });
    } else {
      const getOption = _.find(allScreensOptions, (ot) => ot._id === opt.value);
      payloadOptions.push({
        master_name: getMasterNameByQusId(opt.qusId, screens),
        value: opt.value,
        image: !_.isEmpty(getOption) ? getOption.image : "",
        catId: "",
      });
    }
  });
  return payloadOptions;
};

export const getFinalSelectedOptions = (data, formData) => {
  let dataKeys = [];
  let payload = [];
  for (let [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      value.map((itm) => {
        dataKeys.push({
          value: itm,
        });
      });
    } else {
      dataKeys.push({
        value: value,
      });
    }
  }
  const options = extractAllFormOptions(formData);
  dataKeys.map((key) => {
    const findItem = _.find(options, (item) => item._id === key.value);
    payload.push({
      master_name: findItem.master_name,
      catId: findItem.catId,
      value: findItem._id,
      image: findItem.image,
    });
  });
  return payload;
};
