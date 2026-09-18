import React from "react";
export default function Profile({ user }) {
    return (
        <div style={{ padding: '24px', maxWidth: '500px', margin: '30px auto', background: 'var(--card)', borderRadius: '16px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700' }}>My Profile</h2>
            <p style={{ marginTop: '12px' }}><b>Name:</b> {user?.name || 'Alex'}</p>
            <p><b>Branch:</b> {user?.branch || 'CSE'}</p>
            <p><b>Verified:</b> {user?.verified ? 'Yes ✅' : 'No'}</p>
            <p><b>Email:</b> alex@campus.com</p>
        </div>
    )
}