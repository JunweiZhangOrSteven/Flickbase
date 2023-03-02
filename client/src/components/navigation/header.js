import { useEffect } from 'react';
import { Link, useNavigate , useLocation} from 'react-router-dom'
import SideDrawer from './sideNavigation';

import { useSelector, useDispatch } from 'react-redux';
import { clearNotifications } from '../../store/reducers/notifications'
import { showToast } from '../../utils/tools';
import { signOut } from '../../store/actions/users'
import { setLayout } from '../../store/reducers/site';

const Header = () => {

    const users = useSelector(state => state.users);
    const notifications = useSelector(state => state.notifications);
    const site = useSelector(state => state.site)
    const dispatch = useDispatch();
    let navigate = useNavigate();
    let location = useLocation();


    useEffect(()=>{
        //  http://localhost:3000/dashboard/articles
        let pathname = location.pathname.split('/')
        if(pathname[1] === 'dashboard'){
            dispatch(setLayout('dash_layout'))
        } else {
            dispatch(setLayout(''))
        }
    },[location.pathname,dispatch])

    //something new happens are notifications, this one is going to fire
    useEffect(()=>{
        let { global } = notifications; 
        if(notifications && global.error){
            const msg = global.msg ? global.msg : 'Error';
            showToast('ERROR',msg)
            dispatch(clearNotifications())
        }
        if(notifications && global.success){
            const msg = global.msg ? global.msg : 'Good!!';
            showToast('SUCCESS',msg)
            dispatch(clearNotifications())
        }
    },[notifications])


    useEffect(()=>{
        let { global } = notifications; 
        if(notifications && global.error){
            console.log('error')
            dispatch(clearNotifications())
        }
        if(notifications && global.success){
            console.log('success')
            dispatch(clearNotifications())
        }
    },[notifications])


    const signOutUser = () => {
        dispatch(signOut())
        navigate('/')
    }

    return(
        <>
        {/* check if user is verified */}
        { !users.data.verified && users.auth ?
            <div className='not_verified'>Not Verified</div>
        :null}
        <nav className={`navbar fixed-top ${site.layout}`}>
            <Link to="/" className='navbar-brand d-flex align-items-center fredoka_ff'>
                Flickbase
            </Link>
            <SideDrawer users={users} signOutUser={signOutUser}/>
        </nav>
        </>
    )
}

export default Header;