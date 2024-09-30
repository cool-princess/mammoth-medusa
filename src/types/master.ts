export type Dsi_auto_master = {
    Manufacturer: string
    Sku: string
    ManufacturerPartNumber: string
    Name: string
    ShortDescription: string
    "UPC Code": GLint
    Price: GLfloat
    "Quoted $": GLfloat
    Weight: GLint
    "Weight x16": GLint
    Length: GLint
    Width: GLint
    Height: GLint
}

export type AdminMasterReq = {
    Manufacturer: string
    Sku: string
}

export type AdminMasterRes = {
    message: string
}