import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './Home';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/Forms/ForgotPassword';
import Loginform from './components/Forms/Loginform';
import PrivateRoute from './components/PrivateRoute';
import Event from './components/Event';
import Event2 from './components/Event2';
import Settinguser from './components/Settinguser';
import Book from './components/Book';
import Display from './Display';
import Report from './components/Report';
import Overall from './components/Reports/Overall';
import EReport from './components/Reports/EReport';
import RegReport from './components/Reports/RegReport';
import Attendee from './Attendee';
import Single from './components/Memo/Single';
import Group from './components/Memo/Group';
import Edit1 from './components/Edit/Edit1'
import Edit2 from './components/Edit/Edit2'
import CancelReg from './components/CancelReg';
import Mentor from './components/Mentor/Mentor';
import CreateM from './components/Mentor/CreateM';
import EditM from './components/Mentor/EditM';
import Coupon from './components/Coupon';

function App() {
  return (
    <Router>
    <AuthProvider>
      <Switch>
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/events" component={Event} />
      <PrivateRoute exact path="/events2" component={Event2}  />
      <PrivateRoute exact path="/settings-user" component={Settinguser}  />
      <PrivateRoute exact path="/event-book" component={Book}  />
      <PrivateRoute exact path="/report" component={Report}  />
      <PrivateRoute exact path="/overall" component={Overall}  />
      <PrivateRoute exact path="/e-report" component={EReport}  />
      <PrivateRoute exact path="/reg-report" component={RegReport}  />
      <PrivateRoute exact path="/attendee" component={Attendee}  />
      <PrivateRoute exact path="/single" component={Single}  />
      <PrivateRoute exact path="/group" component={Group}  />
      <PrivateRoute exact path="/edit1" component={Edit1}  />
      <PrivateRoute exact path="/edit2" component={Edit2}  />
      <PrivateRoute exact path="/cancel_reg" component={CancelReg}  />
      <PrivateRoute exact path="/mentor" component={Mentor}  />
      <PrivateRoute exact path="/create_m" component={CreateM}  />
      <PrivateRoute exact path="/edit_m" component={EditM}  />
      <PrivateRoute exact path="/coupon55" component={Coupon}  />
      <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/signup" component={Home} />
        <Route exact path="/" component={Display} />
        <Route path="/login" component={Loginform} />
       
      </Switch>
    </AuthProvider>
  </Router>
  );
}

export default App;
