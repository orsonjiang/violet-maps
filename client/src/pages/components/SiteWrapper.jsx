import { useEffect } from "react";
import { useDispatch } from "react-redux";

import auths from "../../api/auth";
import { setUser } from "../../actions/user";

const SiteWrapper = ({children}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        auths.postLogin({ auto: true })
        .then(req => {
            if (req.status === 200) {
                dispatch(setUser(req.data));
            }
        })
        .catch()
    }, []);

    return (
        <div className='flex flex-col bg-gray-50 min-h-screen'>
            {children}
        </div>
    )
}

export default SiteWrapper;