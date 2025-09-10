import { useNavigate } from "react-router-dom";


export default function Pagination({
    currentPage,
    totalPages,
    basePath="",
    query={}

}){
    const nagivate=useNavigate();

    const goToPage=(page)=>{
        if(page<1||page>totalPages) return;
        const searchParams=new URLSearchParams({...query,page});
        nagivate(`${basePath}?${searchParams.toString()}`);

    };

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        const addPage = (p) => {
            if (!pages.includes(p)) pages.push(p);
        };

        if (totalPages <= maxVisible + 2) {
            for (let i = 1; i <= totalPages; i++) addPage(i);
        } else {
            if (currentPage <= maxVisible) {
                for (let i = 1; i <= maxVisible; i++) addPage(i);
                pages.push("...");
                addPage(totalPages);
            } else if (currentPage >= totalPages - maxVisible + 1) {
                addPage(1);
                pages.push("...");
                for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) {
                    addPage(i);
                }
            } else {
                addPage(1);
                pages.push("...");
            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                addPage(i);
            }
                pages.push("...");
                addPage(totalPages);
            }
        }
        return pages;
    };


    return(
        <div className="flex items-center justify-center space-x-2 mt-6">
            <button className={`px-3 py-1 rounded ${currentPage===1?"text-gray-400":"hover:bg-gray-100"}`} onClick={()=>goToPage(currentPage-1)} disabled={currentPage===1}> Previous</button>
            {
                getPageNumbers().map((p, idx) =>
                    p === "..." ? (
                        <span key={`dots-${idx}`} className="px-2">...</span>
                    ) : (
                        <button
                        key={`page-${p}`}
                        onClick={() => goToPage(p)}
                        className={`px-3 py-1 rounded ${
                            currentPage === p ? "bg-gray-300 font-bold" : "hover:bg-gray-100"
                        }`}
                        >
                        {p}
                        </button>
                    )
                )

            }
             <button className={`px-3 py-1 rounded ${currentPage===1?"text-gray-400":"hover:bg-gray-100"}`} onClick={()=>goToPage(currentPage+1)} disabled={currentPage===totalPages}> Next</button>

        </div>
    )
};