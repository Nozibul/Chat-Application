import { useSelector } from "react-redux";
import Message from "./Message";

const Messages=({messages = []})=>{
    const { user } = useSelector(state=> state.auth);
    const { email } = user || {};

    return (
        <div className="relative w-full h-[calc(100vh_-_197px)] p-6 overflow-y-auto flex flex-col-reverse">
            <ul className="space-y-2">
                {
                    messages?.slice()?.sort((a, b)=> a.timestamp - b.timestamp)?.map((message)=> {
                        const { message: lastMessage, id , sender} = message || {} ;
                        const justify = sender.email !== email ? "start" : "end"
                        return (
                          <Message justify={justify} key={id} message={lastMessage}/>
                    )})
                }
            </ul>
        </div>
    );
};

export default Messages ;
