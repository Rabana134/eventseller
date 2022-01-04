import Footer from '../Footer/Footer';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import app from '../../firebase';
import NavbarDA from '../Navbar/NavbarDA';
import { Bar } from 'react-chartjs-2';
import { useHistory } from 'react-router';
import { CSVLink } from "react-csv";
import { Link } from 'react-router-dom';

function Overall() {
    const { currentUser } = useAuth()
    var[regs, setReg] = useState(0);
    var[online, setOnline] = useState(0);
    var[mentor, setMentor] = useState(0);
    var[coupon, setCoupon] = useState(0);
    var[events, setEvent] = useState(0);
    var[report, setReport] = useState(0);

    var[total, setTotal] = useState(0);
    var[b_analyst, setBA] = useState(0);
    var[p_management, setProgM] = useState(0);
    var[pmo, setPmo] = useState(0);
    var[d_analyst, setDataA] = useState(0);
   
    var [name,setName] = useState("")
    var [image,setImage] = useState("")
    var Uid = currentUser.uid;
    let myCurrentDate = new Date()
    let hour = myCurrentDate.getHours()
    let minute = myCurrentDate.getMinutes()
    let time = hour+":"+minute
    let year = myCurrentDate.getFullYear();

    const[jan, setJan] = useState(0);
    const[feb, setFeb] = useState(0);
    const[mar, setMar] = useState(0);
    const[apr, setApr] = useState(0);
    const[may, setMay] = useState(0);
    const[jun, setJun] = useState(0);
    const[jul, setJul] = useState(0);
    const[aug, setAug] = useState(0);
    const[sep, setSep] = useState(0);
    const[oct, setOct] = useState(0);
    const[nov, setNov] = useState(0);
    const[dec, setDec] = useState(0);
    const history = useHistory()
    useEffect(() => {
      
          app.database().ref().child('users/'+Uid+'/username').on('value', snapshot => {
            
            setName(snapshot.val()) 
             
        })
        app.database().ref().child('users/'+Uid+'/profile/url/').on('value', snapshot => {
            
            setImage(snapshot.val()) 
             
        })
       app.database().ref().child('users/').on('value', snapshot => {
           
           setReg(snapshot.numChildren())
            
       })
       app.database().ref().child('mentor/').on('value', snapshot => {
           
           setMentor(snapshot.numChildren())
            
       })
       app.database().ref().child('coupon/').on('value', snapshot => {
           
           setCoupon(snapshot.numChildren())
            
       })
       app.database().ref().child('events/').on('value', snapshot => {
           
           setEvent(snapshot.numChildren())
            
       })
       app.database().ref().child('report/').on('value', snapshot => {
           
           setReport(snapshot.numChildren())
            
       })

       app.database().ref().child('payment/total').on('value', snapshot => {
           
        setTotal(snapshot.numChildren())
         
    })
    app.database().ref().child('payment/ba').on('value', snapshot => {
           
        setBA(snapshot.numChildren())
         
    })
    app.database().ref().child('payment/progm').on('value', snapshot => {
           
        setProgM(snapshot.numChildren())
         
    })
    app.database().ref().child('payment/pmo').on('value', snapshot => {
           
        setPmo(snapshot.numChildren())
         
    })
    app.database().ref().child('payment/data_a').on('value', snapshot => {
           
        setDataA(snapshot.numChildren())
         
    })
       app.database().ref().child('online/'+time).on('value', snapshot => {
           
           setOnline(online = snapshot.numChildren()) 
       })

       app.database().ref("graph/"+year+"/"+"Jan/").on("value", snapshot => {
        setJan(snapshot.numChildren())
      });
      app.database().ref("graph/"+year+"/"+"Feb/").on("value", snapshot => {
        setFeb(snapshot.numChildren())
      });
      app.database().ref("graph/"+year+"/"+"Mar/").on("value", snapshot => {
        
        setMar(snapshot.numChildren())
      });
      app.database().ref("graph/"+year+"/"+"Apr/").on("value", snapshot => {
     
        setApr(snapshot.numChildren())
      });
      app.database().ref("graph/"+year+"/"+"May/").on("value", snapshot => {
        
        setMay(snapshot.numChildren())
      });
      app.database().ref("graph/"+year+"/"+"Jun/").on("value", snapshot => {
        
        setJun(snapshot.numChildren())
      });
      app.database().ref("graph/"+year+"/"+"Jul/").on("value", snapshot => {
        
        setJul(snapshot.numChildren())
      });
      app.database().ref("graph/"+year+"/"+"Aug/").on("value", snapshot => {
       
        setAug(snapshot.numChildren())
      });
      app.database().ref("graph/"+year+"/"+"Sep/").on("value", snapshot => {
       
        setSep(snapshot.numChildren())
      });
      app.database().ref("graph/"+year+"/"+"Oct/").on("value", snapshot => {
       
        setOct(snapshot.numChildren())
      });
      app.database().ref("graph/"+year+"/"+"Nov/").on("value", snapshot => {
        
        setNov(snapshot.numChildren())
      });
      app.database().ref("graph/"+year+"/"+"Dec/").on("value", snapshot => {
        
        setDec(snapshot.numChildren())
      });
    }, [])

    const headers = [
      { label: "Month", key: "month" },
      { label: "Registration", key: "regs" }
    ];
    const data = [
      { month: "Jan", regs: jan },
      { month: "Feb", regs: feb },
      { month: "Mar", regs: mar },
      { month: "Apr", regs: apr },
      { month: "May", regs: may },
      { month: "Jun", regs: jun },
      { month: "Jul", regs: jul },
      { month: "Aug", regs: aug },
      { month: "Sep", regs: sep },
      { month: "Oct", regs: oct },
      { month: "Nov", regs: nov },
      { month: "Dec", regs: dec }
    ];
    const csvReport = {
      data: data,
      headers: headers,
      filename: 'Registration_Report.csv'
    };
    const chartData={
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets:[
          {
            label:'',
            data:[
              jan,
              feb,
              mar,
              apr,
              may,
              jun,
              jul,
              aug,
              sep,
              oct,
              nov,
              dec
            ],
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)'
            ]
          }
        ]
      }
      function handleEvent(){
        history.push("/e-report")
    }
    function handleReg(){
        history.push("/reg-report")
    }
    return (
        <div>
        <NavbarDA name={name} img={image}/>
        <div style={{marginTop:"2rem"}}>
<button className='form-input-btn-event' type='submit'  onClick={handleEvent}  style={{display:"inline-block",margin:"0"}}>
Events Report
        </button>
        <button className='form-input-btn-event' type='submit' onClick={handleReg}  style={{display:"inline-block",margin:"0 1rem"}}>
        Registration Report
        </button>  
            </div>
        <h3>OVERALL ACCOUNT REPORT</h3>
            <div className="dashboard-stats">
<div  style={{display:"inline-table"}}>
<div  style={{display:"block"}}>
<div className="circle" style={{marginLeft:"7.5rem",marginBottom:"0.8rem",fontStyle:"bold",fontSize:"20px"}}><p>{online}</p></div>
</div>
<div  style={{display:"block"}}>
    <b style={{padding:"10px",color:"black",marginLeft:"7.5rem",borderRadius: "30%"}}>USERS</b>
</div>
  </div>
  <div  style={{display:"inline-table"}}>
  <div  style={{display:"block"}}>
<div className="circle" style={{marginLeft:"7rem",marginBottom:"0.8rem",fontStyle:"bold",fontSize:"20px"}}>{regs}</div>
</div>
<div  style={{display:"block"}}>
    <b style={{padding:"10px",color:"black",marginLeft:"5rem",borderRadius: "30%"}}>REGISTRATIONS</b>
</div>
  </div>
  <div  style={{display:"inline-table"}}>
  <div  style={{display:"block"}}>
<div className="circle" style={{marginLeft:"5rem",marginBottom:"0.8rem",fontStyle:"bold",fontSize:"20px"}}>{mentor}</div>
</div>
<div  style={{display:"block"}}>
    <b style={{padding:"10px",color:"black",marginLeft:"4rem",borderRadius: "30%"}}>MENTORS</b>
</div>
  </div>
  <div  style={{display:"inline-table"}}>
  <div  style={{display:"block"}}>
<div className="circle" style={{marginLeft:"5rem",marginBottom:"0.8rem",fontStyle:"bold",fontSize:"20px"}}>{coupon}</div>
</div>
<div  style={{display:"block"}}>
<Link to="/coupon55"><b style={{padding:"10px",color:"black",marginLeft:"4rem",borderRadius: "30%"}}>COUPONS</b></Link>
</div>
  </div>
  <div  style={{display:"inline-table"}}>
  <div  style={{display:"block"}}>
<div className="circle" style={{marginLeft:"5rem",marginBottom:"0.8rem",fontStyle:"bold",fontSize:"20px"}}>{events}</div>
</div>
<div  style={{display:"block"}}>
    <b style={{padding:"10px",color:"black",marginLeft:"4.5rem",borderRadius: "30%"}}>EVENTS</b>
</div>
  </div>
  <div  style={{display:"inline-table"}}>
  <div  style={{display:"block"}}>
<div className="circle" style={{marginLeft:"5rem",marginBottom:"0.8rem",fontStyle:"bold",fontSize:"20px"}}>{report}</div>
</div>
<div  style={{display:"block"}}>
    <b style={{padding:"10px",color:"black",margin:"4.5rem",borderRadius: "30%"}}>REPORTS</b>
</div>
  
  </div>
  </div>
 

  <div>
  <h3>Registration By Month</h3> 
  <CSVLink {...csvReport} style={{float:"right"}}>Export to CSV</CSVLink>
            <Bar
          data={chartData}
          width={100}
	height={20}
          options={{
            title:{
                display:true,
              text:'Registration By Month',
              fontSize:30
            },
            legend:{
              display:true,
              position:"right"
            },
            maintainAspectRatio: true 
          }}
        />
  </div>
  <Footer></Footer>
        </div>
    )
}

export default Overall
