import React, { Component } from 'react'
import {MenuItemDA} from './MenuItemDA'
import logo from './triteklogo.png'
import './Navbar.css'
import { Redirect } from "react-router-dom"

class NavbarDA extends Component{

    state = {clicked : false}
    state = {clickedlogo : false}

    handleClick =()=>{
        this.setState({clicked : !this.state.clicked})
    }
    handleClickHome =()=>{
        this.setState({clickedlogo : !this.state.clickedlogo})
    }
    render(){
        return(
            <nav className = "NavbarItems">
            {
                this.state.clickedlogo ? <> <Redirect to="/dashboard" /> {this.setState({clickedlogo : !this.state.clickedlogo})}</>: <></>
            }
               <div className="navbar-logo"><img src={logo} alt="logo" onClick={this.handleClickHome}/></div>
               <div className="menu-icon" onClick={this.handleClick}>
               <i className={this.state.clicked ? 'fas fa-times':'fas fa-bars'}></i>
               </div>
               <ul className= {this.state.clicked ? 'nav-menu-dash active' : 'nav-menu-dash'}>
               {MenuItemDA.map((item,index)=>{
                   return(
                    <li key ={index} >
                    <a className={item.cName} href={item.url}>
                    {item.title}
                    </a> 
                    </li>
                   )
               })}  
               </ul>
               <div >
               <img src={this.props.img ||"https://img.icons8.com/ios-glyphs/30/000000/name.png"} style={{fontSize:"15px",
                 color:"white",width:"30px",height:"30px",lineHeight:"30px",borderRadius:"50%",textAlign:"center"}}/>

                  <p style={{fontSize:"15px"}}>{this.props.name}</p> 
               </div>
              
            </nav>
        )
    }
}

export default NavbarDA