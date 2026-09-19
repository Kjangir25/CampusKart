import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";

const Profile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        name: "Alex",
        age: "21",
        email: "alex@campus.com",
        dob: "2004-05-12",
        contact: "9876543210",
        branch: "CSE",
        bio: "Student at Bhojasar",
        pic: "https://i.pravatar.cc/150?img=32"
    });

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handlePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfile({ ...profile, pic: URL.createObjectURL(file) });
        }
    };

    const handleSave = () => {
        localStorage.setItem("userProfile", JSON.stringify(profile));
        alert("Profile saved successfully!");
    };

    const handleLogout = () => {
        if (confirm("Logout karna hai?")) {
            localStorage.clear();
            navigate("/login");
        }
    };

    return (
        <div className="profile-page">
            <div className="profile-card">
                <h2>My Profile</h2>
                <p className="sub">Update your personal details</p>

                <div className="pic-section">
                    <img src={profile.pic} alt="profile" />
                    <label htmlFor="picUpload" className="pic-btn">Change Photo</label>
                    <input id="picUpload" type="file" hidden accept="image/*" onChange={handlePicChange} />
                </div>

                <div className="form-grid">
                    <div className="field">
                        <label>Full Name</label>
                        <input name="name" value={profile.name} onChange={handleChange} placeholder="Enter name" />
                    </div>
                    <div className="field">
                        <label>Age</label>
                        <input name="age" type="number" value={profile.age} onChange={handleChange} />
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input name="email" value={profile.email} onChange={handleChange} />
                    </div>
                    <div className="field">
                        <label>Date of Birth</label>
                        <input name="dob" type="date" value={profile.dob} onChange={handleChange} />
                    </div>
                    <div className="field">
                        <label>Contact No.</label>
                        <input name="contact" value={profile.contact} onChange={handleChange} />
                    </div>
                    <div className="field">
                        <label>Branch</label>
                        <input name="branch" value={profile.branch} onChange={handleChange} />
                    </div>
                    <div className="field full">
                        <label>Bio</label>
                        <textarea name="bio" value={profile.bio} onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="btn-row">
                    <button className="btn back" onClick={() => navigate("/")}>← Go Back</button>
                    <button className="btn logout" onClick={handleLogout}>Logout</button>
                    <button className="btn save" onClick={handleSave}>Save Changes</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;