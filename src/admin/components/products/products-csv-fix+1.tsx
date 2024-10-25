import { useState, useRef } from 'react';
import { Table, Button, Input, Toaster, toast } from '@medusajs/ui';
import { useAdminCustomQuery, useAdminCustomPost, useMedusa, useAdminCreateProduct } from "medusa-react";
import { AdminBrandReq, AdminBrandRes } from "src/types/brand";
import { uniqBy } from "lodash";
import Modal from 'react-modal';
import ModalCloseIcon from "../shared/icons/modal-close-icon";
import FileUploadIcon from "../shared/icons/file-upload-icon";
import BtnContnueIcon from "../shared/icons/btn-continue-icon";
import '../../styles/Products.css';

Modal.setAppElement('#root');

export function BrandName({id, acronym, setAcronym}) {
    const { data, isLoading } = useAdminCustomQuery<any, any>('/brands', ["brand"]);
    import { useState, useMemo, useEffect } from 'react';
    import { useAdminProducts, useAdminCreateProduct, useAdminUpdateVariant, useAdminUpdateProduct } from "medusa-react";
    import { Table, Button } from '@medusajs/ui';
    import Modal from 'react-modal';
    import ModalCloseIcon from "../shared/icons/modal-close-icon";
    import ImportCheckIcon from "../shared/icons/import-check-icon";
    import { ProductsShow } from "../products/products-show";
    import { ProductsInsert } from "../products/products-insert";
    import { ProductsUpdate } from "../products/products-update";
    import ProductsTooltipUpdate from "../products/products-tooltip-update";
    import ProductsTooltipOverridden from "../products/products-tooltip-overridden";
    import ProductsTooltipNew from "../products/products-tooltip-new";
    import ProductsTooltipNone from "../products/products-tooltip-none";
    import { Label, RadioGroup } from "@medusajs/ui"
    import '../../styles/Products.css';
    
    Modal.setAppElement('#root');
    
    
    const CsvConfirm = ({setData}) => {
        const { products, isLoading } = useAdminProducts();
        const [modalIsOpen, setModalIsOpen] = useState(false);
        const createProduct = useAdminCreateProduct();
        const [productId, setProductId] = useState("");
        const [variantId, setVariantId] = useState("");
        const [productData, setProductData] = useState({});
        const [variantData, setVariantData] = useState({});
        const [count, setCount] = useState([0,0]);
        console.log({products});
        const closeModal = (e) => {
            e.preventDefault();
            setModalIsOpen(false);
        }
    
        useEffect(() => {
            if(productData || variantData) {
                ProductsUpdate(updateProduct, updateVariant, productData, variantData, variantId);
            }
        },[productId]);
        const updateProduct = useAdminUpdateProduct(productId);
        const updateVariant = useAdminUpdateVariant(productId);
        const [rowCount, setRowCount] = useState(100);
        const [currentPage, setCurrentPage] = useState(0);
        const keysToRemove = ["id", "created_at", "updated_at", "safety_stock", "retail_price", "lead_time", "cost", "bin_location", "reorder_point", "listPrice"];
        const dsiautoMaster = ProductsShow("/masters", "master")?.masters;
        const infiplexDsiauto = ProductsShow("/dsiautos", "dsiauto")?.dsiautos;
        const infiplexBuyers = ProductsShow("/buyerss", "buyers")?.buyerss;
        const buyersItem = ProductsShow("/items", "item")?.items;
        const buyersSpec = ProductsShow("/specs", "spec")?.specs;
        const buyersPrice = ProductsShow("/prices", "price")?.prices;
        const infiplexMain = ProductsShow("/infiplexs", "infiplex")?.infiplexs;
        console.log({infiplexMain});
        const missingValues = {
            sku: "",
            price: 0,
            can_purchase: 1,
            inventory: 10,
            safety_stock: "",
            reorder_point: "",
            product_name: "",
            brand: "",
            description: "",
            weight: 0,
            length: 0,
            width: 0,
            height: 0,
            commonUse: "",
            specificationName: "",
            specificationValue: "",
            unit: "",
            upc: "",
            listPrice: "",
        }
        const infiplexMainAllkeyObject = [];
        let infiplexMainNewObject = [];
        const infiplexMainMap = {};
        if(infiplexMain) {
            for (let i = 0; i < infiplexMain.length; i++) {
                let itemMain = infiplexMain[i];
                infiplexMainMap[itemMain.sku] = { ...missingValues, ...itemMain };
            }
        }
        const infiplexMainMapMerged = { ...infiplexMainMap };
    
        for (const key in infiplexMainMapMerged) {
            infiplexMainAllkeyObject.push(infiplexMainMapMerged[key]);
        }
    
        const infiplexMainKeyReduce = infiplexMainAllkeyObject.map((row, i) => Object.fromEntries(
            Object.entries(row)
            .map(([key, value]) => {
                return !keysToRemove.includes(key) ? [key, value] : null;
            })
            .filter(entry => entry !== null)
        ));
    
        if(infiplexMainKeyReduce) {
            for (let i = 0; i < infiplexMainKeyReduce.length; i++) {
                let itemMain = infiplexMainKeyReduce[i];
                if(infiplexDsiauto)
                    for (let j = 0; j < infiplexDsiauto.length; j++) {
                        let itemDsiauto = infiplexDsiauto[j];
                        if(itemMain.sku === itemDsiauto.sku && itemMain.can_purchase === 1) {
                            itemMain.inventory = itemDsiauto.inventory;
                        }
                    }
                if(infiplexBuyers)
                    for (let j = 0; j < infiplexBuyers.length; j++) {
                        let itemBuyers = infiplexBuyers[j];
                        if(itemMain.sku === itemBuyers.sku && itemMain.can_purchase === 1) {
                            itemMain.inventory = itemBuyers.inventory;
                        }
                    }
                if(dsiautoMaster)
                    for (let j = 0; j < dsiautoMaster.length; j++) {
                        let itemMaster = dsiautoMaster[j];
                        if(itemMain.sku === itemMaster.Sku && itemMain.can_purchase === 1) {
                            itemMain.description = itemMaster.ShortDescription;
                            itemMain.upc = itemMaster["UPC Code"];
                            itemMain.weight = itemMaster.Weight;
                            itemMain.height = itemMaster.Height;
                            itemMain.width = itemMaster.Width;
                            itemMain.length = itemMaster.Length;
                            itemMain.brand = itemMaster.Manufacturer;
                        }
                    }
                if(buyersItem)
                    for (let j = 0; j < buyersItem.length; j++) {
                        let itemBuyersItem = buyersItem[j];
                        if(itemMain.sku === itemBuyersItem.ItemPartNumber && itemMain.can_purchase === 1) {
                            itemMain.description = itemBuyersItem.ProductFeatureBenefit1 + "," + itemBuyersItem.ProductFeatureBenefit2 + "," + itemBuyersItem.ProductFeatureBenefit3 + "," + itemBuyersItem.ProductFeatureBenefit4 + "," + itemBuyersItem.ProductFeatureBenefit5 + "," + itemBuyersItem.ProductFeatureBenefit6 + "," + itemBuyersItem.ProductFeatureBenefit7 + "," + itemBuyersItem.ProductFeatureBenefit8 + "," + itemBuyersItem.ProductFeatureBenefit9 + "," + itemBuyersItem.ProductFeatureBenefit10 + "," + itemBuyersItem.ProductFeatureBenefit11 + "," + itemBuyersItem.ProductFeatureBenefit12;
                            itemMain.commonUse = itemBuyersItem.ProductCommonUse1 + "," + itemBuyersItem.ProductCommonUse2 + "," + itemBuyersItem.ProductCommonUse3 + "," + itemBuyersItem.ProductCommonUse4;
                        }
                    }
                if(buyersSpec)
                    for (let j = 0; j < buyersSpec.length; j++) {
                        let itemBuyersSpec = buyersSpec[j];
                        if(itemMain.sku === itemBuyersSpec.ItemPartNumber && itemMain.can_purchase === 1) {
                            itemMain.unit = itemBuyersSpec.Unit + "," + itemBuyersSpec.Unit_Abbr;
                        }
                    }
                if(buyersPrice)
                    for (let j = 0; j < buyersPrice.length; j++) {
                        let itemPrice = buyersPrice[j];
                        if(itemMain.sku === itemPrice.ItemPartNumber && itemMain.can_purchase === 1) {
                            itemMain.weight = itemPrice["Weight (lbs)"];
                            itemMain.upc = itemPrice.UPC;
                        }
                    }
                infiplexMainMap[itemMain.sku] = { ...itemMain };
            }
        }
    
        const infiplexMainMapJoin = { ...infiplexMainMap };
    
        for (const key in infiplexMainMapJoin) {
            infiplexMainNewObject.push(infiplexMainMapJoin[key]);
        }
    
        const keyToRemove = 'can_purchase';
    
        const infiplexMainFinalObject = infiplexMainNewObject.map((row, i) => Object.fromEntries(
            Object.entries(row)
            .map(([key, value]) => {
                return !keyToRemove.includes(key) ? [key, value] : null;
            })
            .filter(entry => entry !== null)
        ));
    
        let mainNewArray = [];
        infiplexMainFinalObject.map((row:any, i) => {
            let column = [];
            Object.values(row).map((value:string, i) => {
                column.push(value);
            });
            mainNewArray.push(column);
        });
    
        const pageCount = Math.ceil(mainNewArray.length / rowCount);
        const canNextPage = useMemo(
            () => currentPage < pageCount - 1,
            [currentPage, pageCount]
        )
        const canPreviousPage = useMemo(() => currentPage - 1 >= 0, [currentPage])
    
        const nextPage = () => {
            if (canNextPage) {
                setCurrentPage(currentPage + 1)
            }
        }
    
        const previousPage = () => {
            if (canPreviousPage) {
                setCurrentPage(currentPage - 1)
            }
        }
    
        const currentProducts = useMemo(() => {
            const offset = currentPage * rowCount
            const limit = Math.min(offset + rowCount, mainNewArray.length)
    
            return mainNewArray.slice(offset, limit)
        }, [currentPage, rowCount, mainNewArray]);
    
        console.log({currentProducts});
    
        const handleRowCountChange = (event) => {
            setRowCount(event.target.value);
        };
    
        const handleCompleteImport = (e) => {
            e.preventDefault();
            setModalIsOpen(true);
            let keyValue = [];
            const validIds = [];
            const data = [];
            document.querySelectorAll('#myTable tbody tr').forEach(row => {
                const obj = {};
                const cells = row.querySelectorAll('td');
                if(cells[1].querySelector('p'))
                    obj['sku'] = cells[1].querySelector('p').textContent;
                else
                    obj['sku'] = "";
                if(cells[2].querySelector('p'))
                    obj['price'] = parseInt(cells[2].querySelector('p').textContent);
                else
                    obj['price'] = 0;
                if(cells[3].querySelector('p'))
                    obj['inventory'] = parseInt(cells[3].querySelector('p').textContent);
                else
                    obj['inventory'] = 0;
                if(cells[4].querySelector('p'))
                    obj['title'] <String> = cells[4].querySelector('p').textContent;
                else
                    obj['title'] = "";
                if(cells[5].querySelector('p'))
                    obj['brand'] = cells[5].querySelector('p').textContent;
                else
                    obj['brand'] = "";
                if(cells[6].querySelector('p'))
                    obj['description'] = cells[6].querySelector('p').textContent;
                else
                    obj['description'] = "";
                if(cells[7].querySelector('p'))
                    obj['weight'] = parseFloat(cells[7].querySelector('p').textContent);
                else
                    obj['weight'] = "";
                if(cells[8].querySelector('p'))
                    obj['length'] = parseFloat(cells[8].querySelector('p').textContent);
                else
                    obj['length'] = 0;
                if(cells[9].querySelector('p'))
                    obj['width'] = parseFloat(cells[9].querySelector('p').textContent);
                else
                    obj['width'] = 0;
                if(cells[10].querySelector('p'))
                    obj['height'] = parseFloat(cells[10].querySelector('p').textContent);
                else
                    obj['height'] = 0;
                if(cells[11].querySelector('p'))
                    obj['commonUse'] = cells[11].querySelector('p').textContent;
                else
                    obj['commonUse'] = "";
                if(cells[12].querySelector('p'))
                    obj['specificationName'] = cells[12].querySelector('p').textContent;
                else
                    obj['specificationName'] = "";
                if(cells[13].querySelector('p'))
                    obj['specificationValue'] = cells[13].querySelector('p').textContent;
                else
                    obj['specificationValue'] = "";
                if(cells[14].querySelector('p'))
                    obj['unit'] = cells[13].querySelector('p').textContent;
                else
                    obj['unit'] = "";
                if(cells[15].querySelector('p'))
                    obj['upc'] = cells[13].querySelector('p').textContent;
                else
                    obj['upc'] = "";
                data.push(obj);
            });
            data.forEach((row:any, i) => {
                const temp = [];
                for (const [key, value] of Object.entries(row)) {
                    temp[key] = value;
                }
                keyValue.push(temp);
            });
            
            keyValue.forEach((items) => {
                if(products && products.length > 0) {
                    if(products.map(product => product.subtitle).includes(items["sku"]))
                        products.forEach((product) => {
                            if(items["sku"] == product.subtitle) {
                                if((items["title"] != product.title) || (items["price"] != product.variants[0].prices[0].amount) || (items["inventory"] != product.variants[0].inventory_quantity) || (items["specificationName"] != product.variants[0].metadata.specificationName) || (items["specificationValue"] != product.variants[0].metadata.specificationValue) || (items["description"] != product.description) || (items["unit"] != product.metadata["attribute3"]["value"]) || (items["upc"] != product.metadata["attribute1"]["value"]) || (items["weight"] != product.weight) || (items["length"] != product.length) || (items["width"] != product.width) || (items["height"] != product.height) || (items["commonUse"] != product.metadata["attribute2"]["value"])) {
                                    setProductId(product.id);
                                    setVariantId(product.variants[0].id);
                                    setCount([count[0], ++count[1]]);
                                    setProductData(
                                        {
                                            title: items["title"],
                                            handle: "update-" + items["title"],
                                            description: items["description"],
                                            metadata: {
                                                attribute1: {
                                                    key: "UPC",
                                                    value: items["upc"]
                                                },
                                                attribute2: {
                                                    key: "Common Uses",
                                                    value: items["commonUse"]
                                                },
                                                attribute3: {
                                                    key: "UNIT",
                                                    value: items["unit"]
                                                },
                                            },
                                            weight: items["weight"],
                                            length: items["length"],
                                            width: items["width"],
                                            height: items["height"]
                                        }
                                    );
                                    setVariantData(
                                        {   
                                            variant_id: variantId,
                                            title: items["title"],
                                            inventory_quantity: items["inventory"],
                                            amount: items["price"],
                                            specificationName: items["specificationName"],
                                            specificationValue: items["specificationValue"]
                                        }
                                    );
                                }
                            }
                        });
                    else {
                        ProductsInsert(createProduct, items);
                        setCount([++count[0], count[1]]);
                    }
                }
                else {
                    ProductsInsert(createProduct, items);
                    setCount([++count[0], count[1]]);
                }
            });
        }
        const handleGoProduct = () => {
            setModalIsOpen(false);
            setData(1);
        }
    
        const handleBackStep = () => {
            setData(1);
        }
    
        return (
            <div className='relative p-10'>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                    className="attribute flex justify-between bg-white shadow-sm w-[60rem] h-[40rem] z-50"
                    overlayClassName="overlay bg-black/75 fixed top-0 left-0 right-0 bottom-0"
                >
                    <div className="close bg-gray-300 w-16 flex justify-center pt-8 h-full">
                        <Button className="close-icon border border-solid rounded-none bg-transparent border-[#68A7FF] w-10 h-10 after:hidden shadow-none p-1 hover:bg-transparent" onClick={closeModal}>
                            <ModalCloseIcon size={20} />
                        </Button>
                    </div>
                    <div className='p-10 pb-16 inner flex flex-col justify-between overflow-scroll'>
                        <h2 className='text-4xl mb-10 pb-10 border-b border-dashed border-gray-400'>Import Complete</h2>
                        <div className="mb-10 p-1">
                            <div className='w-full mb-10 flex items-center'>
                                <ImportCheckIcon size={20} color="#33BD49" />
                                <p className='flex items-center ms-4'>{count[1]} existing products updated</p>
                            </div>
                            <div className='w-full mb-10 flex items-center'>
                                <ImportCheckIcon size={20} color="#33BD49" />
                                <p className='flex items-center ms-4'>{count[0]} new products added with “Incomplete” status</p>
                            </div>
                        </div>
                        <div className="products-import-possible flex justify-between items-center relative pt-10 border-t border-dashed border-gray-400">
                            <Button className="fix flex justify-center items-center text-xl border border-solid rounded-none border-[#68A7FF] text-[#68A7FF] bg-white w-60 h-16 shadow-none after:hidden hover:bg-[#68A7FF] hover:text-white active:text-white active:bg-[#68A7FF]" onClick={handleBackStep}>Fix Incomplete Data</Button>
                            <Button className="continue flex justify-center items-center text-xl border border-solid rounded-none border-[#68A7FF] text-white bg-[#68A7FF] w-50 h-16 shadow-none after:hidden hover:bg-white hover:text-[#68A7FF] active:text-[#68A7FF] active:bg-white" onClick={handleGoProduct}>Close Window</Button>
                        </div>
                    </div>
                </Modal>
                <div className="flex justify-between items-start mb-10">
                    <div className="text-left">
                        <p className='text-black mb-10'>Review the product data to be imported below. Note that all new imported<br /> products will be assigned an “Incomplete” listing status.</p>
                        <label className='flex items-center'>
                            Rows per page:&nbsp;&nbsp;
                            <select value={rowCount} onChange={handleRowCountChange} className='w-30 h-10 border border-solid border-gray-500'>
                                <option value="10000000000">All products</option>
                                <option value={10}>10</option>
                                <option value={100}>100</option>
                                <option value={200}>200</option>
                                <option value={500}>500</option>
                                <option value={1000}>1000</option>
                                <option value={5000}>5000</option>
                            </select>
                        </label>
                    </div>
                    <div className="products-import-possible flex justify-end items-center">
                        <a href="#" onClick={handleBackStep} className="cancel hover:underline text-[#68A7FF] text-2xl">Go Back</a>
                        <Button className="continue flex justify-center items-center text-white bg-[#33BD49] ms-12 w-50 h-16 after:hidden shadow-none hover:bg-[#1c862e] rounded-none" onClick={handleCompleteImport}>
                            <ImportCheckIcon size={16} color="white" />
                            <p className='ms-3 text-2xl text-white'>Import Data</p>
                        </Button>
                    </div>
                </div>
                <div className='flex flex-col flex-nowrap overflow-scroll product-table max-w-[83.5vw] max-h-[100vh]'>
                    <Table id='myTable'>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell className='bg-[#666666] text-white text-center border-[#CCCCCC] border !px-2'>PRODUCT</Table.HeaderCell>
                                {infiplexMainFinalObject.map((row:any, i) => (
                                    i == 0 && Object.keys(row).map((value:string, i) => (
                                        <Table.HeaderCell className='bg-[#666666] text-white text-center border-[#CCCCCC] border !px-2' key={i}>{value}</Table.HeaderCell>
                                ))))}
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {currentProducts.map((row, index) => (
                                products && products.map(product => product.subtitle).includes(row[0]) ?
                                    (<Table.Row key={index}>
                                        <Table.Cell className='border-[#CCCCCC] border !p-2 no-update bg-[#F7F7F7]'><p className="flex justify-center items-center text-[#F2890E]">Updated</p></Table.Cell>
                                        {row.map((item, i) => (
                                            products.map((product) => (
                                                row[0] == product.subtitle &&
                                                <Table.Cell key={i} className='border-[#CCCCCC] border !p-0 relative'>
                                                    {!(item == null) ? (
                                                        (i == 1 && product.variants[0].prices[0].amount !== Math.round(item)) ? (
                                                            <ProductsTooltipUpdate item={Math.round(item)} product={product.variants[0].prices[0].amount} />
                                                        ) :
                                                        (i == 2 && product.variants[0].inventory_quantity !== item) ? 
                                                        (<ProductsTooltipUpdate item={item} product={product.variants[0].inventory_quantity} />
                                                        ) :
                                                        (i == 3 && product.title !== item) ? 
                                                        (<ProductsTooltipUpdate item={item} product={product.title} />
                                                        ) :
                                                        (i == 4) ? 
                                                        (<ProductsTooltipOverridden item="AMP" />
                                                        ) : 
                                                        (i == 5 && product.description !== item) ? 
                                                        (<ProductsTooltipUpdate item={item} product={product.description} />
                                                        ) : 
                                                        (i == 6 && product.weight !== item) ? 
                                                        (<ProductsTooltipUpdate item={item} product={product.weight} />
                                                        ) : 
                                                        (i == 7 && product.length !== item) ? 
                                                        (<ProductsTooltipUpdate item={item} product={product.length} />
                                                        ) : 
                                                        (i == 8 && product.width !== item) ? 
                                                        (<ProductsTooltipUpdate item={item} product={product.width} />
                                                        ) : 
                                                        (i == 9 && product.height !== item) ? 
                                                        (<ProductsTooltipUpdate item={item} product={product.height} />
                                                        ) : 
                                                        (i == 10 && product.metadata["attribute2"]["value"] !== item) ? 
                                                        (<ProductsTooltipUpdate item={item} product={product.metadata["attribute2"]["value"]} />
                                                        ) : 
                                                        (i == 11 && product.variants[0].metadata["specificationName"] !== item) ? 
                                                        (<ProductsTooltipUpdate item={item} product={product.variants[0].metadata["specificationName"]} />
                                                        ) : 
                                                        (i == 12 && product.variants[0].metadata["specificationValue"] !== item) ? 
                                                        (<ProductsTooltipUpdate item={item} product={product.variants[0].metadata["specificationValue"]} />
                                                        ) : 
                                                        (i == 13 && product.metadata["attribute3"]["value"] !== item) ? 
                                                        (<ProductsTooltipUpdate item={item} product={product.metadata["attribute3"]["value"]} />
                                                        ) : 
                                                        (i == 14 && product.metadata["attribute1"]["value"] !== item) ? 
                                                        (<ProductsTooltipUpdate item={item} product={product.metadata["attribute1"]["value"]} />
                                                        ) : 
                                                        (<ProductsTooltipOverridden  item={item}/>
                                                        )
                                                    ) : (
                                                        <ProductsTooltipNone />
                                                    )}
                                                </Table.Cell>
                                            ))
                                        ))}
                                    </Table.Row>
                                    ) : (<Table.Row key={index}>
                                            <Table.Cell className='border-[#CCCCCC] border !p-2 no-update bg-[#F7F7F7]'><p className="flex justify-center items-center text-[#33BD49]">New</p></Table.Cell>
                                            {row.map((item, i) => (
                                                <Table.Cell key={i} className='border-[#CCCCCC] border !p-2 no-update'>
                                                    {(i == 1) ? 
                                                        (<ProductsTooltipNew  item={Math.round(item)}/>)
                                                        : (
                                                            <ProductsTooltipNew  item={item}/>
                                                        )}
                                                </Table.Cell>
                                            ))}
                                        </Table.Row>
                                    )
                                )
                            )}
                        </Table.Body>
                    </Table>
                </div>
                <div className="pagination">
                    <Table.Pagination
                        count={mainNewArray.length}
                        pageSize={rowCount}
                        pageIndex={currentPage}
                        pageCount={pageCount}
                        canPreviousPage={canPreviousPage}
                        canNextPage={canNextPage}
                        previousPage={previousPage}
                        nextPage={nextPage}
                    />
                </div>
            </div>
        );
    };
    
    export default CsvConfirm;
    
    function makeAcronym (id, params) {
        var acronymMade = [];
        var tempAcronym = acronymMade.concat(params.split(" ")
        .map(word => word.charAt(0).toUpperCase())
        .join(""));
        var newAcronym = tempAcronym.concat(params.split(" "));
        setAcronym((prevState) => ({
            ...prevState,
            [id]: newAcronym,
        }));
    }

    const handleGetAcronymBrand = (e) => {
        const words = e.target.value;
        makeAcronym(id, words);
    }

    return (
        <select className='w-3/5 h-12 border border-solid border-gray-400' onChange={handleGetAcronymBrand}>
            {data?.brands.map((value) => (
                <option key={value.id} value={value.name}>
                    {value.name}
                </option>
            ))}
            <option value="don't map">Don't Map</option>
        </select>
    )
}

