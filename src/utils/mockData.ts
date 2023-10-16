import { serviceModel, footerLink, drawerMenu } from "../models/general/global";
import { OrderStatus } from "./enumType";

export const drawerMenuList: drawerMenu[] = [
  {
    id: "01",
    name: "Style Club",
    url: "/styleclub",
  },
  {
    id: "02",
    name: "Measurement",
    url: "/measurement",
  },
];

export const NavgationMenu = [
  "Shop by occasions",
  "Shop by products",
  "Shop by looks",
  "Accessories",
  "My Styles",
];

export const serviceBanner: serviceModel[] = [
  {
    title: "Designed by Stylists",
    subTitle: "Crafted just for you",
    icon: "/icons/love.svg",
    alt: "icon-heart",
  },
  {
    title: "Perfect Fit Gauranteed",
    subTitle: "Custom-made with care",
    icon: "/icons/scissors.svg",
    alt: "icon-scissors",
  },
  {
    title: "Free Shipping",
    subTitle: "Delivery within 7-10 days",
    icon: "/icons/box.svg",
    alt: "icon-box",
  },
];

export const mpfLinks: footerLink[] = [
  {
    linkTitle: "About Us",
    href: "/",
  },
  {
    linkTitle: "Blog",
    href: "/",
  },
  {
    linkTitle: "How its work",
    href: "/",
  },
  {
    linkTitle: "News & Events",
    href: "/",
  },
  {
    linkTitle: "Refer a Friend",
    href: "/",
  },
  {
    linkTitle: "Coupons",
    href: "/",
  },
  {
    linkTitle: "My Appointments",
    href: "/",
  },
  {
    linkTitle: "SiteMap",
    href: "/",
  },
];
export const helpLinks: footerLink[] = [
  {
    linkTitle: "FAQ's",
    href: "/",
  },
  {
    linkTitle: "Shipping",
    href: "/",
  },
  {
    linkTitle: "Alterations",
    href: "/",
  },
  {
    linkTitle: "Terms of Service",
    href: "/",
  },
  {
    linkTitle: "Privacy Policy",
    href: "/",
  },
  {
    linkTitle: "Contact Us",
    href: "/",
  },
];
export const shopNowLinks: footerLink[] = [
  {
    linkTitle: "Formal Wear",
    href: "/",
  },
  {
    linkTitle: "Ethnic Wear",
    href: "/",
  },
  {
    linkTitle: "Semi-Formal Wear",
    href: "/",
  },
  {
    linkTitle: "Party Wear",
    href: "/",
  },
  {
    linkTitle: "Casual Wear",
    href: "/",
  },
  {
    linkTitle: "Shop by Products",
    href: "/",
  },
  {
    linkTitle: "Shop Accessories",
    href: "/accessories",
  },
];

