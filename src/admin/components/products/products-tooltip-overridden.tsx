import { Tooltip } from '@medusajs/ui';
import '../../styles/Products.css';

const ProductsTooltipOverridden = ({item}) => {
    return (
        <Tooltip className='p-0 border-none max-w-60' content={
            <div className='relative bg-white z-10 after:absolute after:content-[""] after:border-l after:border-b after:border-[#F2890E] after:bg-white after:w-4 after:h-4 after:left-2/4 after:-bottom-1.5 after:-translate-x-2/4 after:-rotate-45'>
                <h2 className='bg-[#F2890E] text-white p-2 ps-3'>Overridden(Won't import)</h2>
                <div className='bg-white border border-[#F2890E] p-3 flex flex-col justify-start items-start'>
                    <p className='text-xs text-[#999999] text-left mb-2'>Import value</p>
                    <p className='text-black line-through text-sm text-center'>{item}</p>
                </div>
            </div>
        }>
            <div className="no-update flex justify-center items-center w-full h-full"><p className='h-32 overflow-y-scroll w-full flex justify-center items-center text-[#F2890E] bg-[#FFF4E7] text-center'>{item}</p></div>
        </Tooltip>
    );
};

export default ProductsTooltipOverridden;
