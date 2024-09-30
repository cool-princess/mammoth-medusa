import '../../styles/Products.css';

const ProductsTooltipNew = ({item}) => {
    return (
        <div className="flex justify-center items-center w-full h-full"><p className='h-32 overflow-y-scroll flex justify-center items-center'>{item}</p></div>
    );
};

export default ProductsTooltipNew;
