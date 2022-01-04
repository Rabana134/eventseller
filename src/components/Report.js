import React, { useEffect, useState } from 'react'
import app from '../firebase';
import {Bar, Line, Pie} from 'react-chartjs-2';
import { useAuth } from '../contexts/AuthContext';
import NavbarDA from './Navbar/NavbarDA';
import Footer from './Footer/Footer';
import { useHistory } from 'react-router';
import { CSVLink } from 'react-csv';

function Report() {
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
    let myCurrentDate = new Date()
    let hour = myCurrentDate.getHours()
    let minute = myCurrentDate.getMinutes()
    let time = hour+":"+minute
    let year = myCurrentDate.getFullYear();
    const { currentUser } = useAuth()
    var Uid = currentUser.uid;
    var [name,setName] = useState("")
    var [image,setImage] = useState("")
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
        filename: 'Event_created_Report.csv'
      };
    useEffect(() => {
        setInterval(() => {
            app.database().ref("online/"+time+"/"+Uid).set(true)
        }, 3000);
        app.database().ref().child('users/'+Uid+'/username').on('value', snapshot => {
            
            setName(snapshot.val()) 
             
        })
        app.database().ref().child('users/'+Uid+'/profile/url/').on('value', snapshot => {
            
            setImage(snapshot.val()) 
             
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

    function handleOver(){
        history.push("/overall")
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
        <div>
        <button className='report-btn' type='submit' onClick={handleOver}>
         Overall Account Report
         <p>View totals of aggregate account-wide stats and financial number</p>
        </button>
        <button className='report-btn' type='submit' onClick={handleEvent}>
         Aggregate Events Report
         <p>View totals of aggregate event stats by data range</p>
        </button>
        <button className='report-btn' type='submit' onClick={handleReg}>
        Aggregate Registration Report
         <p>View totals of aggregate attendee registration stats by date range</p>
        </button>
        </div>
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
        <Footer></Footer>
        </div>
    )
}

export default Report
