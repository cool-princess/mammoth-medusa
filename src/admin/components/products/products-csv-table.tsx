import React, { useState, useEffect } from 'react';
import { Table, Button, Select, RadioGroup, Label } from '@medusajs/ui';
import "react-csv-importer/dist/index.css";
import '../../styles/Products.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLong, faHourglassStart, faFileUpload, faCheck, faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { useAdminUploadFile, useAdminCreateBatchJob, useAdminBatchJob, useAdminConfirmBatchJob } from "medusa-react"
import Papa from 'papaparse';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const CsvTable = ({csvData, setData}) => {
  const [rowCount, setRowCount] = useState(10);
  const [attributeChange, setAttributeChange] = useState({});
  const [attributeShow, setAttributeShow] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const [options, setOptions] = useState([
    { value: 'Ignore Column', label: 'Ignore Column'},
    { value: 'attribute', label: 'Arrtibute'},
    { value: 'Brand', label: 'Brand'},
    { value: 'Description', label: 'Description'}
  ]);

  const optionsAttribute = [
      { value: 'Ignore Column', label: 'Ignore Column'},
      { value: 'attribute', label: 'Arrtibute'},
      { value: 'Brand', label: 'Brand'},
      { value: 'Description', label: 'Description'},
      { value: 'new-attribute', label: 'New attribute'}
  ];

  const handleRowCountChange = (event) => {
    setRowCount(event.target.value);
  };

  const handleAttributeChange = (id, event) => {
    const value = event.target.value;
    setAttributeChange((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    if(value == "attribute") {
        setModalIsOpen(true);
    }

  };

  const handleAttributeNew = (event) => {
    if(event.target.value == "new-attribute") {
        setAttributeShow(true);
    }
    else {
        setAttributeShow(false);
    }
  }

  const handleAttributeAdded = () => {
    const newItem = { value: `Item ${options.length + 1}`, label: `Item ${options.length + 1}` };
    setOptions((prevOptions) => [...prevOptions, newItem]);
    setModalIsOpen(false);
  }

  const handleNextStep = () => {
    console.log("clicked")
    setData({step: 3, data: csvData});
  }

  const handleBackStep = () => {
    setData({step: 1, data: csvData});
  }

  return (
    <div className='relative'>
      <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          className="attribute"
          overlayClassName="overlay"
      >
          <div className="close bg-gray-300 w-16 flex justify-center pt-8 h-full">
              <Button className="close-icon border border-solid rounded-none bg-transparent border-sky-400 w-10 h-10" onClick={closeModal}>
                  <FontAwesomeIcon icon={faSquareXmark} />
              </Button>
          </div>
          <div className='p-10 pb-16 inner flex flex-col justify-between'>
              <h2 className='text-3xl text-black mb-14'>Map Column Attribute</h2>
              <div className="flex justify-between mb-14 p-20 border-t border-b border-dashed border-gray-400">
                  <div className='w-6/12'>
                      <div>
                          <p className='flex items-center mb-6'>Attribute <strong className='text-red-600'>*</strong></p>
                          <select value={attributeShow} className='mb-10 w-full h-12 border border-solid border-gray-400' onChange={handleAttributeNew}>
                              {optionsAttribute.map((item, index) => (
                                  <option key={index} value={item.value}>
                                      {item.label}
                                  </option>
                              ))}
                          </select>
                          {attributeShow  &&  <div>
                                  <p className='flex items-center mb-6'>Attribute name<strong className='text-red-600'>*</strong></p>
                                  <input className='mb-10 w-full h-12 border border-solid border-gray-400' type="text" />
                                  <p className='flex items-center mb-6'>Attribute type<strong className='text-red-600'>*</strong></p>
                                  <RadioGroup defaultValue="number">
                                      <div className="flex items-center gap-x-3">
                                          <RadioGroup.Item value="number" id="radio_1" />
                                          <Label htmlFor="radio_1_disabled" weight="plus">
                                              Number
                                          </Label>
                                      </div>
                                      <div className="flex items-center gap-x-3">
                                          <RadioGroup.Item value="text" id="radio_2" />
                                          <Label htmlFor="radio_2_disabled" weight="plus">
                                              Text
                                          </Label>
                                      </div>
                                  </RadioGroup>
                              </div>
                          }
                      </div>
                  </div>
                  <div className='w-4/12 flex flex-col justify-center'>
                      <p className="border border-collapse h-14 w-full p-2.5 flex items-center">
                          SAMPLE DATA
                      </p>
                      <p className="border border-collapse h-14 w-full p-2.5 flex items-center">
                          SAMPLE DATA SAMPLE DATA
                      </p>
                      <p className="border border-collapse h-14 w-full p-2.5 flex items-center">
                          SAMPLE DATA
                      </p>
                  </div>
              </div>
              <div className="products-import-possible flex justify-between items-center relative">
                  <a href="" onClick={closeModal} className="cancel text-gray-500 text-2xl">Cancel</a>
                  <Button className="continue flex justify-center items-center text-white bg-sky-400 ms-12" onClick={handleAttributeAdded}>Confirm Mapping</Button>
                  <p className='will-created absolute text-gray-400'>New attribute will be created</p>
              </div>
          </div>
      </Modal>
      <div className="flex justify-between items-center mb-8 mt-8">
          <label className='flex items-center'>
              Rows per page:&nbsp;&nbsp;
              <select value={rowCount} onChange={handleRowCountChange} className='w-20 h-10 border border-solid border-gray-500'>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
              </select>
          </label>
          <div className="products-import-possible flex justify-end items-center">
              <a href="#" onClick={handleBackStep} className="cancel text-sky-500 text-2xl">Go Back</a>
              <Button className="continue flex justify-center items-center text-white bg-sky-400 ms-12" onClick={handleNextStep}><p className='me-4 text-2xl'>Continue</p><FontAwesomeIcon icon={faRightLong} fade /></Button>
          </div>
      </div>
      <div className='flex flex-nowrap overflow-x-scroll product-table'>
          <Table>
              <Table.Header>
                  <Table.Row>
                      {Object.keys(csvData[0]).map((key, i) => (
                          <Table.HeaderCell key={i}>{String.fromCharCode(65 + i)}</Table.HeaderCell>
                      ))}
                  </Table.Row>
              </Table.Header>
              <Table.Body>
                  <Table.Row>
                      {Object.keys(csvData[0]).map((key, i) => (
                          <Table.HeaderCell key={i}>
                              <select key={i} value={attributeChange[i] || ''} onChange={(e) => handleAttributeChange(i, e)}>
                                  {options.map((option) => (
                                      <option key={option.value} value={option.value}>
                                          {option.label}
                                      </option>
                                  ))}
                              </select>
                          </Table.HeaderCell>
                      ))}
                  </Table.Row>
                  <Table.Row>
                      {Object.keys(csvData[0]).map((key, i) => (
                          <Table.HeaderCell key={i}>{key}</Table.HeaderCell>
                      ))}
                  </Table.Row>
                  {csvData.slice(0, rowCount).map((row:any, index) => (
                    <Table.Row key={index}>
                        {Object.values(row).filter(value=>(value!="")).map((value:string, i) => (
                            <Table.Cell key={i}>{value}</Table.Cell>
                        ))}
                    </Table.Row>
                  ))}
              </Table.Body>
          </Table>
      </div>
  </div>
  );
};

export default CsvTable;
