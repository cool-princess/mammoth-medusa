import '../../styles/Products.css';
import HeadStatusCheck from "../shared/icons/head-status-check";

interface Products {
  id: number;
  title: string;
}

const products: Products[] = [
  { id: 1, title: "Fix Issues"},
  { id: 2, title: "Confirm Data"}
];

const ProductsImportStatus = ({stepNumber}) => {
  return (
    <div className="flex justify-end items-center">
      {products.map((product, index) => (
        <div key={index} className="flex justify-center items-center ms-10">
          <h2 className={`import-state-number ${product.id==stepNumber ? "active bg-[#F2890E] border-[#F2890E]" :""} flex justify-center items-center border rounded-full w-8 h-8 me-2 text-white text-lx bg-[#BBBBBB] border-[#BBBBBB]`}>
            {(product.id < stepNumber) ? (
              <HeadStatusCheck size={15} />           
            ) : (
              <>
                {product.id}
              </>
            )}
          </h2>
          <p className="text-lg">{product.title}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductsImportStatus
