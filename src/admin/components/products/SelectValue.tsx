import { useState, useCallback, useEffect, useRef } from 'react';
import { Label } from "@medusajs/ui";
import '../../styles/Products.css';

export function SelectValue({ itemName, productName, isUpdated, field, setUpdatedProductList, product }: any) {
    const [updateValue, setUpdateValue] = useState(itemName); 
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const containerRef = useRef(null);

    const [checkedValue, setCheckedValue] = useState(itemName); 

    console.log({ product }, "productSelect");

    // Handle select value click
    const handleSelectValue = useCallback(() => {
        setDropdownVisible(true);
    }, [isUpdated]);

    // Handle checkbox change and close the dropdown
    const handleCheckboxChange = useCallback((value) => {
        setCheckedValue(value); 
        setUpdateValue(value); 
        setDropdownVisible(false); 

        // Add or update the product in the updatedProductList
        setUpdatedProductList((prevList: any[]) => {
            const existingProductIndex = prevList.findIndex((p) => p.id === product.id);

            if (existingProductIndex !== -1) {
                const updatedList = [...prevList];
                updatedList[existingProductIndex] = { ...updatedList[existingProductIndex], [field]: value };
                return updatedList;
            } else {
                return [...prevList, { id: product.id, varientId: product.variants[0].id, [field]: value }];
            }
        });
    }, [product.id, setUpdatedProductList]);

    // Handle click outside to close the dropdown
    const handleClickOutside = useCallback((event) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
            setDropdownVisible(false);
        }
    }, []);

    // Add event listener for detecting clicks outside
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    return (
        <div className="relative" ref={containerRef}>
            <p
                className={`overflow-y-scroll flex justify-center items-center  ${
                    isUpdated ? "bg-[#FFF4E7] text-[#fb7e00]" : "bg-[#EEFDF1] text-[#33BD49]"
                } p-2 hover:cursor-pointer`}
                onClick={handleSelectValue}
            >
                {/* {
        // Check if the value is purely numeric, then divide by 100, otherwise just display the original value
        /^\d+$/.test(updateValue) 
            ? (updateValue / 100).toFixed(2)  // If it's purely numbers, divide by 100
            : updateValue  // Otherwise, display the original value
    } */}
    {updateValue}
            </p>

            {isDropdownVisible && (
                <div className="min-w-[250px] selectValue shadow-[0_0_15px_rgba(0,0,0,0.25)] overflow-y-scroll bg-white p-3 absolute left-2/4 -translate-x-1/2 -top-10 z-10">
                    <div className="keyName text-[#999999]">MAMMOTH VALUE</div>
                    <div className="flex items-center gap-x-3">
                        <Label className="text-[#333333] hover:text-[#000000] flex items-center">
                            <input
                                type="checkbox"
                                checked={checkedValue === productName} 
                                onChange={() => handleCheckboxChange(productName)}
                                className="mr-2"
                            />
                            {productName}
                        </Label>
                    </div>
                    <div className="keyName text-[#999999]">IMPORT VALUE</div>
                    <div className="flex items-center gap-x-3">
                        <Label className="text-[#333333] hover:text-[#000000] flex items-center">
                            <input
                                type="checkbox"
                                checked={checkedValue === itemName}
                                onChange={() => handleCheckboxChange(itemName)}
                                className="mr-2"
                            />
                            {itemName}
                        </Label>
                    </div>
                </div>
            )}
        </div>
    );
}
