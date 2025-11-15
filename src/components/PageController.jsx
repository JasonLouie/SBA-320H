import { Fragment } from "react";
import Button from "../components/Button";
import "../styles/pageController.css";

export default function PageController({ page, maxPages, route }) {
    const createBounds = (isFirst, currPage) =>
        <>
            {isFirst && <Button key={1} className="page-num" path={`${route}${route.includes("?") ? "&" : "?"}page=1`}>1</Button>}
            {(isFirst || (!isFirst && maxPages - currPage > 1)) && <Button disabled={true} className="page-num dots" />}
            {!isFirst && <Button key={maxPages} className="page-num" path={`${route}${route.includes("?") ? "&" : "?"}page=${maxPages}`}>{maxPages}</Button>}
        </>;

    const createPageButtons = (nums) =>
        <>
            {nums.map((n, i) => n <= maxPages &&
                <Fragment key={n}>
                    {i === 0 && n >= 4 && createBounds(true)}
                    <Button disabled={n === page} className={`page-num ${n === page ? "current" : ""}`} path={`${route}${route.includes("?") ? "&" : "?"}page=${n}`}>{n}</Button>
                    {i === 2 && (n < maxPages) && createBounds(false, n)}
                </Fragment>
            )}
        </>;

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
        <>
            {maxPages && <div className="page-control-container">
                <div className="page-controls">
                    <Button disabled={page === 1} className="page-direction-btn prev" path={`${route}${route.includes("?") ? "&" : "?"}page=${page - 1}`}>Previous</Button>
                    {showPageNumbers()}
                    <Button disabled={page === maxPages} className="page-direction-btn next" path={`${route}${route.includes("?") ? "&" : "?"}page=${page + 1}`}>Next</Button>
                </div>
            </div>}
        </>
    );
}