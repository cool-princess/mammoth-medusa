export type Infiplex_whs_buyers = {
    sku: string
    price: GLfloat
    can_purchase: GLfloat
    inventory: GLint
    cost: string
    lead_time: GLint
    retail_price: GLint
    safety_stock: string
    reorder_point: string
    bin_location: GLfloat
    product_name: string
}

export type AdminBuyersReq = {
    sku: string
    product_name: string
}

export type AdminBuyersRes = {
    message: string
}