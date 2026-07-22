const USER_ROLES = Object.freeze({
  ADMIN: "admin",
  USER: "user",
  DRIVER: "driver",
});

const PRODUCT_STATUS = Object.freeze({
  AVAILABLE: "available",
  OUT_OF_STOCK: "out_of_stock",
  DISCONTINUED: "discontinued",
  ACTIVE: "active",
});

const ORDER_STATUS = Object.freeze({
  PENDING: "pending",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELED: "canceled",
});

const DELIVERY_PRIORITY = Object.freeze({
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
});

const DOCUMENT_TYPES = Object.freeze({
  DRIVER_LICENSE: "driver_license",
});

export {
  USER_ROLES,
  ORDER_STATUS,
  DELIVERY_PRIORITY,
  DOCUMENT_TYPES,
  PRODUCT_STATUS,
};
