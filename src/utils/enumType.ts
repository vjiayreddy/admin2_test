export enum RowTypeIndex {
  AllOrders = 0,
  DraftOrders = 1,
  RunningOrders = 2,
  UnconfirmedOrders = 3,
  HoldOrders = 4,
  AlterationsOrders = 5,
  DeliveredOrders = 6,
  ClosedOrders = 7,
}

export enum OrderStatus {
  AllOrders = "All Orders",
  DraftOrders = "Draft Orders",
  RunningOrders = "Running Orders",
  UnconfirmedOrders = "Unconfirmed Orders",
  HoldOrders = "Hold Orders",
  AlterationsOrders = "Alteration Orders",
  DeliveredOrders = "Delivered Orders",
  ClosedOrders = "Closed Orders",
}

export enum DateRangeType {
  ORDER = "Order",
  EVENT = "Event",
  READY = "Ready",
  DELIVERY = "Delivery",
  TRIAL = "Trial",
}

export enum ItemStatus {
  NOT_STARTED = "not_started",
  FABRIC_ORDERED = "fabric_ordered",
  FABRIC_RECIEVED = "fabric_received",
  EMB_OUTSOURCED = "emb_outsourced",
  EMB_RECEIEVED = "emb_received",
  OUTFIT_RECEIEVED = "outfit_received",
  QC_PENDING = "qc_pending",
  READY = "ready",
  TRIAL_OK = "trial_ok",
  TRIAL_ALT = "trial_alt",
  ALT_DONE = "alt_done",
  READY_POST_TRIAL = "ready_post_trial",
  CRITICAL_ISSUES = "critical_issue",
  STOCK_OUT = "stock_out",
  CLOSED = "closed",
  ITEM_OUT_SOURCED = "item_outsourced",
}
