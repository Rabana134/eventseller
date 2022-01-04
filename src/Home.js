import './App.css';
import banner from './components/Navbar/banner3.jpg';
import Navbar from './components/Navbar/Navbar';
import Form from './components/Forms/Form';
import { Link } from 'react-router-dom';
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import Footer from './components/Footer/Footer';

const PUBLIC_KEY = "pk_test_51JnlBpDsCGjgZ0CD1Pb8a89AxfDvIjyQu4DThAycZpXhWGXf8504CxSECN895ZxsZzqjguh5i8lTTlWBiXxjAWPL00OzZxIbqa"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

function Home(props) {
  const divStyle = {
    width: '100%',
    height: '30rem',
    backgroundImage: `url(${banner})`,
    backgroundSize: 'cover',
    marginTop:'0.5rem' 
  };
  
  return (
       <div >
     <Navbar ></Navbar>
     <div  style={divStyle}>
    </div>
    <div className="background">
    <Elements stripe={stripeTestPromise}>
    <Form name={props.location.state.title} price={props.location.state.price}></Form>
		</Elements>
    </div>
   <Footer></Footer>
    </div>
   
  );
}

export default Home;
