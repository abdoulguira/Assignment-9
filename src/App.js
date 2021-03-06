import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/LogIn';
import Debit from './components/Debit';
import Credit from './components/Credit';


class App extends Component {

  constructor() {
    super();

    this.state = {
      accountBalance: 14568.27,
      debitData: [],
      creditData: [],
      currentUser: {
        userName: 'bob_loblaw',
        memberSince: '08/23/99',
      }
    }
  }

  componentDidMount () {
   fetch ('https://moj-api.herokuapp.com/debits')
   .then ((res) => res.json())
   .then(debit => {
     this.setState({debitData: debit});
   })

   fetch ('https://moj-api.herokuapp.com/credits')
   .then ((res) => res.json())
   .then(credit => {
     this.setState({creditData: credit});

   })
  }

  mockLogIn = (logInInfo) => {
      const newUser = {...this.state.currentUser}
      newUser.userName = logInInfo.userName
      this.setState({currentUser: newUser})
  }



  render() {

    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent = () => (
        <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  />
    );
    const DebitComponent = () => (<Debit accountBalance={this.state.accountBalance} debitData= {this.state.debitData} />)
    const CreditComponent = () => (<Credit accountBalance = {this.state.accountBalance} creditData = {this.state.creditData} />)
    // mockLogIn = (logInInfo) => {
    //   const newUser = {...this.state.currentUser}
    //   newUser.userName = logInInfo.userName
    //   this.setState({currentUser: newUser})
    // }

    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} {...this.props}/>)

    return (
        <Router>
          <div>
            <Route exact path="/" render={HomeComponent}/>
            <Route exact path="/Assignment-9" render={HomeComponent}/>
            <Route exact path="/userProfile" render={UserProfileComponent}/>
            <Route exact path="/login" render={LogInComponent}/>
            <Route exact path="/debit" render ={DebitComponent} />
            <Route exact path="/credit" render ={CreditComponent} />
          </div>
        </Router>
    );
  }

}

export default App;