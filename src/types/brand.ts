export type Brand = {
    id: String
    created_at: Date
    updated_at: Date
    name: string
    logo: string
    product_cnt: number
}

export type AdminBrandReq = {
    logo: string
    name: string
}

export type AdminBrandRes = {
    message: string
}

export type LogoModalProps = {
    brand: Brand
}
