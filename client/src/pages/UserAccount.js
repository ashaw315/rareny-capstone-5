import React, { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';

function UserAccount({ user }){

    const [updatedAccount, setUpdatedAccount] = useState(user);

    // const [username, setUsername] = useState(user.username)
    // const [password, setPassword] = useState('')
    // const [website, setWebsite] = useState('')
    // const [discipline, setDiscipline] = useState('')
    // const [bio, setBio] = useState('')

    

    const [profilePicture, setProfilePicture] = useState('')

    const [accountUpdatedNote, setAccountUpdatedNote] = useState('');


    const navigate = useNavigate();

    function handleUpdate(e, field) {
        setUpdatedAccount({...updatedAccount, [field]: e.target.value})
    };

    // const handleProfilePicChange = e => {
    //     e.persist();
    //     setProfilePicture(e.target.files[0]);
    //   };

    // function handleUpdateProfilePicture(e, field) {
    //     setUpdatedAccount({...updatedAccount, [field]: e.target.files[0]})
    // };

    console.log(user)

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
        <div>
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
                            {updatedAccount.username ? <input className='accountinput' value={updatedAccount.username} onChange={(e) => handleUpdate(e, 'username')}></input> : navigate('/', {replace: true}) }
                        </div>
                        <div className='accountinputdiv'>
                            <p className='accountp'>Password</p>
                            {user ? <input className='accountinput' value={updatedAccount.password} onChange={(e) => handleUpdate(e, 'password')}></input> : null }
                        </div>
                        <div className='accountinputdiv'>
                            <p className='accountp'>Website</p>
                            {user ? <input className='accountinput' value={updatedAccount.website} onChange={(e) => handleUpdate(e, 'website')}></input> : null}
                        </div>
                        <div className='accountinputdiv'>
                            <p className='accountp'>Discipline</p>
                            {user ? <input className='accountinput' value={updatedAccount.discipline} onChange={(e) => handleUpdate(e, 'discipline')}></input> : null}
                        </div>
                        <div className='accountinputdiv'>
                            <p className='accountp'>Bio</p>
                            {user ? <textarea className='accountinput' value={updatedAccount.bio} onChange={(e) => handleUpdate(e, 'bio')}></textarea> : null }
                        </div>
                        {/* <div className='accountinputdiv'>
                            <p className='accountp'>Profile Picture</p>
                            <input type="file" accept="image/*" className='accountinput' value={updatedAccount.profile_picture} onChange={(e) => handleUpdateProfilePicture(e, '')}></input>
                        </div> */}
                        <button className='accountbutton' type='submit' >Update</button>
                        {accountUpdatedNote ? (<p className='accountsavedp'>{accountUpdatedNote}</p>) : null}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserAccount;