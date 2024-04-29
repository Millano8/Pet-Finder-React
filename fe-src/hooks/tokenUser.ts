import { useRecoilState } from "recoil"
import { token } from "./hooks"

const useTokenUser = () => {
    const [userToken,setUserToken] = useRecoilState(token);
  
    return {userToken,setUserToken}
  }

export {useTokenUser}