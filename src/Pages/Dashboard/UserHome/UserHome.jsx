import useAuth from "../../../hook/useAuth";

const UserHome = () => {
    const { user } = useAuth();
    return (
        <div className="p-8 flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-medium">Hi, Welcome {user.displayName}</h1>
            </div>
            <div className="avatar">
                <div className="w-24 rounded-full">
                    <img src={user.photoURL} alt={user.displayName} />
                </div>
            </div>
        </div>
    );
};

export default UserHome;
