import React, { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import Textarea from "../styles/TextArea";

function UserAccount({ user }){
    const [updatedAccount, setUpdatedAccount] = useState(user);

    const [accountUpdatedNote, setAccountUpdatedNote] = useState('');

    const navigate = useNavigate();

    function handleUpdate(e, field) {
        setUpdatedAccount({...updatedAccount, [field]: e.target.value})
    };

    function handleUpdateAccount(e) {
        e.preventDefault();
        fetch(`/users/${user.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedAccount),
        })
        .then(() => {
          navigate('/account', {replace: true})
        })
        setAccountUpdatedNote('Account updates saved.')
    };


    return (
        <div className="subforums-forum-posts">
            <Link className="forum-card" to={'/account'}>
                <h2 className="forum-header-title">Account.</h2>
            </Link>
            <div className='accountpagecontainer'>
                <div className='accountlinkscontainer'>
                    <h4 className='accountheader'>Account</h4>
                    <div className='accountlinkdiv'>
                        <Link className='accountlink' to='/profile'>Profile</Link>
                    </div>
                </div>
                <div className='accountformcontainer'>
                    <form onSubmit={handleUpdateAccount}>
                        <span>
                            <h4 className='accountheader'>Update your account details</h4>
                        </span>
                        <div className='accountinputdiv'>
                            <p className='accountp'>Username</p>
                            {updatedAccount ? <input className='accountinput' value={updatedAccount.username} onChange={(e) => handleUpdate(e, 'username')}></input> : null }
                        </div>
                        <div className='accountinputdiv'>
                            <p className='accountp'>Password</p>
                            {updatedAccount? <input className='accountinput' value={updatedAccount.password} onChange={(e) => handleUpdate(e, 'password')}></input> : null }
                        </div>
                        <div className='accountinputdiv'>
                            <p className='accountp'>Website</p>
                            {updatedAccount ? <input className='accountinput' value={updatedAccount.website} onChange={(e) => handleUpdate(e, 'website')}></input> : null}
                        </div>
                        <div className='accountinputdiv'>
                            <p className='accountp'>Discipline</p>
                            {updatedAccount ? <input className='accountinput' value={updatedAccount.discipline} onChange={(e) => handleUpdate(e, 'discipline')}></input> : null}
                        </div>
                        <div className='accountinputdiv'>
                            <p className='accountp'>Bio</p>
                            {updatedAccount ? <Textarea rows="10" className='accountinput' value={updatedAccount.bio} onChange={(e) => handleUpdate(e, 'bio')}></Textarea> : null }
                        </div>
                        <div className='accountbuttoncenter'>
                        <button className='accountbutton' type='submit' >Update</button>
                        </div>
                        {accountUpdatedNote ? (<p className='accountsavedp'>{accountUpdatedNote}</p>) : null}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserAccount;