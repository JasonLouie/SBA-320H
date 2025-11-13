import Button from "../components/Button";
import "../styles/page-controller.css";

export default function PageController({ page, maxPages, route }) {
    function createPageButtons(nums) {
        return (
            <>
                {nums.map(n => { if (n <= maxPages) return <Button key={n} disabled={n === page} classList={`page-num ${n === page ? "current" : ""}`} path={`${route}${route.includes("?") ? "&" : "?"}page=${n}`}>{n}</Button> })}
            </>
        );
    }

    function showPageNumbers() {
        switch (page % 3) {
            case 1:
                return createPageButtons([page, page + 1, page + 2]);
            case 2:
                return createPageButtons([page - 1, page, page + 1]);
            case 0:
                return createPageButtons([page - 2, page - 1, page]);
        }
    }

    return (
        <div className="page-control-container">
            <div className="page-controls">
                <Button disabled={page === 1} classList="page-direction-btn prev" path={`${route}${route.includes("?") ? "&" : "?"}page=${page - 1}`}>Previous</Button>
                {showPageNumbers()}
                <Button disabled={page === maxPages} classList="page-direction-btn next" path={`${route}${route.includes("?") ? "&" : "?"}page=${page + 1}`}>Next</Button>
            </div>
        </div>
    );
}