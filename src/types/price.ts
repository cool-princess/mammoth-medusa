export type Buyers_price_list = {
    ItemPartNumber: string
    Description: string
    "Weight (lbs)": string
    ProductCode: string
    "Combine For Discount": string
    MinOrderQty: string
    SellInMultOfQty: string
    LastPriceAdjDate: string
    UPC: string
    ListPrice: string
    BreakQty01: string
    Amount01: string
    BreakQty02: string
    Amount02: string
    BreakQty03: string
    Amount03: string
    BreakQty04: string
    Amount04: string
    BreakQty05: string
    Amount05: string
    BreakQty06: string
    Amount06: string
    BreakQty07: string
    Amount07: string
    BreakQty08: string
    Amount08: string
    BreakQty09: string
    Amount09: string
    BreakQty10: string
    Amount10: string
    BreakQty11: string
    Amount11: string
}

export type AdminPriceReq = {
    ItemPartNumber: string
    UPC: string
}

export type AdminPriceRes = {
    message: string
}