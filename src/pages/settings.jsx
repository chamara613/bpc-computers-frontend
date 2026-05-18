
import axios from "axios";
import { useEffect, useState } from "react";
import uploadFile from "../utils/mediaUpload";
import toast from "react-hot-toast";

export default function SettingsPage() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [existingImageUrl, setExistingImageUrl] = useState("");
    const [file, setFile] = useState(null);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (token != null) {

            axios.get(
                import.meta.env.VITE_API_URL + "/user/profile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            .then((response) => {

                console.log(response.data);

                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setExistingImageUrl(response.data.image);

            })
            .catch(() => {

                localStorage.removeItem("token");
                window.location.href = "/login";

            });
        }

    }, []);

    async function updateProfile() {

        try {

            const token = localStorage.getItem("token");

            const updateInfo = {
                firstName,
                lastName,
                image: existingImageUrl
            };

            // upload new image if selected
            if (file) {
                const uploadedImage =
                    await uploadFile(file);

                updateInfo.image = uploadedImage;
            }


        const response = await axios.put(
            import.meta.env.VITE_API_URL +
            "/user/profile",
            updateInfo,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        localStorage.setItem(
            "token",
            response.data.token
        );

            toast.success(
                "Profile updated successfully"
            );
            window.location.reload();

        } catch (error) {

            toast.error(
                error?.response?.data?.message ||
                "Failed to update profile"
            );
        }
    }

    async function changePassword() {

        try {

            if (password !== confirmPassword) {
                toast.error(
                    "Passwords do not match"
                );
                return;
            }

            const token =
                localStorage.getItem("token");

            await axios.post(
                import.meta.env.VITE_API_URL +
                "/user/update-password",
                {
                    password: password
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            toast.success(
                "Password changed successfully"
            );

            setPassword("");
            setConfirmPassword("");
            localStorage.removeItem("token")
            window.location.href="/login"

        } catch (error) {

            toast.error(
                error?.response?.data?.message ||
                "Failed to change password"
            );
        }
    }

    return (
        <div className="w-full min-h-screen bg-dominant flex justify-center items-center p-5">

            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6">

                <h1 className="text-3xl font-bold text-accent mb-6 text-center">
                    Account Settings
                </h1>

                {/* Profile Image */}
                <div className="flex flex-col items-center mb-5">

                    <img
                        src={
                            existingImageUrl ||
                            "/user.png"
                        }
                        alt="profile"
                        className="w-28 h-28 rounded-full object-cover border-4 border-accent shadow-md"
                    />

                    <input
                        type="file"
                        onChange={(e) =>
                            setFile(
                                e.target.files[0]
                            )
                        }
                        className="mt-3 text-sm"
                    />
                </div>

                {/* First Name */}
                <input
                    value={firstName}
                    onChange={(e) =>
                        setFirstName(
                            e.target.value
                        )
                    }
                    className="w-full h-[50px] p-3 border border-secondary rounded-xl mb-4 outline-none focus:ring-2 focus:ring-accent"
                    placeholder="First Name"
                />

                {/* Last Name */}
                <input
                    value={lastName}
                    onChange={(e) =>
                        setLastName(
                            e.target.value
                        )
                    }
                    className="w-full h-[50px] p-3 border border-secondary rounded-xl mb-4 outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Last Name"
                />

                {/* Save Profile */}
                <button
                    onClick={updateProfile}
                    className="w-full bg-accent text-white py-3 rounded-xl hover:bg-accent/80 transition duration-300 mb-6"
                >
                    Save Profile
                </button>

                <hr className="mb-6" />

                <h2 className="text-xl font-semibold text-accent mb-4">
                    Change Password
                </h2>

                {/* Password */}
                <input
                    value={password}
                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }
                    type="password"
                    className="w-full h-[50px] p-3 border border-secondary rounded-xl mb-4 outline-none focus:ring-2 focus:ring-accent"
                    placeholder="New Password"
                />

                {/* Confirm Password */}
                <input
                    value={confirmPassword}
                    onChange={(e) =>
                        setConfirmPassword(
                            e.target.value
                        )
                    }
                    type="password"
                    className="w-full h-[50px] p-3 border border-secondary rounded-xl mb-5 outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Confirm Password"
                />

                {/* Change Password Button */}
                <button
                    onClick={changePassword}
                    className="w-full bg-accent text-white py-3 rounded-xl hover:bg-accent/80 transition duration-300"
                >
                    Change Password
                </button>

            </div>
        </div>
    );
}