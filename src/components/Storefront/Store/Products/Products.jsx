import React, { useState } from 'react'
import ProductCard from '../../../Elements/Cards/Store/ProductCard'
import EmptyTable from '../../../Elements/Sections/EmptyTable'
import usePrevNextPagination from '../../../../utils/usePrevNextPagination'
import PrevNextPagination from '../../../Elements/Pagination/PrevNextPagination'
import ProductCardRow from '../../../Elements/Cards/Store/ProductCardRow'
import Alert from '../../../Elements/Alerts/Alert'
import ModalWrap from '../../../Elements/Modal/ModalWrap'
import EditProduct from '../../Modals/EditProduct'

const Products = ({productsDataFetched, storeID, mutate}) => {

  const [display, setDisplay] = useState('grid')

  const [currentProduct, setCurrentProduct] = useState([])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [alertValues, setAlertValues] = useState({
    message:"",
    type:'warning',
    duration:2500
  })

  let row_amount = 4


  const {currentPage, templates, loading, rows, totalPages, movePageBy, displayedData} = usePrevNextPagination(productsDataFetched, row_amount, 'filterProductsWrap')


  const handleEditModal = (payref) => {
    if(productsDataFetched && productsDataFetched.length > 0){
     const tempData = productsDataFetched.filter(trans => trans.payref == payref)
     setIsModalOpen(true)
     setCurrentProduct(tempData[0])
    //  console.log(tempData[0]);

    }
 }

  const displayOptions = [
    {
      name:"Grid",
      id:"grid",
      icon:<svg className={`hover:drop-shadow-md transition-all duration-300 ease-in-out active:translate-y-1`} width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="30" fill="white"/>
      <path opacity="0.4" d="M25 11.52V6.98C25 5.57 24.36 5 22.77 5H18.73C17.14 5 16.5 5.57 16.5 6.98V11.51C16.5 12.93 17.14 13.49 18.73 13.49H22.77C24.36 13.5 25 12.93 25 11.52Z" fill="#D2D2D2"/>
      <path d="M25 22.77V18.73C25 17.14 24.36 16.5 22.77 16.5H18.73C17.14 16.5 16.5 17.14 16.5 18.73V22.77C16.5 24.36 17.14 25 18.73 25H22.77C24.36 25 25 24.36 25 22.77Z" fill="#D2D2D2"/>
      <path d="M13.5 11.52V6.98C13.5 5.57 12.86 5 11.27 5H7.23C5.64 5 5 5.57 5 6.98V11.51C5 12.93 5.64 13.49 7.23 13.49H11.27C12.86 13.5 13.5 12.93 13.5 11.52Z" fill="#D2D2D2"/>
      <path opacity="0.4" d="M13.5 22.77V18.73C13.5 17.14 12.86 16.5 11.27 16.5H7.23C5.64 16.5 5 17.14 5 18.73V22.77C5 24.36 5.64 25 7.23 25H11.27C12.86 25 13.5 24.36 13.5 22.77Z" fill="#D2D2D2"/>
      </svg>,  
      activeIcon:<svg className={`hover:drop-shadow-md transition-all duration-300 ease-in-out active:translate-y-1`} width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="30" fill="#E4E5F6"/>
      <path opacity="0.4" d="M25 11.52V6.98C25 5.57 24.36 5 22.77 5H18.73C17.14 5 16.5 5.57 16.5 6.98V11.51C16.5 12.93 17.14 13.49 18.73 13.49H22.77C24.36 13.5 25 12.93 25 11.52Z" fill="#2A2AB3"/>
      <path d="M25 22.77V18.73C25 17.14 24.36 16.5 22.77 16.5H18.73C17.14 16.5 16.5 17.14 16.5 18.73V22.77C16.5 24.36 17.14 25 18.73 25H22.77C24.36 25 25 24.36 25 22.77Z" fill="#2A2AB3"/>
      <path d="M13.5 11.52V6.98C13.5 5.57 12.86 5 11.27 5H7.23C5.64 5 5 5.57 5 6.98V11.51C5 12.93 5.64 13.49 7.23 13.49H11.27C12.86 13.5 13.5 12.93 13.5 11.52Z" fill="#2A2AB3"/>
      <path opacity="0.4" d="M13.5 22.77V18.73C13.5 17.14 12.86 16.5 11.27 16.5H7.23C5.64 16.5 5 17.14 5 18.73V22.77C5 24.36 5.64 25 7.23 25H11.27C12.86 25 13.5 24.36 13.5 22.77Z" fill="#2A2AB3"/>
      </svg>      
    },
    {
      name:"Row",
      id:"row",
      icon:<svg className={`hover:drop-shadow-md transition-all duration-300 ease-in-out active:translate-y-1`} width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="30" height="30" fill="white"/>
        <path opacity="0.4" d="M22.9 16.5H7.1C5.6 16.5 5 17.14 5 18.73V22.77C5 24.36 5.6 25 7.1 25H22.9C24.4 25 25 24.36 25 22.77V18.73C25 17.14 24.4 16.5 22.9 16.5Z" fill="#D2D2D2"/>
        <path d="M22.9 5H7.1C5.6 5 5 5.64 5 7.23V11.27C5 12.86 5.6 13.5 7.1 13.5H22.9C24.4 13.5 25 12.86 25 11.27V7.23C25 5.64 24.4 5 22.9 5Z" fill="#D2D2D2"/>
      </svg>,
      activeIcon:<svg className={`hover:drop-shadow-md transition-all duration-300 ease-in-out active:translate-y-1`} width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="30" fill="#E4E5F6"/>
      <path opacity="0.4" d="M22.9 16.5H7.1C5.6 16.5 5 17.14 5 18.73V22.77C5 24.36 5.6 25 7.1 25H22.9C24.4 25 25 24.36 25 22.77V18.73C25 17.14 24.4 16.5 22.9 16.5Z" fill="#2A2AB3"/>
      <path d="M22.9 5H7.1C5.6 5 5 5.64 5 7.23V11.27C5 12.86 5.6 13.5 7.1 13.5H22.9C24.4 13.5 25 12.86 25 11.27V7.23C25 5.64 24.4 5 22.9 5Z" fill="#2A2AB3"/>
      </svg>
          
    },
  ]

  return (
    <div id={`filterProductsWrap`}>
      {
        productsDataFetched && productsDataFetched.length > 0
        ?
        <div className='pb-10'>
          <div className='flex items-center gap-3 justify-end'>
            {displayOptions.map((option, idx)=>{
              return <button key={idx} onClick={()=>setDisplay(option.id)} title={`${option.name} view`} aria-label={`${option.name} view`}>
                {display == option.id ? option.activeIcon : option.icon}
              </button>
            })}
          </div>
          {
            display == 'grid'
            ?
            <div className='grid xs:grid-cols-1 bxs:grid-cols-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-9 gap-10'>
          
                {displayedData.map((product, idx)=>{
                    return <ProductCard id={product.payref} key={idx} name={product.product_name} amount={product.product_amount} images={product.product_image.images ? product.product_image.images : []} handleClick={()=>handleEditModal(product.payref)} />
                  })}
              </div>
            :
            <div className='grid xs:grid-cols-1 bxs:grid-cols-1 grid-cols-1 md:grid-cols-2 py-9 gap-10'>
            
                {displayedData.map((product, idx)=>{
                  return <ProductCardRow id={product.payref} key={idx} name={product.product_name} amount={product.product_amount} images={product.product_image.images ? product.product_image.images : []} handleClick={()=>handleEditModal(product.payref)} />
                })}
            </div>
          }
          <div className="flex items-center justify-end pt-5">
            {productsDataFetched.length > row_amount && <PrevNextPagination id={'productsPagination'} currentPage={currentPage} totalPages={totalPages} movePageBy={movePageBy} />}
          </div>
        </div>
      :
      <EmptyTable message={'No products found in this store'} />
      }
        <ModalWrap key={'editProductModal'} id={'editProductModalWrap'} modalState={isModalOpen} handleModal={()=>setIsModalOpen(false)}>
          <EditProduct currentProduct={currentProduct} closeModal={()=>setIsModalOpen(false)} openAlert={openAlert} setAlertValues={setAlertValues} alertValues={alertValues} setOpenAlert={setOpenAlert} storeID={storeID} mutate={mutate} />
      </ModalWrap>
      <Alert open={openAlert} type={alertValues.type} message={alertValues.message} duration={alertValues.duration}  />
    </div>
  )
}

export default Products