export function AppBar({Name}){
return (
    <div className="h-16 flex container justify-between border border-gray-900 shadow-sm w-full">
        <div className="h-auto text-blue-800 pt-3 pl-5 font-black text-3xl text-center">Paytm</div>
        <div className="flex">
            <div className="justify-center pt-5 pr-5 font-bold">{Name}</div>
            <div className="justify-center rounded-full bg-slate-900 h-12 w-12 mt-2 mr-5"></div>
        </div>
    </div>
)
}