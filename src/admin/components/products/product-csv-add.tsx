import { useState, useEffect } from "react";
import { Button } from "@medusajs/ui";
import {
  useAdminCreateProduct,
  useAdminProducts,
  useAdminUpdateProduct,
} from "medusa-react";
import ImportCheckIcon from "../shared/icons/import-check-icon";
import { ProductsShow } from "./products-show";
import Modal from "react-modal";
import ModalCloseIcon from "../shared/icons/modal-close-icon";
import ProductTable from "./product-table";
import axios from "axios";

const ProductCsvAdd = ({ setData }) => {
  const productObjTemplate = {
    title: "",
    handle: "",
    discountable: true,
    is_giftcard: false,
    description: "",
    height: 0,
    length: 0,
    hs_code: "",
    mid_code: "",
    origin_country: "US",
    options: [
      {
        title: "product_name",
      },
    ],
    variants: [
      {
        title: "",
        inventory_quantity: null,
        prices: [
          {
            amount: null,
            currency_code: "usd",
          },
        ],
        allow_backorder: false,
        sku: "",
        barcode: null,
        options: [
          {
            value: "",
          },
        ],
        ean: null,
        upc: null,
        hs_code: "",
        mid_code: "",
        origin_country: "US",
        manage_inventory: true,
      },
    ],
    metadata: {
      upc:  null,
      buyers_specs:  null,
    },
    status: "draft",
  };

  const createProduct = useAdminCreateProduct();
  // const updateProduct = useAdminUpdateProduct();
  const { products } = useAdminProducts();
  const [loading, setLoading] = useState(true);
  const [finalProductList, setFinalProductList] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [failedProductIndices, setFailedProductIndices] = useState([]);
  let [successCount, setSuccessCount] = useState(0);
  let [failureCount, setFailureCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [count, setCount] = useState(0);
  const [totalProductsExist, setTotalProductExist] = useState(0);

  // update product state
  const [updatedProductList, setUpdatedProductList] = useState([]);
  const [failedUpdateProductIndices, setFailedUpdateProductIndices] = useState([]);
  let [successUpdateCount, setSuccessUpdateCount] = useState(0);

  // update variant state
  const [updatedVariantList, setUpdatedVariantList] = useState([]);
  const [failedUpdateVariantIndices, setFailedUpdateVariantIndices] = useState([]);
  let [successUpdateVariantCount, setSuccessUpdateVariantCount] = useState(0);

  console.log(updatedVariantList, "updatedVariantList");

  // tables
  const dsiauto = ProductsShow("/dsiautos", "dsiauto")?.dsiautos;
  const buyers = ProductsShow("/buyerss", "buyers")?.buyerss;
  const infiplex = ProductsShow("/infiplexs", "infiplex")?.infiplexs;

  // dsiauto values
  const dsiautoMaster = ProductsShow("/masters", "master")?.masters;

  // buyers values
  const buyersItem = ProductsShow("/items", "item")?.items;
  const buyersSpec = ProductsShow("/specs", "spec")?.specs;
  // const buyersPrice = ProductsShow("/prices", "price")?.prices;

  // handle medusa product count change!
  useEffect(() => {
    setCount(count + 1);

    if (count > 1) {
      return;
    }
    if (count <= 1) {
      products && setTotalProductExist(products.length);
    }
  }, [products]);

  // Handle step back button
  const handleBackStep = () => {
    setData(1);
  };

  // Update infiplex
  const updateInfiplex = infiplex?.map((i: any) => {
    return {
      ...i,
      description: null,
      metadata: {}
    };
  });

  // Merge dsiauto and dsiautoMaster
  const updatedDsiautoValue = dsiauto?.map((dsi: any) => {
    const matchingSpec = dsiautoMaster.find(
      (spec: any) => spec.Sku === dsi.sku
    );

    return {
      ...dsi,
      Height: matchingSpec ? matchingSpec.Height : "",
      Length: matchingSpec ? matchingSpec.Length : "",
      Width: matchingSpec ? matchingSpec.Width : "",
      Weight: matchingSpec ? matchingSpec.Weight : "",
      UPC: matchingSpec ? matchingSpec.UPC : "",
      description: matchingSpec ? matchingSpec.ShortDescriotion : null,
      ProductBrand: matchingSpec ? matchingSpec.ProductBrand : "",
      SpecificationValue: "",
      SpecificationName: "",
      Unit: "",
      metadata: {
        upc: matchingSpec ? matchingSpec.UPC : "",
      }
    };
  });

  // Merge buyers, buyersSpec and buyersItem
  const updatedBuyersValue = buyers?.map((buyer: any) => {
    const matchingSpec =
      buyersSpec &&
      buyersSpec.find((spec: any) => spec.ItemPartNumber === buyer.sku);

    const matchingItem =
      buyersItem &&
      buyersItem.find((item: any) => item.ItemPartNumber === buyer.sku);

    return {
      ...buyer,
      SpecificationValue: matchingSpec ? matchingSpec.SpecificationValue : "",
      SpecificationName: matchingSpec ? matchingSpec.SpecificationName : "",
      Unit: matchingSpec ? matchingSpec.Unit : "",
      Weight: matchingItem ? matchingItem?.ItemShippingWeight : "",
      description: matchingItem ? matchingItem?.ProductShortDescription : null,
      CommonUse: matchingItem
        ? matchingItem?.ProductCommonUse1 +
          ", " +
          matchingItem?.ProductCommonUse2 +
          ", " +
          matchingItem?.ProductCommonUse3 +
          ", " +
          matchingItem?.ProductCommonUse4
        : "",
      UPC: matchingItem ? matchingItem.ItemUPC : "",
      ProductBrand: matchingItem ? matchingItem.ProductBrand : "",
      metadata: {
        buyers_specs: matchingSpec ? matchingSpec.SpecificationValue + " " + matchingSpec.Unit_Abbr + " " + matchingSpec.Unit : "",
      }
    };
  });

  // merge infiplex, updatedDsiautoValue and updatedBuyersValue
  useEffect(() => {
    if (
      updatedDsiautoValue &&
      updatedBuyersValue &&
      updateInfiplex &&
      products
    ) {
      const allProducts = [
        ...updatedDsiautoValue,
        ...updatedBuyersValue,
        ...updateInfiplex,
      ];

      const filteredProducts = allProducts.filter(
        (product) =>
          !products.some(
            (existingProduct) => existingProduct.handle === product.sku
          )
      );

      setNewProducts(filteredProducts);

      setFinalProductList(allProducts);
    }
  }, [
    dsiauto,
    buyers,
    infiplex,
    products,
    dsiautoMaster,
    buyersSpec,
    buyersItem,
  ]);

  const handleUpdateVariants = async (productId : any, product: any, variantId: any) => {
    setLoading(true);

    const API_URL = `http://localhost:9000/admin/products/${productId}/variants/${variantId}`;

    try {
      const response = await axios.post(
        API_URL,
        {
          prices: [
            {
              "amount": product.amount * 100,
              "currency_code": "usd"
          }
          ]
      },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // If successful, increment the success counter
      if (response.status === 200) {
        setSuccessUpdateVariantCount((prev) => prev + 1);
      }
    } catch (error) {
      // Handle error: increment the failure counter and store failed product ID
      setFailureCount((prev) => prev + 1);
      setFailedUpdateVariantIndices((prev) => [...prev, productId]);
    } finally {
      setLoading(false);
    }
  }

  // handle update products
  // NOTE: THIS "handleUpdateProducts" FUNCTION WILL CALL MULTIPLE TIME INSIDE "handleImportData" FUNCTION
  const handleUpdateProducts = async (productId: string, product: any) => {
    setLoading(true);

    const API_URL = `http://localhost:9000/admin/products/${productId}`;

    try {
      const response = await axios.post(
        API_URL,
        { title: product.title, description: product.description },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // If successful, increment the success counter
      if (response.status === 200) {
        setSuccessUpdateCount((prev) => prev + 1);
      }
    } catch (error) {
      // Handle error: increment the failure counter and store failed product ID
      setFailureCount((prev) => prev + 1);
      setFailedUpdateProductIndices((prev) => [...prev, productId]);
    } finally {
      setLoading(false);
    }
  };

  // Handle import Data button function
  const handleImportData = async () => {
    setShowModal(true);
    const failedIndices = [];
    setLoading(true);

    if (updatedProductList.length === 0) {
      setSuccessUpdateCount(0);
    }

    if (updatedVariantList.length === 0) {
      setSuccessUpdateVariantCount(0);
    }

    if (updatedVariantList) {
      for (const product of updatedVariantList) {
        handleUpdateVariants(product.id, product, product.varientId);
      }
      setUpdatedProductList([]);
    }

    if (updatedProductList) {
      for (const product of updatedProductList) {
        handleUpdateProducts(product.id, product);
      }
      setUpdatedVariantList([]);
    }

    const transformedProductList = newProducts.map((product) => ({
      ...productObjTemplate,
      description: product.description || null,
      handle: product.sku,
      title: product.product_name,
      options: [{ title: "product_name" }],
      variants: [
        {
          ...productObjTemplate.variants[0],
          title: product.product_name,
          inventory_quantity: parseInt(product.inventory),
          sku: product.sku,
          prices: [
            {
              amount: Math.round(product.price * 100),
              currency_code: "usd",
            },
          ],
          options: [{ value: product.product_name }],
         
        },
      ],
      metadata: {
        upc: product?.metadata?.upc || null,
        buyers_specs: product?.metadata?.buyers_specs || null,
      },
      status: "draft",
    }));

    for (const product of transformedProductList as any) {
      await new Promise((resolve) => {
        createProduct.mutate(product, {
          onSuccess: () => {
            setSuccessCount((prev) => prev + 1);
            resolve(true);
          },

          onError: () => {
            setFailureCount((prev) => prev + 1);
            failedIndices.push(product.handle);
            resolve(false);
          },
        });
      });
    }
    setLoading(false);
    setFailedProductIndices(failedIndices);
  };

  return (
    <div className="p-10 max-w-[76rem]">
      <div className="flex justify-between items-start mb-10">
        <div className="text-left w-96">
          <p className="text-black mb-10">
            Review the product data to be imported below. Note that all new
            imported products will be assigned an “Incomplete” listing status.
          </p>
        </div>
        <div className="products-import-possible flex justify-end items-center">
          <a
            href="#"
            onClick={handleBackStep}
            className="cancel hover:underline text-[#68A7FF] text-2xl"
          >
            Go Back
          </a>
          <Button
            className="continue flex justify-center items-center text-white bg-[#33BD49] ms-12 w-50 h-16 after:hidden shadow-none hover:bg-[#1c862e] rounded-none"
            onClick={handleImportData}
          >
            <ImportCheckIcon size={16} color="white" />
            <p className="ms-3 text-2xl text-white">Import Data</p>
          </Button>
        </div>
      </div>

      <div className="overflow-auto ">
        <ProductTable
          setUpdatedProductList={setUpdatedProductList}
          updatedProductList={updatedProductList}
          finalProductList={finalProductList}
          failedProductIndices={failedProductIndices}
          products={products}
          setUpdatedVariantList={setUpdatedVariantList}
        />
      </div>

      <Modal
        isOpen={showModal}
        onRequestClose={() => {
          setShowModal(false);
          setCount(0);
          setSuccessCount(0);
        }}
        contentLabel="Example Modal"
        className="attribute flex justify-between bg-white shadow-sm w-[50rem] h-[34rem] z-50"
        overlayClassName="overlay bg-black/75 fixed top-0 left-0 right-0 bottom-0"
      >
        <div className="close bg-gray-300 w-20 flex justify-center pt-8 h-full">
          <Button
            className="close-icon border border-solid rounded-none bg-transparent border-[#68A7FF] w-10 h-10 after:hidden shadow-none p-1 hover:bg-transparent"
            onClick={() => {
              setShowModal(false);
              setCount(0);
              setSuccessCount(0);
            }}
          >
            <ModalCloseIcon size={20} />
          </Button>
        </div>
        <div className="p-10 pb-16 inner flex flex-col justify-between overflow-scroll">
          <h2 className="text-4xl mb-10 pb-10 border-b border-dashed border-gray-400">
            Import Complete
          </h2>
          <div className="mb-10 p-1">
            <div className="w-full mb-10 flex items-center">
              <ImportCheckIcon size={20} color="#33BD49" />
              <p className="flex items-center ms-4">
                {totalProductsExist} existing products updated
              </p>
            </div>
            <div className="w-full mb-10 flex items-center">
              {!loading && <ImportCheckIcon size={20} color="#33BD49" />}
              <p className="flex items-center ms-4">
                {successCount} new products added with “Incomplete” status
              </p>
            </div>

            
          </div>
          <div className="products-import-possible flex justify-between items-center relative pt-10 border-t border-dashed border-gray-400">
            <Button
              className="fix flex justify-center items-center text-xl border border-solid rounded-none border-[#68A7FF] text-[#68A7FF] bg-white w-60 h-16 shadow-none after:hidden hover:bg-[#68A7FF] hover:text-white active:text-white active:bg-[#68A7FF]"
              onClick={handleBackStep}
            >
              Fix Incomplete Data
            </Button>
            <Button
              className="continue flex justify-center items-center text-xl border border-solid rounded-none border-[#68A7FF] text-white bg-[#68A7FF] w-50 h-16 shadow-none after:hidden hover:bg-white hover:text-[#68A7FF] active:text-[#68A7FF] active:bg-white"
              onClick={() => {
                setShowModal(false);
                setCount(0);
                setSuccessCount(0);
              }}
            >
              Close Window
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductCsvAdd;
