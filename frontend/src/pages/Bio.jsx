import { useState, useEffect } from "react";
import "./Bio.css";

const Profile = ({ go, user, setUser }) => {
    const saved = JSON.parse(localStorage.getItem("userProfile"));

    const [profile, setProfile] = useState(saved || {
        name: "",
        age: "",
        email: "",
        dob: "",
        contact: "",
        branch: "",
        bio: "",
        pic: "" 
    });

    useEffect(() => {
        if (saved) {
            setProfile(saved);
        }
    }, []);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handlePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile({ ...profile, pic: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        localStorage.setItem("userProfile", JSON.stringify(profile));
        localStorage.setItem("campuskart-user", JSON.stringify(profile));
        if (setUser) setUser(profile);
        alert("Profile saved successfully!");
    };

    const handleLogout = () => {
        if (confirm("Are you sure to logout?")) {
            localStorage.removeItem("userProfile");
            localStorage.removeItem("campuskart-user");
            go("home");
        }
    };

    return (
        <div className="profile-page">
            <div className="profile-card">
                <h2>My Profile</h2>
                <p className="sub">Update your personal details</p>

                <div className="form-grid">
                    <div className="field">
                        <label>Full Name</label>
                        <input name="name" value={profile.name} onChange={handleChange} placeholder="Enter name" />
                    </div>
                    <div className="field">
                        <label>Age</label>
                        <input name="age" type="number" value={profile.age} onChange={handleChange} placeholder="Enter age" />
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input name="email" value={profile.email} onChange={handleChange} placeholder="Enter email" />
                    </div>
                    <div className="field">
                        <label>Date of Birth</label>
                        <input name="dob" type="date" value={profile.dob} onChange={handleChange} />
                    </div>
                    <div className="field">
                        <label>Contact No.</label>
                        <input name="contact" value={profile.contact} onChange={handleChange} placeholder="Enter contact" />
                    </div>
                    <div className="field">
                        <label>Branch</label>
                        <input name="branch" value={profile.branch} onChange={handleChange} placeholder="CSE / ECE" />
                    </div>
                    <div className="field full">
                        <label>Bio</label>
                        <textarea name="bio" value={profile.bio} onChange={handleChange} placeholder="Tell about yourself"></textarea>
                    </div>
                </div>

                <div className="btn-row">
                    <button className="btn back" onClick={() => go("home")}>← Go Back</button>
                    <button className="btn logout" onClick={handleLogout}>Logout</button>
                    <button className="btn save" onClick={handleSave}>Save Changes</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;