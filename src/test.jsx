import { useLocation} from "react-router";


const Test = () => {
    const {state} = useLocation()

    const fonc = () => {
        console.log(state.user)
    }
    return ( 
        <button onClick={fonc}>test</button>
     );
}
 
export default Test;