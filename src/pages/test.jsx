import{ useState } from "react"

export default function Test() {
    const [count, setCount] = useState(0)
    return(
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-125 h-125 bg-secondary flex flex-col items-center justify-center relative">
                <h1 className="text-[55px]">{count}</h1>
                <div className="flex flex-row gap-4">
                    <button className="bg-green-500 rounded-b-sm m-5 w-25 h-12.5" onClick={() => setCount(count + 1)}>increase</button>
                    <button className="bg-red-500 rounded-b-sm m-5 w-25 h-12.5" onClick={() => setCount(count - 1)}>decrease</button>
                </div>
            </div>

        </div>
    )
}