import { Tooltip } from '@medusajs/ui';
import TooltipDataNoneIcon from "../shared/icons/tooltip-data-none-icon";
import '../../styles/Products.css';

const ProductsTooltipNone = () => {
    return (
        <Tooltip className='p-0 border-none max-w-60' content={
            <div className='relative bg-white z-10 after:absolute after:content-[""] after:border-l after:border-b after:border-red-500 after:bg-white after:w-4 after:h-4 after:left-2/4 after:-bottom-1.5 after:-translate-x-2/4 after:-rotate-45'>
                <h2 className='bg-red-500 text-white p-2 ps-3'>Required field missing</h2>
                <div className='bg-white border border-red-500 p-3 flex flex-col justify-start items-center'>
                    <p className='text-black'>Can be addressed later using “Fix Incomplete Data” feature</p>
                </div>
            </div>
        }>
            <div className="no-update flex justify-center items-center w-full h-full"><TooltipDataNoneIcon /><p></p></div>
        </Tooltip>
    );
};

export default ProductsTooltipNone;
