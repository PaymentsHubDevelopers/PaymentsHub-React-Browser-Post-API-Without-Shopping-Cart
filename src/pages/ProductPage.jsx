import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

function ProductPage() {
    const { id } = useParams()
    const navigate = useNavigate();

    const [product,  setProduct] = useState(null)

    useEffect(() => {
   	 const fetchProduct = async () => {
   		 const response = await fetch(`https://fakestoreapi.com/products/${id}`)
   		 const json = await response.json()
   		 setProduct(json)
   	 }

   	 fetchProduct()

    }, [])
 
    const getTAC = () => {
   	 let productPrice = product.price.toFixed(2)
   	 return fetch('https://payments-hub-node-api.onrender.com/getTAC', {
   		 method: 'post',
   		 body: JSON.stringify({
       		 amount: productPrice
   		 }),
   		 headers: {'Content-Type': 'application/json'},
   	 })
   	 .then(res => res.json())
   	 .then(json => {
   		 // check if TAC exists in json and redirect to the payments page
   		 if(json.data){
       		 localStorage.setItem('TAC', JSON.stringify(json.data))
       		 localStorage.setItem('productPrice', productPrice)
       		 navigate('/payment')
   		 }else{
       		 alert('An error occurred. Please try again')
   		 }
   	 })
   	 .catch(error => console.log(error))
    }
    
  return (
    product &&
    <Container className='mt-4'>
   	 <Row>
   		 <Col>
       		 <img src={product.image} style={{maxWidth: '400px'}} />
   		 </Col>

   		 <Col className='py-5 d-flex flex-column justify-content-around'>
       		 <h3>{product.title}</h3>
       		 <p>{product.description}</p>
       		 <h5>$ {(product.price).toFixed(2)}</h5>
       		 <Button variant='success' onClick={() => getTAC()} className='w-25'>Purchase Now</Button>
   		 </Col>
   	 </Row>
    </Container>
  )
}

export default ProductPage
