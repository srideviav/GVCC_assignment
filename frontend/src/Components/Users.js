import { useGetUserQuery } from "../Features/userApiSlice";

const Users = () => {
    const { data: userData, error, isError, isLoading, isSuccess } = useGetUserQuery();
    console.log("userdata : ", userData,isError,error,isSuccess,isLoading)
    return(
        <p>USERS</p>
    )
}

export default Users;