import { Link } from 'react-router-dom';

export const MenuItem = [
    {
        title: 'Courses',
        url: 'https://tritekconsulting.co.uk/courses',
        cName: 'nav-links'
    },

    {
        title: <Link to="/" style={{color:"#d4af37", textDecoration: "none"}}>Events</Link>,
        url: '',
        cName: 'nav-links'
    },

    {
        title: <Link to="/login" style={{color:"white", textDecoration: "none"}}>Login/Signup</Link>,
        cName: 'nav-links-mobile'
    }
]