import React from 'react';

export default function InviteUserPopup({
    sendInvite,
    inviteEmail,
    setInviteEmail,
    setShowPopup,
}) {
    return (
        <div data-testid='popup-code' className='popup-wrapper'>
            <div className='popup-content'>
                <h1>Invite user</h1>
                <form className='create-form' onSubmit={sendInvite}>
                    <input
                        type='email'
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        placeholder='Enter email...'
                        required
                    />
                    <div className='flex-container'>
                        <button type='submit' className='detail-color'>
                            Invite
                        </button>
                        <button onClick={() => setShowPopup(false)}>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
