export interface OrderGridRow {
  id: number;
  orderNo: string;
  customerId: string;
  name: string;
  mobileNumber: string;
  products: string;
  totalValue: string;
  balance: string;
  stylistName: string;
  readyDate: string;
  trialDate: string;
  deliveryDate: string;
  eventDate: string;
  orderStatus: string;
}

export interface GetAllStoreOrders {
  getAllStoreOrders?: GetAllStoreOrdersEntity[] | null;
}
export interface GetAllStoreOrdersEntity {
  _id: string;
  userId: string;
  orderId:string;
  studioId?: string | null;
  customerId: string;
  customerPhone: string;
  customerEmail: string;
  customerHeight: number;
  customerWeight: number;
  customerLastName: string;
  customerFirstName: string;
  stylist:any[]
  orderStatus: string;
  customerPersonaIds?: null[] | null;
  personalStylistId?: null;
  orderTotal: number;
  afterChargesTotal: number;
  afterDeductionsTotal: number;
  deductions: number;
  deductionsBreakdown?: (DeductionsBreakdownEntity | null)[] | null;
  payment: number;
  paymentBreakdown?: (PaymentBreakdownEntity | null)[] | null;
  balanceAmount?: null;
  orderNo: number;
  orderDate?: TimeStampDate | null;
  orderItems?: (OrderItemsEntity | null)[] | null;
  eventDate?: TimeStampDate | null;
  readyDate?: TimeStampDate | null;
  deliveryDate?: TimeStampDate | null;
  trialDate?: TimeStampDate | null;
}
export interface DeductionsBreakdownEntity {
  amount: number;
  name: string;
  note: string;
}
export interface PaymentBreakdownEntity {
  note: string;
  amount: number;
  date: TimeStampDate;
  isAdvance?: null;
  modeOfPayment: string;
}

export interface TimeStampDate {
  timestamp: string;
}
export interface OrderItemsEntity {
  _id: string;
  itemName: string;
  itemPrice: number;
  itemColor: string;
  itemNumber: string;
  trialDate: TimeStampDate;
  fabricCode: string;
  fabricImage: string;
  fabricImageNote: string;
  styleDesignImage: string;
  styleDesignImageNote: string;
  referenceImage: string;
  referenceImageNote: string;
  itemCatId: string;
  outfitStatus: string;
}

export interface StoreProductOrderFilterInputParams {
  userId: String;
  orderStatus: String;
  startDeliveryDate: DateTimeSchemaInput;
  startOrderDate: DateTimeSchemaInput;
  startEventDate: DateTimeSchemaInput;
  startTrialDate: DateTimeSchemaInput;
  startReadyDate: DateTimeSchemaInput;
  endDeliveryDate: DateTimeSchemaInput;
  endOrderDate: DateTimeSchemaInput;
  endEventDate: DateTimeSchemaInput;
  endTrialDate: DateTimeSchemaInput;
  endReadyDate: DateTimeSchemaInput;
}

export interface DateTimeSchemaInput {
  day: number;
  month: number;
  year: number;
  hour: number;
  minute: number;
  datestamp: String;
  timestamp: String;
}

export interface TrackOrderGridData {
  id: string;
  orderNo: number;
  customerId: string;
  customerFirstName: string;
  itemNumber: string;
  itemName: string;
  itemColor: string;
  fabricCode: string;
  fabricImage: string;
  styleDesignImage: string;
  referenceImage: string;
  orderDate: string;
  readyDate: string;
  trialDate: string;
  outfitStatus: string;
}

export interface TrialGridRow {
  id: number;
  orderNo: string;
  customerId: string;
  name: string;
  products: string;
  totalValue: string;
  balance: string;
  stylistName: string;
  orderDate:string;
  trialDate: string;
  eventDate: string;
  status: string;
  trialRating:string;
  notes:string;
  measurement:string;
}


export interface CustomerInfoFormGridRow {
  id: number;
 
  customerId: string;
  name: string;
  products: string;
  totalValue: string;
  lookingFor:string;
  balance: string;
  stylistName: string;
  eventDate: string;

  notes:string;
 
}
