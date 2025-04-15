import { useContext } from "react";
import UsersContext from "../../contexts/UsersContext";
import { UsersContextTypes } from "../../types";

const User = () => {

    const { loggedInUser } = useContext(UsersContext) as UsersContextTypes;
    const user = loggedInUser!;
    
    return ( 
    
    <section>
        <h2>{user.username}</h2>
    </section> 
    );
}
 
export default User;