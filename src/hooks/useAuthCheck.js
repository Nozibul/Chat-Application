import { useEffect , useState} from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/auth/authSlice";

const useAuthCheck = () => {
    const [authCheck, setAuthCheck] = useState(false);
    const dispatch = useDispatch();
  useEffect(()=>{
    const localAuth = localStorage?.getItem('auth');

    if(localAuth){
        const auth = JSON.parse(localAuth); 
        if(auth?.accessToken && auth?.user){
            dispatch(userLoggedIn({
                accessToken: auth.accessToken,
                user: auth.user
            }))
        }
    }
    setAuthCheck(true)
  },[dispatch]);
 
  return authCheck;

}

export default useAuthCheck ;