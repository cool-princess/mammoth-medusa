import { Tooltip } from '@medusajs/ui';
import { SelectValue } from "../products/products-csv-confirm";
import '../../styles/Products.css';

const ProductsTooltipUpdate = ({item, product, price}) => {
    return (
        <Tooltip className='p-0 border-none max-w-60' content={
            <div className='relative bg-white z-10 after:absolute after:content-[""] after:border-l after:border-b after:border-[#33BD49] after:bg-white after:w-4 after:h-4 after:left-2/4 after:-bottom-1.5 after:-translate-x-2/4 after:-rotate-45'>
                <h2 className='bg-[#33BD49] text-white p-2 ps-3'>Updated field</h2>
                <div className='bg-white border border-[#33BD49] box-border p-3 flex flex-col justify-start items-start'>
                    <p className='text-lg text-[#333333] text-left min-w-[10rem] line-through mb-2'>{product}</p>
                    <p className='text-lg text-[#333333] text-left min-w-[10rem]'>{item}</p>
                </div>
            </div>
        }>
            <div>
                (<SelectValue item={item} product={product} price={price} />) :
            </div>
        </Tooltip>
    );
};

export default ProductsTooltipUpdate;
