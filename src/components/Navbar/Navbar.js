import React, { Component } from 'react'
import {MenuItem} from './MenuItem'
import logo from './triteklogo.png'
import './Navbar.css'
import { Button } from '../Button'
import { Link } from 'react-router-dom'

class Navbar extends Component{

    state = {clicked : false}

    handleClick =()=>{
        this.setState({clicked : !this.state.clicked})
    }

    render(){
        return(
            <nav className = "NavbarItems">
               <div className="navbar-logo"><img src={logo} alt="logo" /></div>
               <div className="menu-icon" onClick={this.handleClick}>
               <i className={this.state.clicked ? 'fas fa-times':'fas fa-bars'}></i>
               </div>
               <ul className= {this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
               {MenuItem.map((item,index)=>{
                   return(
                    <li key ={index} >
                    <a className={item.cName} href={item.url}>
                    {item.title}
                    </a> 
                    </li>
                   )
               })}  
               </ul>
               <Button><Link to="/login" style={{color:"white", textDecoration: "none"}}>Login</Link></Button>
            </nav>
        )
    }
}

export default Navbar