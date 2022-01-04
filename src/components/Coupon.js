import React, { useEffect, useRef, useState } from 'react'
import app from '../firebase'
import Footer from './Footer/Footer'
import NavbarDA from './Navbar/NavbarDA'
import background from './Forms/background.png'
import confirm from 'antd/lib/modal/confirm'

function Coupon() {
    const[list, setList] = useState([]);
    const codeRef = useRef()
    const discRef = useRef()
    useEffect(() => {
       app.database().ref().child('coupon/').on('value', snapshot => {
           
        let memberlist = [];
        snapshot.forEach(snap => {
            memberlist.push(snap.val());
        });
        setList(memberlist)
        
    }) 
    }, [])
    async function handleSubmit(e) {
        e.preventDefault()
        var key = codeRef.current.value;
        app.database().ref().child('coupon/'+key).set({
            code: codeRef.current.value,
            disc: discRef.current.value,
            id: key

        })
      }
    return (
        <div>
        <NavbarDA></NavbarDA>
        <div>
        
            <div className='dashboard-stats' style={{display:"table", margin:"0 auto",width:"50rem"}}>
            <h1 style={{textAlign:"center"}}>Coupons</h1>
            <table id="example" class="display table">
            <thead class="thead-dark">
                <tr>
                    <th>Code</th>
                    <th>Discount</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
            {list.map(data => {
                
                return (
                    <tr>     
                    <td>{data.code}</td>
                    <td>{data.disc}</td>
                    <td><button  className="book-event" type='submit' onClick={()=>{
            confirm({
    title: 'This coupon will be permanently deleted?',
    onOk() {
        app.database().ref("coupon/"+data.id).remove()
    },
    onCancel() {
      
    },
  }) 
        }}>
        Delete
        </button></td>
                    </tr>
                    
                );
               
                })}
        
               
            </tbody>
            
         </table>

         <form onSubmit={handleSubmit} className='form' >
      <div className='form-inputs'>
          <label className='form-label'>Code</label>
          <input
            className='form-input'
            type='text'
            name='code'
            placeholder='Enter code'
            ref={codeRef} required
          />
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Discount</label>
          <input
            className='form-input'
            placeholder='Enter dicount'
            ref={discRef}
            required
          />
        </div>
        <button className="form-inputlogin-btn" type='submit'  style={{
            width: "100px",
            float: "right",
            margin:"2rem 0",
            display:"block"
           
        }}>
         Create
        </button> 
      </form>
            </div>
            </div>
        <Footer></Footer>
        </div>
    )
}

export default Coupon
