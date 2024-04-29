import { useRecoilState } from "recoil"
import { idUser } from "./hooks"


const useIdUser = () => {
    const [userId,setUserId] = useRecoilState(idUser);
  
    return {userId,setUserId}
}

export {useIdUser}

  