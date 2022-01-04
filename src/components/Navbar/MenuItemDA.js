import { Link } from 'react-router-dom';

export const MenuItemDA = [

    {
        title: <Link to="/events" style={{color:"#d4af37", textDecoration: "none"}}>Events</Link>,
        cName: 'nav-links'
    },
    {
        title: <Link to="/attendee" style={{color:"#d4af37", textDecoration: "none"}}>Attendees</Link>,
        url: '',
        cName: 'nav-links'
    },
    {
        title: <Link to="/report" style={{color:"#d4af37", textDecoration: "none"}}>Reports</Link>,
        url: '',
        cName: 'nav-links'
    },
    {
        title: <Link to="/mentor" style={{color:"#d4af37", textDecoration: "none"}}>Mentor</Link>,
        url: '',
        cName: 'nav-links'
    },

    {
        title: <Link to="/settings-user" style={{color:"#d4af37", textDecoration: "none"}}>Settings</Link>,
        url: '',
        cName: 'nav-links'
    }
]