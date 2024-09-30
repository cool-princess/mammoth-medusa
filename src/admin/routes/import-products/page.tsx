import { useState } from 'react';
import { RouteConfig } from "@medusajs/admin"
import { DocumentSeries } from "@medusajs/icons"
import { Heading } from '@medusajs/ui';
import "react-csv-importer/dist/index.css";
import ProductsImportStatus from "../../components/products/products-head-status";
import CsvFix from "../../components/products/products-csv-fix";
import CsvConfirm from "../../components/products/products-csv-confirm";
import '../../styles/Products.css';

const ImportProducts = () => {
  const [stepData, setStepData] = useState(1);

  const handleData = (data) => {
    setStepData(data);
  };

  return (
    <div>
      <div className="productsTitleBar flex flex-col bg-[#EEEEEE] min-h-40 border-b-2 border-[#CCCCCC] p-10">
        <div className="mb-6">
            <div className="breadcrumbs flex justify-start items-center">
              <a href="" className='text-[#6FABFF]'>Catalog</a>
              <p className='text-[#BBBBBB] mx-3'>/</p>
              <a href="" className='text-[#6FABFF]'>Products</a>
              <p className='text-[#BBBBBB] mx-3'>/</p>
            </div>
        </div>
        <div className="statusBar w-full flex justify-between items-center">
          <div className="flex items-center">
              &nbsp;
              <Heading level="h1" className='text-4xl' style={{ cursor: "pointer"}}>Import Products</Heading>
          </div>
          <ProductsImportStatus stepNumber={stepData} />
        </div>
      </div>
        {(stepData == 1) &&
          <CsvFix setData={handleData} />
        }
        {(stepData == 2) &&
          <CsvConfirm setData={handleData} />
        }
    </div>
  );

}

export const config: RouteConfig = {
  link: {
    label: "Products Imports",
    icon: DocumentSeries,
  },
}
  
export default ImportProducts