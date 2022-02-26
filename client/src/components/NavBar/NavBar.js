import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
// import Login from "../../pages/Login";
import './NavBar.css'



function NavBar({user, setUser, setLogInForm, setErrorMessage}) {
    const navigate = useNavigate();
    const [dropDown, setDropDown] = useState(false);

    function handleLogout() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            setUser(null);
          }
        });
      }

    function handleLogInForm() {
        navigate('/', {replace: true});
        setLogInForm(true);
        setErrorMessage('');
    };

    function handleRevertHome() {
        navigate('/', {replace: true});
        setLogInForm(false);
    };

    return (
        <div className='navbarcontainer'>
            {user ? (
                <ul className='navbarul'>
                    <Link to='/' className='navbarlink'>Home</Link>
                    <p className='navbardivider'>|</p>
                    <Link className='navbarlink' to='/profile'>Profile</Link>
                    <Link className='navbarlink' to='/entries'>Entries</Link>
                    <Link className='navbarlink' to='/themes'>Themes</Link>
                    {/* <img className='navbarlogologgedin' alt='.Day logo' src={dotdaylogo}></img> */}
                    <span className='navbardropdownspan'>
                        {/* <img className='navbardotdaydot' src={dotdaydot}/> */}
                        <button className='navbarnamelink'>Hello, {user.username}.</button>
                        <div className='navbardropdown'>
                            <div className='dropdowndiv'>
                                <Link className='dropdownlink' to={`/account`}>Account</Link>
                            </div>
                            <div className='dropdowndiv'>
                                <button className='dropdownlink' onClick={handleLogout}>Log Out</button>
                            </div>
                            <div className='dropdownclosediv'>
                                <button className='dropdownlink' onClick={() => setDropDown(!dropDown)}>Close</button>
                            </div>
                        </div>
                    </span>
                </ul>
            ) : (
                <ul className='navbarul'>
                    <button className='navbarlink' onClick={handleRevertHome}>Home</button>
                    {/* <p className='navbardivider'>|</p> */}
                    <Link className='navbarlink' to='/about'>About</Link>
                    <Link className='navbarlink' to='/themes'>Contact</Link>
                    {/* <img className='navbarlogo' onClick={handleRevertHome} alt='.Day logo' src={dotdaylogo}></img> */}
                </ul>
            )}
        </div>
    )
}

export default NavBar;