export const personalized_form = {
  _id: "60c2fa761ede7a3740f41775",
  dependencyFormIds: [
    "608ba4e72831161efcb9a6c6",
    "608bf5ed2831161efcb9a6ce",
    "608c08832831161efcb9a6d7",
    "608d03792831161efcb9a6e8",
    "608d42832831161efcb9a6f6",
  ],
  screens: [
    {
      questions: [
        {
          questionId: "608a88bdb3a9eb8678148625",
          question: {
            optionTypeId: "60546863e0646e2994cfb7bf",
            isMultipleChoice: true,
            master_name: "master_persona",
            input: "Are you a _______?",
            value: null,
            description:
              "This will help us better serve you, according to your persona.",
            optionsData: [
              {
                name: "a Groom",
                _id: "60546796e0646e2994cfb7b0",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/Persona/groom.png",
              },
              {
                name: "an Event Shopper",
                _id: "60546796e0646e2994cfb7b1",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/Persona/event_shopper.jpg",
              },
              {
                name: "a Working Professional",
                _id: "60546796e0646e2994cfb7b2",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/Persona/working_professional.jpg",
              },
              {
                name: "a CEO/Senior Executive",
                _id: "60546796e0646e2994cfb7b3",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/Persona/ceosenior_executive.jpg",
              },
              {
                name: "Plus Size",
                _id: "60546796e0646e2994cfb7b4",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/Persona/oddsize.png",
              },
              {
                name: "Just Exploring",
                _id: "60546796e0646e2994cfb7b5",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/Persona/just_exploring.png",
              },
            ],
            categoryId: "60546841e0646e2994cfb7b6",
            _id: "608a88bdb3a9eb8678148625",
          },
        },
      ],
    },
    {
      questions: [
        {
          questionId: "608a903fb3a9eb8678148627",
          question: {
            optionTypeId: "60546863e0646e2994cfb7c0",
            isMultipleChoice: true,
            master_name: "master_producttype",
            input: "What kind of outfits do you prefer?",
            value: null,
            description: "",
            optionsData: [
              {
                name: "Custom-made",
                _id: "5da950252e429414a083ea6c",
                image: "",
              },
              {
                name: "Ready-made",
                _id: "5da950252e429414a083ea6d",
                image: "",
              },
              {
                name: "Ready-made with Minor Adjustments",
                _id: "60af30d11ede7a3740f41751",
                image: "",
              },
            ],
            categoryId: "60546841e0646e2994cfb7b7",
            _id: "608a903fb3a9eb8678148627",
          },
        },
        {
          questionId: "608a951d118d8511941f0245",
          question: {
            optionTypeId: "60546863e0646e2994cfb7bf",
            isMultipleChoice: true,
            master_name: "master_fitpreference",
            input: "What kind of fit do you prefer?",
            value: null,
            description: "",
            optionsData: [
              {
                name: "Tight",
                _id: "5ebf70cc8883f7112c0346be",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/fitPreference/tight.jpg",
              },
              {
                name: "Slim",
                _id: "5ebf71208883f7112c0346bf",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/fitPreference/slim.png",
              },
              {
                name: "Regular",
                _id: "5ebf71448883f7112c0346c1",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/fitPreference/normal.png",
              },
              {
                name: "Loose",
                _id: "5ebf712f8883f7112c0346c0",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/fitPreference/loose.png",
              },
            ],
            categoryId: "60546841e0646e2994cfb7b7",
            _id: "608a951d118d8511941f0245",
          },
        },
      ],
    },
    {
      questions: [
        {
          questionId: "608a96de118d8511941f0246",
          question: {
            optionTypeId: "60546863e0646e2994cfb7c1",
            isMultipleChoice: false,
            master_name: "master_height",
            input: "How tall are you?",
            value: null,
            description: "",
            optionsData: [
              {
                name: "Upto 5' Feet",
                _id: "607d3331295d726d70ae6ac4",
                image: "",
              },
              {
                name: "5'1\" - 5'7\"",
                _id: "607d3350295d726d70ae6ac5",
                image: "",
              },
              {
                name: "5'8\" - 5'10\"",
                _id: "607d3361295d726d70ae6ac6",
                image: "",
              },
              {
                name: "5'11\" - 6'1\"",
                _id: "607d338c295d726d70ae6ac7",
                image: "",
              },
              {
                name: "Above 6'2\"",
                _id: "607d33a8295d726d70ae6ac8",
                image: "",
              },
            ],
            categoryId: "60546841e0646e2994cfb7b8",
            _id: "608a96de118d8511941f0246",
          },
        },
        {
          questionId: "608bae862831161efcb9a6c7",
          question: {
            optionTypeId: "60546863e0646e2994cfb7c2",
            isMultipleChoice: false,
            master_name: "master_weight",
            input: "What's your weight?",
            value: null,
            description: "",
            optionsData: [
              {
                name: " Upto 50 kg ",
                _id: "608bb773de32f077d5013ff9",
                image: "",
              },
              {
                name: " 50-60 kg ",
                _id: "608bb7eade32f077d5013ffa",
                image: "",
              },
              {
                name: " 61-70kg ",
                _id: "608bb8192831161efcb9a6c8",
                image: "",
              },
              {
                name: " 71-80 kg ",
                _id: "60c0d4ccd52e8e2020e179fb",
                image: "",
              },
              {
                name: " 81-90kg ",
                _id: "60c0d4e4d52e8e2020e179fc",
                image: "",
              },
              {
                name: " 91-100kg ",
                _id: "60c0d502d52e8e2020e179fd",
                image: "",
              },
              {
                name: " 101kg-110kg ",
                _id: "60c0d521d52e8e2020e179fe",
                image: "",
              },
              {
                name: " 111- 120 kg ",
                _id: "60c0d53dd52e8e2020e179ff",
                image: "",
              },
              {
                name: " 121-150kg ",
                _id: "60c0d554d52e8e2020e17a00",
                image: "",
              },
              {
                name: " Above 150 kg ",
                _id: "60c0d57dd52e8e2020e17a01",
                image: "",
              },
            ],
            categoryId: "60546841e0646e2994cfb7b8",
            _id: "608bae862831161efcb9a6c7",
          },
        },
        {
          questionId: "608aa042118d8511941f0247",
          question: {
            optionTypeId: "60546863e0646e2994cfb7c1",
            isMultipleChoice: false,
            master_name: "master_age",
            input: "How young are you?",
            value: null,
            description: "",
            optionsData: [
              {
                name: "Upto 18 yrs",
                _id: "60c1b9df1ede7a3740f41758",
                image: "",
              },
              {
                name: "18 - 24 yrs",
                _id: "60c1b9df1ede7a3740f41759",
                image: "",
              },
              {
                name: "25 - 29 yrs",
                _id: "60c1b9df1ede7a3740f4175a",
                image: "",
              },
              {
                name: "30 to 39 yrs",
                _id: "60c1b9df1ede7a3740f4175b",
                image: "",
              },
              {
                name: "40 - 49 yrs",
                _id: "60c1b9df1ede7a3740f4175c",
                image: "",
              },
              {
                name: "50 - 59 yrs",
                _id: "60c1b9df1ede7a3740f4175d",
                image: "",
              },
              {
                name: "Over 60 yrs",
                _id: "60c1b9df1ede7a3740f4175e",
                image: "",
              },
            ],
            categoryId: "60546841e0646e2994cfb7b8",
            _id: "608aa042118d8511941f0247",
          },
        },
      ],
    },
    {
      questions: [
        {
          questionId: "60c715421ede7a3740f4177e",
          question: {
            optionTypeId: "60546863e0646e2994cfb7bf",
            isMultipleChoice: true,
            master_name: "master_outfitpreference",
            input: "Which of the following outfits match your personality?",
            value: null,
            description: "",
            optionsData: [
              {
                name: "High Formals",
                _id: "60c714381ede7a3740f41776",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/OutfitPreference/High-formals.jpg",
              },
              {
                name: "Regular Formals",
                _id: "60c714381ede7a3740f41777",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/OutfitPreference/Regular-formals.jpg",
              },
              {
                name: "Semi Formals",
                _id: "60c714381ede7a3740f41778",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/OutfitPreference/Semi-formals.jpg",
              },
              {
                name: "Casual",
                _id: "60c714381ede7a3740f41779",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/OutfitPreference/Casuals.jpg",
              },
              {
                name: "Fully Casual",
                _id: "60c714381ede7a3740f4177a",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/OutfitPreference/Fully-casual.jpg",
              },
              {
                name: "Athleisure",
                _id: "60c714381ede7a3740f4177b",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/OutfitPreference/Atheisure.jpg",
              },
              {
                name: "Relaxed",
                _id: "60c714381ede7a3740f4177c",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/OutfitPreference/Relaxed.jpg",
              },
              {
                name: "Trendy",
                _id: "60c714381ede7a3740f4177d",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/OutfitPreference/Trendy.jpg",
              },
              {
                name: "Business",
                _id: "60f112e1175afe3a5482a551",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/OutfitPreference/buisness.jpg",
              },
              {
                name: "Not Sure",
                _id: "60f112ef175afe3a5482a552",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/CommonImages/not_sure.jpg",
              },
            ],
            categoryId: "60546841e0646e2994cfb7b9",
            _id: "60c715421ede7a3740f4177e",
          },
        },
      ],
    },
    {
      questions: [
        {
          questionId: "608aa9d9118d8511941f0248",
          question: {
            optionTypeId: "60546863e0646e2994cfb7bf",
            isMultipleChoice: false,
            master_name: "master_new_skincolor",
            input: "What's your skin tone?",
            value: null,
            description: "",
            optionsData: [
              {
                name: "Light Beige",
                _id: "5e281e9d843fb72228fbf754",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/skinColor/light_beige.jpg",
              },
              {
                name: "Rose Beige",
                _id: "5e281e9d843fb72228fbf755",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/skinColor/rose_beige.jpg",
              },
              {
                name: "Light Olive",
                _id: "5e281e9d843fb72228fbf756",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/skinColor/light_olive.jpg",
              },
              {
                name: "Olive",
                _id: "5e281e9d843fb72228fbf758",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/skinColor/olive.jpg",
              },
              {
                name: "Light Peach Brown",
                _id: "5e281e9d843fb72228fbf759",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/skinColor/light_peach_brown.jpg",
              },
              {
                name: "Olive Brown",
                _id: "5e281e9d843fb72228fbf75a",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/skinColor/olive_brown.jpg",
              },
              {
                name: "Medium Brown",
                _id: "5e281e9d843fb72228fbf760",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/skinColor/medium_brown.jpg",
              },
              {
                name: "Red Brown",
                _id: "5e281e9d843fb72228fbf75c",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/skinColor/red_brown.jpg",
              },
              {
                name: "Dark Red Brown",
                _id: "5e281e9d843fb72228fbf763",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/skinColor/dark-red-brown.jpg",
              },
              {
                name: "Dark Olive Brown",
                _id: "5e281e9d843fb72228fbf764",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/skinColor/dark_olive_brown.jpg",
              },
              {
                name: "Dark Ash Brown",
                _id: "5e282ce3843fb72228fbf765",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/skinColor/dark_ash_brown.jpg",
              },
              {
                name: "Blue Black",
                _id: "5e282ce3843fb72228fbf766",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/skinColor/blue_black.jpg",
              },
            ],
            categoryId: "60546841e0646e2994cfb7b8",
            _id: "608aa9d9118d8511941f0248",
          },
        },
        {
          questionId: "608aaf6f118d8511941f0249",
          question: {
            optionTypeId: "60546863e0646e2994cfb7bf",
            isMultipleChoice: false,
            master_name: "master_veincolor",
            input: "What's your vein color?",
            value: null,
            description: "",
            optionsData: [
              {
                name: "Blue or Purple (Cool)",
                _id: "5d9f6f5e4bbe912930de89a2",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/veinColor/cool.png",
              },
              {
                name: "Green (Warm)",
                _id: "5d9f6f5e4bbe912930de89a3",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/veinColor/warm.png",
              },
              {
                name: "Neutral (Not Clear)",
                _id: "5d9f6f5e4bbe912930de89a4",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/veinColor/neutral.png",
              },
              {
                name: "Not Sure",
                _id: "60b0c3701ede7a3740f41754",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/CommonImages/not_sure.jpg",
              },
            ],
            categoryId: "60546841e0646e2994cfb7b8",
            _id: "608aaf6f118d8511941f0249",
          },
        },
      ],
    },
    {
      questions: [
        {
          questionId: "608ab22a118d8511941f024a",
          question: {
            optionTypeId: "60546863e0646e2994cfb7bf",
            isMultipleChoice: false,
            master_name: "master_haircolor",
            input: "What's your hair color?",
            value: null,
            description: "",
            optionsData: [
              {
                name: "Black",
                _id: "5e28305d64a7512228490720",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/hairColor/jet_black.jpg",
              },
              {
                name: "Dark Brown",
                _id: "5d983d4b3b75fd15e4dcf2a3",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/hairColor/dark_brown.png",
              },
              {
                name: "Medium Brown",
                _id: "5d983d4b3b75fd15e4dcf29e",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/hairColor/medium_brown.png",
              },
              {
                name: "Blue Black",
                _id: "5d9dde3fc0287330700d7c7c",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/hairColor/blue_black.jpg",
              },
              {
                name: "Light Brown",
                _id: "5e25751b2569112b38e1b304",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/hairColor/light_brown.jpg",
              },
              {
                name: "Blonde",
                _id: "5e25750d2569112b38e1b303",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/hairColor/blonde.jpg",
              },
              {
                name: "Grey",
                _id: "5e2574cd2569112b38e1b302",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/hairColor/grey.jpg",
              },
              {
                name: "Red",
                _id: "5e28308164a7512228490721",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/hairColor/reddish_blonde.jpg",
              },
            ],
            categoryId: "60546841e0646e2994cfb7b8",
            _id: "608ab22a118d8511941f024a",
          },
        },
        {
          questionId: "608ab60a118d8511941f024b",
          question: {
            optionTypeId: "60546863e0646e2994cfb7bf",
            isMultipleChoice: false,
            master_name: "master_eyecolor",
            input: "What's your eye color?",
            value: null,
            description: "",
            optionsData: [
              {
                name: "Black",
                _id: "5d983a873b75fd15e4dcf28f",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/eyeColor/black.png",
              },
              {
                name: "Dark Brown",
                _id: "5d983a873b75fd15e4dcf28e",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/eyeColor/dark-brown.png",
              },
              {
                name: "Light Brown",
                _id: "5d983a873b75fd15e4dcf28d",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/eyeColor/light-brown.png",
              },
              {
                name: "Hazel",
                _id: "5d983a873b75fd15e4dcf28c",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/eyeColor/hazel.png",
              },
              {
                name: "Grey",
                _id: "5d983a873b75fd15e4dcf290",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/eyeColor/gray.png",
              },
              {
                name: "Green",
                _id: "5d983a873b75fd15e4dcf291",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/eyeColor/green.png",
              },
              {
                name: "Blue",
                _id: "5d9e1ff602e20c16788bcba5",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/eyeColor/blue.png",
              },
            ],
            categoryId: "60546841e0646e2994cfb7b8",
            _id: "608ab60a118d8511941f024b",
          },
        },
      ],
    },
    {
      questions: [
        {
          questionId: "608bbe182831161efcb9a6c9",
          question: {
            optionTypeId: "60546863e0646e2994cfb7bf",
            isMultipleChoice: false,
            master_name: "master_bodytype",
            input: "What's your body type?",
            value: null,
            description: "",
            optionsData: [
              {
                name: "Thin",
                _id: "608bec98de32f077d5014000",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/bodyType/thin.jpg",
              },
              {
                name: "Average",
                _id: "608becb8de32f077d5014001",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/bodyType/average.jpg",
              },
              {
                name: "Athletic",
                _id: "608bec64de32f077d5013fff",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/bodyType/athletic.jpg",
              },
              {
                name: "Husky",
                _id: "608bec30de32f077d5013ffe",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/bodyType/husky.jpg",
              },
              {
                name: "Belly Fat",
                _id: "608becd6de32f077d5014002",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/bodyType/belly_fat.jpg",
              },
            ],
            categoryId: "60546841e0646e2994cfb7b8",
            _id: "608bbe182831161efcb9a6c9",
          },
        },
      ],
    },
    {
      questions: [
        {
          questionId: "608bc3362831161efcb9a6ca",
          question: {
            optionTypeId: "60546863e0646e2994cfb7bf",
            isMultipleChoice: true,
            master_name: "master_personality",
            input: "What's your personality type?",
            value: null,
            description: "",
            optionsData: [
              {
                name: "Classic & Elegant",
                _id: "5ec620ca5cc5252850af2a51",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/personality/Classic-and-elegent.jpg",
              },
              {
                name: "Trendy",
                _id: "5ec6214e5cc5252850af2a53",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/personality/Trendy.jpg",
              },
              {
                name: "Romantic & Expressive",
                _id: "5ec621785cc5252850af2a54",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/personality/Expressive.jpg",
              },
              {
                name: "Rugged Men",
                _id: "5ec622215cc5252850af2a56",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/personality/Rugged.jpg",
              },
              {
                name: "Delicate",
                _id: "5ec6223a5cc5252850af2a57",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/personality/Delicate.jpg",
              },
            ],
            categoryId: "60546841e0646e2994cfb7b7",
            _id: "608bc3362831161efcb9a6ca",
          },
        },
        {
          questionId: "608bef7d2831161efcb9a6cb",
          question: {
            optionTypeId: "60546863e0646e2994cfb7bf",
            isMultipleChoice: true,
            master_name: "master_perceivedstyle",
            input: "How would you like to be perceived professioally?",
            value: null,
            description: "",
            optionsData: [
              {
                name: "Trustworthy",
                _id: "5d98412a3b75fd15e4dcf2b0",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/perceivedstyle/Trustworthy.jpg",
              },
              {
                name: "Hard Working",
                _id: "5d98412a3b75fd15e4dcf2b1",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/perceivedstyle/Hardworking.jpg",
              },
              {
                name: "Sober",
                _id: "5d98412a3b75fd15e4dcf2b2",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/perceivedstyle/Sober.jpg",
              },
              {
                name: "Playful",
                _id: "5d98412a3b75fd15e4dcf2b3",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/perceivedstyle/Playful.jpg",
              },
              {
                name: "Fun",
                _id: "5d98412a3b75fd15e4dcf2b4",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/perceivedstyle/Fun.jpg",
              },
            ],
            categoryId: "60546841e0646e2994cfb7ba",
            _id: "608bef7d2831161efcb9a6cb",
          },
        },
      ],
    },
    {
      questions: [
        {
          questionId: "608bf1c82831161efcb9a6cc",
          question: {
            optionTypeId: "60546863e0646e2994cfb7bf",
            isMultipleChoice: false,
            master_name: "master_bodyproportion",
            input: "What's your body proportion?",
            value: null,
            description: "",
            optionsData: [
              {
                name: "Balanced Body",
                _id: "5d9786373563743450ab94a7",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/bodyProportion/Balanced-body.jpg",
              },
              {
                name: "Short Legs & Long Torso",
                _id: "5d9786373563743450ab94a9",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/bodyProportion/Long-torso-short-legs.png",
              },
              {
                name: "Long Legs & Short Torso",
                _id: "5d9786373563743450ab94a8",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/bodyProportion/Short-torso-long-legs.png",
              },
            ],
            categoryId: "60546841e0646e2994cfb7b8",
            _id: "608bf1c82831161efcb9a6cc",
          },
        },
        {
          questionId: "608bf3fb2831161efcb9a6cd",
          question: {
            optionTypeId: "60546863e0646e2994cfb7bf",
            isMultipleChoice: false,
            master_name: "master_necktype",
            input: "What's your neck type?",
            value: null,
            description: "",
            optionsData: [
              {
                name: "Short Neck",
                _id: "60546886e0646e2994cfb7c4",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/necktype/Short-neck-03.jpg",
              },
              {
                name: "Average Neck",
                _id: "60546886e0646e2994cfb7c5",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/necktype/Average-neck-02.jpg",
              },
              {
                name: "Long Neck",
                _id: "60546886e0646e2994cfb7c6",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/necktype/Long-neck-01.jpg",
              },
              {
                name: "Double Chin",
                _id: "60546886e0646e2994cfb7c7",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/necktype/Double-chin-01.jpg",
              },
            ],
            categoryId: "60546841e0646e2994cfb7b8",
            _id: "608bf3fb2831161efcb9a6cd",
          },
        },
      ],
    },
    {
      questions: [
        {
          questionId: "608bfaaa2831161efcb9a6cf",
          question: {
            optionTypeId: "60546863e0646e2994cfb7bf",
            isMultipleChoice: false,
            master_name: "master_facetype",
            input: "What's your face shape?",
            value: null,
            description: "",
            optionsData: [
              {
                name: "Oval",
                _id: "5d971840f9a1a12bd49f5d96",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/faceType/Oval.jpg",
              },
              {
                name: "Oblong",
                _id: "5ec372d83bc1331d845400c3",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/faceType/Oblong.jpg",
              },
              {
                name: "Triangle",
                _id: "5d9717a7f9a1a12bd49f5d93",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/faceType/Diamond.jpg",
              },
              {
                name: "Round",
                _id: "5d9717d8f9a1a12bd49f5d94",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/faceType/Round.jpg",
              },
              {
                name: "Square",
                _id: "5d971819f9a1a12bd49f5d95",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/faceType/Square.jpg",
              },
              {
                name: "Diamond",
                _id: "5d97185ff9a1a12bd49f5d97",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/faceType/Diamond.jpg",
              },
              {
                name: "Heart",
                _id: "5d971895f9a1a12bd49f5d98",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/faceType/Heart.jpg",
              },
            ],
            categoryId: "60546841e0646e2994cfb7b8",
            _id: "608bfaaa2831161efcb9a6cf",
          },
        },
      ],
    },
    {
      questions: [
        {
          questionId: "608bfef92831161efcb9a6d0",
          question: {
            optionTypeId: "60546863e0646e2994cfb7bf",
            isMultipleChoice: false,
            master_name: "master_hairstage",
            input: "Choose your hair growth?",
            value: null,
            description: "",
            optionsData: [
              {
                name: "Thick Hair",
                _id: "5ecd0997d4e7f426247858e6",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/HairStage/dp_thick_hair.jpg",
              },
              {
                name: "Mature Hairline",
                _id: "5ecd09ccd4e7f426247858e7",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/HairStage/dp_mature_hair.jpg",
              },
              {
                name: "Thin Hair",
                _id: "5ecd09e8d4e7f426247858e8",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/HairStage/dp_thin_hair.jpg",
              },
              {
                name: "Semi Bald",
                _id: "60c0c94bd52e8e2020e179f6",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/HairStage/dp_semi_bald.jpg",
              },
              {
                name: "Fully Bald",
                _id: "60c0c975d52e8e2020e179f7",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/HairStage/db_fully_bald.jpg",
              },
              {
                name: "Clean Shaved ",
                _id: "60c0c9acd52e8e2020e179f8",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/HairStage/dp_clean_shaved.jpg",
              },
            ],
            categoryId: "60546841e0646e2994cfb7b8",
            _id: "608bfef92831161efcb9a6d0",
          },
        },
      ],
    },
    {
      questions: [
        {
          questionId: "608c01f02831161efcb9a6d1",
          question: {
            optionTypeId: "60546863e0646e2994cfb7bf",
            isMultipleChoice: false,
            master_name: "master_hairtype",
            input: "What's your hair type?",
            value: null,
            description: "",
            optionsData: [
              {
                name: "Straight",
                _id: "608c023ade32f077d5014006",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/hairtype/Straight+hair.jpg",
              },
              {
                name: "Curly",
                _id: "608c026dde32f077d5014007",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/hairtype/Curly.jpg",
              },
              {
                name: "Wavy",
                _id: "60c0cdf7d52e8e2020e179f9",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/hairtype/Wavy.jpg",
              },
            ],
            categoryId: "60546841e0646e2994cfb7b8",
            _id: "608c01f02831161efcb9a6d1",
          },
        },
        {
          questionId: "60c1d6b71ede7a3740f41761",
          question: {
            optionTypeId: "60546863e0646e2994cfb7bf",
            isMultipleChoice: true,
            master_name: "master_hairlength",
            input: "What hair length do you prefer?",
            value: null,
            description: "",
            optionsData: [
              {
                name: "Short",
                _id: "60c1c16d1ede7a3740f4175f",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/hairLength/short_hair.jpg",
              },
              {
                name: "Medium",
                _id: "60c1c16d1ede7a3740f41760",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/hairLength/medium_hair.jpg",
              },
              {
                name: "Long",
                _id: "60c1e8091ede7a3740f4176a",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/hairLength/long_hair.jpg",
              },
            ],
            categoryId: "60546841e0646e2994cfb7b7",
            _id: "60c1d6b71ede7a3740f41761",
          },
        },
      ],
    },
    {
      questions: [
        {
          questionId: "608c06432831161efcb9a6d5",
          question: {
            optionTypeId: "60546863e0646e2994cfb7bf",
            isMultipleChoice: false,
            master_name: "master_beardtype",
            input: "What's your beard type?",
            value: null,
            description: "",
            optionsData: [
              {
                name: "Thick Beard",
                _id: "608c06f6de32f077d5014009",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/beardtype/thick.jpg",
              },
              {
                name: "Patchy Beard",
                _id: "608c0712de32f077d501400a",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/beardtype/patchy.jpg",
              },
              {
                name: "Can't Grow Beard",
                _id: "608c07502831161efcb9a6d6",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/beardtype/cant+grow.jpg",
              },
            ],
            categoryId: "60546841e0646e2994cfb7b8",
            _id: "608c06432831161efcb9a6d5",
          },
        },
        {
          questionId: "60c1ded31ede7a3740f41768",
          question: {
            optionTypeId: "60546863e0646e2994cfb7bf",
            isMultipleChoice: true,
            master_name: "master_beardlength",
            input: " What beard length do you prefer?",
            value: null,
            description: "",
            optionsData: [
              {
                name: "Trimmed",
                _id: "60c1cd69ae7ad024ecef9f54",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/beardlength/trimmed.jpg",
              },
              {
                name: "Medium",
                _id: "60c1cda0ae7ad024ecef9f55",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/beardlength/medium.jpg",
              },
              {
                name: "Heavy",
                _id: "60c1cdc2ae7ad024ecef9f56",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/beardlength/heavy.jpg",
              },
            ],
            categoryId: "60546841e0646e2994cfb7b7",
            _id: "60c1ded31ede7a3740f41768",
          },
        },
      ],
    },
    {
      questions: [
        {
          questionId: "60c1dfea1ede7a3740f41769",
          question: {
            optionTypeId: "60546863e0646e2994cfb7bf",
            isMultipleChoice: true,
            master_name: "master_faciallook",
            input: "Your facial hair preference?",
            value: null,
            description: "",
            optionsData: [
              {
                name: "Clean Shaved",
                _id: "5d983e633b75fd15e4dcf2a5",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/FacialHair/clean+shave.jpg",
              },
              {
                name: "Beard with moustache",
                _id: "5d983e633b75fd15e4dcf2a7",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/FacialHair/beard+with+moustache.jpg",
              },
              {
                name: "Only moustache",
                _id: "5d983e633b75fd15e4dcf2a6",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/FacialHair/only+moustache.jpg",
              },
              {
                name: "Not Sure",
                _id: "60c1c83dc51cb91c8cdf35eb",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/CommonImages/not_sure.jpg",
              },
            ],
            categoryId: "60546841e0646e2994cfb7b7",
            _id: "60c1dfea1ede7a3740f41769",
          },
        },
        {
          questionId: "60c1db5e1ede7a3740f41767",
          question: {
            optionTypeId: "60546863e0646e2994cfb7c0",
            isMultipleChoice: false,
            master_name: "master_skintype",
            input: "What's your Skin Type?",
            value: null,
            description: "",
            optionsData: [
              {
                name: "Dry Skin",
                _id: "60c1d9571ede7a3740f41762",
                image: "",
              },
              {
                name: "Oily Skin",
                _id: "60c1d9571ede7a3740f41763",
                image: "",
              },
              {
                name: "Sensitive",
                _id: "60c1d9571ede7a3740f41764",
                image: "",
              },
              {
                name: "Normal",
                _id: "60c1d9571ede7a3740f41765",
                image: "",
              },
              {
                name: "Not Sure",
                _id: "60c1d9571ede7a3740f41766",
                image: "",
              },
            ],
            categoryId: "60546841e0646e2994cfb7b8",
            _id: "60c1db5e1ede7a3740f41767",
          },
        },
      ],
    },
    {
      questions: [
        {
          questionId: "608c0d762831161efcb9a6d8",
          question: {
            optionTypeId: "60546863e0646e2994cfb7bf",
            isMultipleChoice: true,
            master_name: "master_productsubtype",
            input: "What's your preference for shoe styles?",
            value: null,
            description: "",
            optionsData: [
              {
                name: "Formal",
                _id: "5eeea8dc3762831c606d2c30",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFProductAttributeImages_2.0/Shoes/ProductSubType/formals.jpg",
              },
              {
                name: "Designer",
                _id: "5eeea99af724421c60fd596f",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFProductAttributeImages_2.0/Shoes/ProductSubType/designer.jpg",
              },
              {
                name: "Casual",
                _id: "5eeea99af724421c60fd5970",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFProductAttributeImages_2.0/Shoes/ProductSubType/casuals.jpg",
              },
              {
                name: "Trendy",
                _id: "5eeea99af724421c60fd5971",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFProductAttributeImages_2.0/Shoes/ProductSubType/trendy.jpg",
              },
            ],
            categoryId: "60546841e0646e2994cfb7b7",
            _id: "608c0d762831161efcb9a6d8",
          },
        },
        {
          questionId: "608cf9712831161efcb9a6e5",
          question: {
            optionTypeId: "60546863e0646e2994cfb7bf",
            isMultipleChoice: true,
            master_name: "master_productsubtype",
            input: "What type of eyewear you wear?",
            value: null,
            description: "",
            optionsData: [
              {
                name: "With Power",
                _id: "60c2f3b31ede7a3740f4176b",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFProductAttributeImages_2.0/EyeWear/ProductSubType/power.jpg",
              },
              {
                name: "Sunglasses",
                _id: "60c2f4001ede7a3740f4176c",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFProductAttributeImages_2.0/EyeWear/ProductSubType/sunglasses.jpg",
              },
              {
                name: "For Style",
                _id: "60c2f4271ede7a3740f4176d",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFProductAttributeImages_2.0/EyeWear/ProductSubType/for_style.jpg",
              },
              {
                name: "Not Sure",
                _id: "60c2f4781ede7a3740f4176e",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFProductAttributeImages_2.0/CommonImages/not_sure.jpg",
              },
            ],
            categoryId: "60546841e0646e2994cfb7b7",
            _id: "608cf9712831161efcb9a6e5",
          },
        },
      ],
    },
    {
      questions: [
        {
          questionId: "608cf1c22831161efcb9a6d9",
          question: {
            optionTypeId: "60546863e0646e2994cfb7bf",
            isMultipleChoice: true,
            master_name: "master_productsubtype",
            input: "What watch style would you prefer?",
            value: null,
            description: "",
            optionsData: [
              {
                name: "Digital",
                _id: "60c2f6c21ede7a3740f4176f",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFProductAttributeImages_2.0/Watches/ProductSubType/digital.jpg",
              },
              {
                name: "Tradititional",
                _id: "60c2f7b41ede7a3740f41770",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFProductAttributeImages_2.0/Watches/ProductSubType/traditional_watch.jpg",
              },
            ],
            categoryId: "60546863e0646e2994cfb7bf",
            _id: "608cf1c22831161efcb9a6d9",
          },
        },
        {
          questionId: "608cfbee2831161efcb9a6e6",
          question: {
            optionTypeId: "60546863e0646e2994cfb7bf",
            isMultipleChoice: true,
            master_name: "master_productsubtype",
            input: "Choose your watch type you prefer?",
            value: null,
            description: "",
            optionsData: [
              {
                name: "Formal",
                _id: "60c2f9761ede7a3740f41771",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFProductAttributeImages_2.0/Watches/ProductSubType/formal.jpg",
              },
              {
                name: "Casual",
                _id: "60c2f9bf1ede7a3740f41772",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFProductAttributeImages_2.0/Watches/ProductSubType/casual.jpg",
              },
              {
                name: "Sporty",
                _id: "60c2f9ef1ede7a3740f41773",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFProductAttributeImages_2.0/Watches/ProductSubType/sporty.jpg",
              },
              {
                name: "Festive",
                _id: "60c2fa1e1ede7a3740f41774",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFProductAttributeImages_2.0/Watches/ProductSubType/festive.jpg",
              },
            ],
            categoryId: "60546841e0646e2994cfb7b7",
            _id: "608cfbee2831161efcb9a6e6",
          },
        },
      ],
    },
    {
      questions: [
        {
          questionId: "608d314e2831161efcb9a6eb",
          question: {
            optionTypeId: "60546863e0646e2994cfb7c0",
            isMultipleChoice: true,
            master_name: "master_pricepoints",
            input: "What is your budget?",
            value: null,
            description: "",
            optionsData: [
              {
                name: "Affordable",
                _id: "608d3191de32f077d501400e",
                image: "",
              },
              {
                name: "Moderate",
                _id: "608d31b42831161efcb9a6ec",
                image: "",
              },
              {
                name: "Premium",
                _id: "608d31be2831161efcb9a6ed",
                image: "",
              },
              {
                name: "Luxury ",
                _id: "608d31c62831161efcb9a6ee",
                image: "",
              },
            ],
            categoryId: "60546841e0646e2994cfb7bb",
            _id: "608d314e2831161efcb9a6eb",
          },
        },
        {
          questionId: "608d33c12831161efcb9a6ef",
          question: {
            optionTypeId: "60546863e0646e2994cfb7bf",
            isMultipleChoice: true,
            master_name: "master_lifestyle",
            input: "What's your official dress code? ",
            value: null,
            description: "",
            optionsData: [
              {
                name: "Formals",
                _id: "605468a7e0646e2994cfb7c8",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/officialDressCode/formal.jpg",
              },
              {
                name: "Semi-Formals",
                _id: "605468a7e0646e2994cfb7c9",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/officialDressCode/semi-formal.jpg",
              },
              {
                name: "Smart Casuals",
                _id: "605468a7e0646e2994cfb7ca",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/officialDressCode/smart-casual.jpg",
              },
              {
                name: "Casuals",
                _id: "605468a7e0646e2994cfb7cb",
                image:
                  "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/officialDressCode/casual.jpg",
              },
            ],
            categoryId: "60546841e0646e2994cfb7bc",
            _id: "608d33c12831161efcb9a6ef",
          },
        },
      ],
    },
    {
      questions: [
        {
          questionId: "60c75a6e1ede7a3740f4177f",
          question: {
            optionTypeId: "608d388c2831161efcb9a6f5",
            isMultipleChoice: false,
            master_name: "saveProfilePicture",
            input: "Please upload your Image",
            value: null,
            description: "",
            optionsData: [],
            categoryId: "60546841e0646e2994cfb7be",
            _id: "60c75a6e1ede7a3740f4177f",
          },
        },
        {
          questionId: "62300d165417ab1e143a525d",
          question: {
            optionTypeId: "608d388c2831161efcb9a6f5",
            isMultipleChoice: false,
            master_name: "saveMiscPicture1",
            input: "Please upload other image 1",
            value: null,
            description: "",
            optionsData: [],
            categoryId: "60546841e0646e2994cfb7be",
            _id: "62300d165417ab1e143a525d",
          },
        },
        {
          questionId: "62300dd95417ab1e143a525e",
          question: {
            optionTypeId: "608d388c2831161efcb9a6f5",
            isMultipleChoice: false,
            master_name: "saveMiscPicture2",
            input: "Please upload other image 2",
            value: null,
            description: "",
            optionsData: [],
            categoryId: "60546841e0646e2994cfb7be",
            _id: "62300dd95417ab1e143a525e",
          },
        },
        {
          questionId: "62300e095417ab1e143a525f",
          question: {
            optionTypeId: "608d388c2831161efcb9a6f5",
            isMultipleChoice: false,
            master_name: "saveMiscPicture3",
            input: "Please upload other image 3",
            value: null,
            description: "",
            optionsData: [],
            categoryId: "60546841e0646e2994cfb7be",
            _id: "62300e095417ab1e143a525f",
          },
        },
      ],
    },
  ],
};

