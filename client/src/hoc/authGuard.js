import { useSelector } from "react-redux";
import { Navigate, useLocation} from 'react-router-dom'

const AuthGuard = (props) => {
    const users = useSelector(state=>state.users);
    let location = useLocation();

    //let the user pass or not
    //state from and replace
    //if the user is good, let user pass, if it's bad, just kick it to auth page
    if(!users.auth){
        return <Navigate to="/auth" state={{from:location}} replace/>
    }

    return props.children
}

export default AuthGuard;