export enum AccountType {
  REGULATOR,
  FARMER,
  MANUFACTURER,
  RETAILER,
  CONSUMER,
  LOGISTICS,
  ORACLE,
}

export enum AccountStatus {
  PENDING,
  APPROVED,
  REJECTED,
}

export enum DocumentType {
  PROFILE = 1,
  PRODUCT = 2,
  TRACEABILITY = 3,
}

export enum DocumentStatus {
  Pending,
  Approved,
  Rejected,
}

export enum ProductCategory {
  FARMING,
  MANUFACTURING,
  SHIPPING,
  RETAILING,
  PURCHASING,
  RECALLING,
}

export enum SendProductStatus {
  PENDING,
  APPROVED,
  REJECTED,
}
