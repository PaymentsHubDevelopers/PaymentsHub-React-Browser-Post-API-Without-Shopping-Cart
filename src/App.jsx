import './main.css'
import Homepage from './pages/Homepage'
import { Container } from 'react-bootstrap'
import NavBar from './components/NavBar'
import { Routes, Route } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import Payment from './pages/Payment';
import PaymentResults from './pages/PaymentResults'

function App() {
  return (
    <Container>
      <NavBar />
      <Routes>
 		 <Route index element={<Homepage />} />
 		 <Route path='/product/:id' element={<ProductPage />} />
 		 <Route path='/payment' element={<Payment />} />
 		 <Route path='/payment/result' element={<PaymentResults />} />
      </Routes>
    </Container>
  )
}

export default App