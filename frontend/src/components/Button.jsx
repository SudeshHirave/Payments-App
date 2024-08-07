export function Button({label,onPress}){
    return (<div className="mt-5 w-full">
        <button onClick={onPress} type="button" className="px-10 w-full py-2 bg-gray-900 text-white rounded-xl hover:bg-black hover:shadow-lg hover:text-white">{label}</button>
    </div>
    )
}