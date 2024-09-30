export type Infiplex_whs_dsiauto = {
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

export type AdminDsiautoReq = {
    sku: string
    product_name: string
}

export type AdminDsiautoRes = {
    message: string
}