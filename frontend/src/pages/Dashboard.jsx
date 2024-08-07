import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
function Dashboard(){

    return (<div>
       <AppBar Name={"sudesh"}/>
       <div className="m-8">
        <Balance value={"10,200"}/>
        <Users />
       </div>
    </div>)
}

export default Dashboard;