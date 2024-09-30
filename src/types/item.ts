export type Buyers_items = {
    ItemPartNumber: string
    ProductID: string
    ItemShortDescription: string
    ItemShippingWeight: GLint
    ItemShippingWeightUOM: string
    ItemUPC: string
    ItemCountryOfOrigin: string
    ItemHarmonizedTariffCode: string
    ProductShortDescription: string
    ProductMarketingCopy: string
    ProductCardDescription: string
    ProductBrand: string
    ProductCommonUse1: string
    ProductCommonUse2: string
    ProductCommonUse3: string
    ProductCommonUse4: string
    ProductFeatureBenefit1: string
    ProductFeatureBenefit2: string
    ProductFeatureBenefit3: string
    ProductFeatureBenefit4: string
    ProductFeatureBenefit5: string
    ProductFeatureBenefit6: string
    ProductFeatureBenefit7: string
    ProductFeatureBenefit8: string
    ProductFeatureBenefit9: string
    ProductFeatureBenefit10: string
    ProductFeatureBenefit11: string
    ProductFeatureBenefit12: string
    ProductURLSegment: string
    ProductPrimaryReportingCategory: string
    ProductMetaSentence: string
}

export type AdminItemReq = {
    ProductID: string
}

export type AdminItemRes = {
    message: string
}