export const getImageUrl = (catId) => {
  if (catId) {
    switch (catId) {
      case "5da7220571762c2a58b27a65":
        return "/images/Shirt.png";

      case "5da7220571762c2a58b27a67":
        return "/images/Trouser.png";

      case "5da7220571762c2a58b27a68":
        return "/images/Blazer.png";

      case "5da7220571762c2a58b27a70":
        return "/images/Sherwani.png";

      case "5da7220571762c2a58b27a6c":
        return "/images/Jodhpuri.png";

      case "5da7220571762c2a58b27a6d":
        return "/images/Sadari1.png";

      case "5da7220571762c2a58b27a6e":
        return "/images/Kurta.png";

      case "5da7220571762c2a58b27a6a":
        return "/images/Waistcoat.png";

      // case "5da7220571762c2a58b27a6f":
      //   return "/images/Indowestern.png";

      // case "5da7220571762c2a58b27a66":
      //   return "/images/Suit.png";
      default:
        return "/images/noImage.jpg";
    }
  }
};

export const checkStylingForm = (storeProducts, catName) => {
  const findCatId = _.find(storeProducts, (itm) => itm.value === catName);
  if (!_.isEmpty(findCatId)) {
    if (
      findCatId.catId === "5da7220571762c2a58b27a65" ||
      findCatId.catId === "5da7220571762c2a58b27a67" ||
      findCatId.catId === "5da7220571762c2a58b27a68" ||
      findCatId.catId === "5da7220571762c2a58b27a70" ||
      findCatId.catId === "5da7220571762c2a58b27a6c" ||
      findCatId.catId === "5da7220571762c2a58b27a6d" ||
      findCatId.catId === "5da7220571762c2a58b27a6e" ||
      findCatId.catId === "5da7220571762c2a58b27a6a" ||
      findCatId.catId === "5da7220571762c2a58b27a6f" ||
      findCatId.catId === "5da7220571762c2a58b27a66"
    ) {
      return findCatId.catId;
    } else {
      return null;
    }
  }
};

export const changeButtonLabel = (productName, styleDesignImage) => {
  if (
    productName === "full_shirt" ||
    productName === "half_shirt" ||
    productName === "blazer" ||
    productName === "trouser" ||
    productName === "sherwani" ||
    productName === "jodhpuri_top" ||
    productName === "sadri" ||
    productName === "kurta" ||
    productName === "waistcoat" ||
    productName === "indowestern_top" ||
    productName === "suit"
  ) {
    return "Styling";
  } else {
    if (!_.isEmpty(styleDesignImage)) {
      return "View";
    }
    return "Upload";
  }
};

export const categories = [
  {
    name: "full_shirt",
    value: "full_shirt",
    catId: "5da7220571762c2a58b27a65",
  },
  {
    name: "half_shirt",
    value: "half_shirt",
    catId: "5da7220571762c2a58b27a65",
  },
  {
    name: "blazer",
    value: "blazer",
    catId: "5da7220571762c2a58b27a68",
  },
  {
    name: "chinos",
    value: "chinos",
    catId: "5da7220571762c2a58b27a6b",
  },
  {
    name: "trouser",
    value: "trouser",
    catId: "5da7220571762c2a58b27a67",
  },
  {
    name: "suit",
    value: "suit",
    catId: "5da7220571762c2a58b27a66",
  },
  {
    name: "waistcoat",
    value: "waistcoat",
    catId: "5da7220571762c2a58b27a6a",
  },
  {
    name: "sherwani",
    value: "sherwani",
    catId: "5da7220571762c2a58b27a70",
  },
  {
    name: "kurta",
    value: "kurta",
    catId: "5da7220571762c2a58b27a6e",
  },
  {
    name: "jodhpuri_top",
    value: "jodhpuri_top",
    catId: "5da7220571762c2a58b27a6c",
  },
  {
    name: "indowestern_top",
    value: "indowestern_top",
    catId: "5da7220571762c2a58b27a6f",
  },
  {
    name: "ethnic_bottom",
    value: "ethnic_bottom",
    catId: null,
  },
  {
    name: "sadri",
    value: "sadri",
    catId: "5da7220571762c2a58b27a6d",
  },
  {
    name: "puna_pant",
    value: "puna_pant",
    catId: "636f3012feea0816508c5c45",
  },
  {
    name: "patiyala",
    value: "patiyala",
    catId: "621a34485417ab1e143a5245",
  },
  {
    name: "dhoti",
    value: "dhoti",
    catId: "6036451627e32d7fd776a580",
  },
  {
    name: "shacket",
    value: "shacket",
    catId: null,
  },
  {
    name: "shoes",
    value: "shoes",
    catId: "5ebb993abcb3d23714b2ebf4",
  },
  {
    name: "belts",
    value: "belts",
    catId: "5da7220571762c2a58b27a79",
  },
  {
    name: "tie/bows",
    value: "tie/bows",
    catId: "5da7220571762c2a58b27a76",
  },
  {
    name: "others",
    value: "others",
    catId: null,
  },
  {
    name: "chudidaar",
    value: "chudidaar",
    catId: "6036446927e32d7fd776a57f",
  },
  {
    name: "stole",
    value: "stole",
    catId: "5da7220571762c2a58b27a74",
  },
  {
    name: "pagadi",
    value: "pagadi",
    catId: "5da7220571762c2a58b27a72",
  },
  {
    name: "jootis",
    value: "jootis",
    catId: "5da7220571762c2a58b27a73",
  },
  {
    name: "style_club",
    value: "style_club",
    catId: null,

  },
];


// export const getStudioName = (studio) => {
//   if (studio === "61c55048429a4414e8755e69") {
//     // return "HY01";
//     return " GROOM2B";
//   } 
//   else if (studio === "61d3ef5a2aa36c23004375ec") {
//     // return "HY02";
//     return "My Perfect Fit ";
//   } 
//   else if(studio === "61d3ef622aa36c23004375ed"){
//     // return "HY03";
//     return "BLUTAILOR";
//   } 
//   else {
//     // return "HY04";
//     return "STYLE CLUB";
//   }
// };


export const getStudioName = (studio) => {
  if (studio === "61c55048429a4414e8755e69") {
    return "GROOM2B";
  } else if (studio === "61d3ef5a2aa36c23004375ec") {
    return "My Perfect Fit";
  } else if (studio === "61d3ef622aa36c23004375ed") {
    return "BLUTAILOR";
  } else {
    return studio ? " MPF STYLE CLUB" : "GROOM2B";
  }
};

