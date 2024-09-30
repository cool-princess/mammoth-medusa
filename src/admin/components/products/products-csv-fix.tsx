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
