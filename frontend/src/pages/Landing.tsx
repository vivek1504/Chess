import { useNavigate } from "react-router-dom"

export const Landing = () => {
    const navigate = useNavigate();
    return <div className="w-full h-screen bg-chess-board bg-no-repeat bg-center bg-cover">
        <div className="flex flex-col justify-center">
            <div className="flex justify-center text-white text-3xl font-extrabold pt-10">
                Worlds no.1 chess playing platform
            </div>
            <div className="flex justify-center text-slate-300 font-medium pt-1">
                Your Next Brilliant Move Starts Here !
            </div>
            <div className=" flex justify-center pt-8">
                <button className="px-4 py-3 rounded-md bg-[#0070f3] font-bold text-white tracking-widest uppercase transform hover:scale-105 hover:bg-[#0070f3] transition-colors duration-200 flex justify-center" onClick={()=>{
                    navigate("/game")
                }}>
                    Play Online
                </button> 
            </div>
        </div>
    </div>
}


