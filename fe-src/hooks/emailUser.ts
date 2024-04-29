import { useRecoilState } from "recoil"
import { emailUser} from "./hooks"


const useEmailUser = () => {
  const [eUser,setEmailUser] = useRecoilState(emailUser);

  return {eUser, setEmailUser}
}



export {useEmailUser}