const CsvFix = ({setData}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => setModalIsOpen(true);
    const closeModal = (e) => {
        e.preventDefault();
        setModalIsOpen(false);
        setImg(null);
    }
    const fileInputRef = useRef(null);
    const [img, setImg] = useState(null);
    const [selectedImg, setSelectedImg] = useState<string | null>(null);
    const { client } = useMedusa();
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const { data, isLoading } = useAdminCustomQuery<any, any>("/masters", ["master"]);
    const [previewImg, setPreviewImg] = useState('');
    const [acronym, setAcronym] = useState({});

    async function uploadImage() {
        let holdReturn = "";
        await client.admin.uploads.create(img).then(({ uploads }) => {
            holdReturn = uploads[0].url;
        });

        return holdReturn;
    }
        
    const handleNewBrand = (e) => {
        e.preventDefault();
        setModalIsOpen(true);
    }

    const handleBackStep = () => {
        setData(1);
    }

    const handleCsvFix = () => {
        setData(2);
    }

    const handleImgChange = (e) => {
        const file = e.target.files[0];
        setImg(file);
        setSelectedImg(URL.createObjectURL(file));
        setPreviewImg(URL.createObjectURL(file));
    };

    const handleBrandNameChange = (e) => {
        setSelectedBrand(e.target.value);
    }

    const { mutate } = useAdminCustomPost<
    AdminBrandReq,
    AdminBrandRes
    >(
        "/admin/brands/posts",
        ["brand-update"]
    );

    const handleBrandMapping = async (e) => {
        e.preventDefault();

        let imgURL = "";
        if (img !== selectedImg) {
            imgURL = await uploadImage();
        }
        else {
            imgURL = img ? img : "";
        }
        try {
            const post = {
                logo: imgURL,
                name: selectedBrand
            };
            mutate(post, {
                onSuccess: (response) => {
                    toast.success("Success", {
                        description: "Added New Brand Sucessfully.",
                        duration: 3000,
                    });
                },
            });
        } catch (error) {
            toast.error("Error", {
                description: "Error Adding New Brand.",
                duration: 5000,
            })
        }
        setModalIsOpen(false);
        setPreviewImg("");
    }

    return (
        <div className='relative p-10'>
        <Toaster />
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            className="attribute flex justify-between bg-white shadow-sm w-[60rem] h-[40rem]"
            overlayClassName="overlay bg-black/75 fixed top-0 left-0 right-0 bottom-0"
        >
            <div className="close bg-gray-300 w-16 flex justify-center pt-8 h-full">
                <Button className="close-icon border border-solid rounded-none bg-transparent border-[#68A7FF] w-10 h-10 hover:bg-sky-800 after:hidden shadow-none hover:bg-transparent" onClick={closeModal}>
                    <ModalCloseIcon size={20} />
                </Button>
            </div>
            <div className='p-10 pb-16 inner flex flex-col justify-between overflow-scroll'>
                <h2 className='text-3xl text-black mb-10'>Map Value to Brand</h2>
                <div className="mb-10 p-10 border-t border-b border-dashed border-gray-400">
                    <div className='w-full mb-10'>
                        <p className='flex items-center mb-4'>Imported value</p>
                        <p><strong className='text-xl'>BPC</strong></p>
                    </div>
                    <div className='w-full mb-10'>
                        <p className='flex items-center mb-4'><strong className='text-red-700'>*</strong>Imported value</p>
                        <input type="text" className='w-full h-10 border border-solid border-gray-400 px-2.5' placeholder="Buyer's Products Company" onChange={handleBrandNameChange}/>
                    </div>
                    <div>
                        <p className='flex items-center mb-4'>New brand logo</p>
                        <Button className="w-fit flex items-center upload-img p-3 border border-solid border-[#68A7FF] bg-transparent shadow-none hover:bg-transparent" onClick={()=>fileInputRef.current.click()}>
                        <FileUploadIcon size={20} />
                            <p className='text-[#68A7FF] ms-3'>Upload Image</p>
                        </Button>
                        <img src={previewImg} id="blah" className={`w-32 h-32 justify-center items-center mt-4 ${img ? "flex" : ""}`} alt="your image" hidden />
                        <Input onChange={handleImgChange} id="picture" accept="image/gif, image/jpeg, image/png, image/webp" multiple={false} ref={fileInputRef} type="file" hidden />
                        </div>
                </div>
                <div className="products-import-possible flex justify-between items-center relative">
                    <a href="" onClick={closeModal} className="cancel text-gray-500 text-2xl">Cancel</a>
                    <Button className="continue flex justify-center items-center text-xl text-white bg-[#68A7FF] w-60 h-16 shadow-none disabled:border-none after:hidden border border-solid rounded-none border-[#68A7FF] hover:bg-white hover:text-[#68A7FF] active:text-[#68A7FF] active:bg-white" onClick={handleBrandMapping}>Confirm Mapping</Button>
                    <p className='right-0 -bottom-8 text-right absolute text-gray-400'>New brand will be created</p>
                </div>
            </div>
        </Modal>
        <div className="flex justify-between items-center mb-8">
            <div className="match-issue w-6/12">
                <p className='text-red-600 mb-5'>
                    ISSUE: 6 unrecognized brands
                </p>
                <p>
                    We couldn't recognize the following brands from your import select on existing <br />brand for each or add a new brand
                </p>
            </div>
            <div className="products-import-possible flex justify-end items-center w-4/12">
                <a href="#" onClick={handleBackStep} className="cancel text-[#68A7FF] text-2xl">Go Back</a>
                <Button className="continue flex justify-center items-center text-white bg-[#68A7FF] ms-12 w-40 h-16 shadow-none disabled:border-none rounded-none disabled:bg-gray-300 disabled:hover:bg-gray-300 hover:bg-sky-800" onClick={handleCsvFix}>
                    <p className='me-4 text-xl text-white'>Continue</p>
                    <BtnContnueIcon size={15} />
                </Button>
            </div>
        </div>
        <div className='flex flex-nowrap overflow-x-scroll product-table max-w-[83.5vw] max-h-[100vh]'>
            <Table>
                <Table.Header>
                    <Table.Row>
                            <Table.HeaderCell className='bg-[#666666] text-white text-center border-[#e7e0e0] border !px-2'>
                                IMPORTED BRAND NAME
                            </Table.HeaderCell>
                            <Table.HeaderCell className='bg-[#666666] text-white text-center border-[#e7e0e0] border !px-2'>
                                MAP TO BRAND
                            </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {uniqBy(data?.masters, "Manufacturer").map((master:any, index) => (
                        <Table.Row key={index}>
                            <Table.HeaderCell className='border-[#e7e0e0] border !px-2'>
                                <div className="flex justify-between items-center p-2">
                                    <div className="brand-name">
                                        {master.Manufacturer}
                                    </div>
                                    {(acronym[0] && master.Manufacturer.split(" ").length > 1 && master.Manufacturer.split(" ").some(item => acronym[0].includes(item))) ? (
                                                <div className="matched-status border border-solid border-[#F2890E] rounded-3xl p-3 p-y-2 bg-[#FFEFDD] text-[#F2890E]">
                                                    Auto-Matched
                                                </div>
                                        ) : (
                                            acronym[index] && acronym[index].includes(master.Manufacturer) &&
                                                <div className="matched-status border border-solid border-[#F2890E] rounded-3xl p-3 p-y-2 bg-[#FFEFDD] text-[#F2890E]">
                                                    Auto-Matched
                                                </div>
                                            
                                    )}
                                </div>
                            </Table.HeaderCell>
                            <Table.HeaderCell className='border-[#e7e0e0] border !px-2'>
                                <div className="flex justify-between items-center p-2">
                                    <BrandName id={index} acronym={acronym} setAcronym={setAcronym} />
                                    <div className="matched-Add">
                                        <a href="" className="flex justify-center items-center text-[#68A7FF]" onClick={handleNewBrand}>Add new</a>
                                    </div>
                                </div>
                            </Table.HeaderCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    </div>
    );
};

export default CsvFix;
