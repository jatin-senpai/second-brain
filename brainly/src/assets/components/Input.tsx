interface inputprops{
    placeholder:string,
    reference?:any
}
export function Input({reference,placeholder}:inputprops){
    return (
        <div>
            <input ref={reference} type={"text"} className="px-4 py-2 border rounded m-2"  placeholder={placeholder}/>
        </div>
    )
}