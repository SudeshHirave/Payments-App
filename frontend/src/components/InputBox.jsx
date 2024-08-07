export function InputBox({Placeholder,label,onChange}){
return (<div>
    <div className="text-sm font font-medium text-left py-2 px-3">
        {label}
    </div>
    <input onChange={onChange} placeholder={Placeholder} className="w-full px-2 py-1 border rounded-xl hover:shadow-md"></input>
</div>)
}