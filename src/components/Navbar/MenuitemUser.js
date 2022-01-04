import { Link } from 'react-router-dom';

export const MenuItemUser = [
    {
        title: <Link to="/dashboard" style={{color:"#d4af37", textDecoration: "none"}}>Events</Link>,
        url: '',
        cName: 'nav-links'
    },

    {
        title: <Link to="/settings-user" style={{color:"#d4af37", textDecoration: "none"}}>Settings</Link>,
        url: '',
        cName: 'nav-links'
    }
]