export type Buyers_specs = {
    ItemPartNumber: string
    SpecificationName: string
    SpecificationValue: string
    Unit: string
    ProductPrimaryReportingCategory: string
    ProductID: string
    Unit_Abbr: string
    CustomerID: string
    PartNumber: string
}

export type AdminSpecReq = {
    ProductID: string
}

export type AdminSpecRes = {
    message: string
}