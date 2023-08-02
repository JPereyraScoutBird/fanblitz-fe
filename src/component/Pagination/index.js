import { Button } from 'reactstrap';
import './style.css'
import {usePagination, DOTS} from '../../hooks/usePagination';

function Pagination(props) {
    const {
      onPageChange,
      totalCount,
      siblingCount = 1,
      currentPage,
      pageSize,
      className
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
      });

    
    // console.log(paginationRange)
    // If there are less than 2 times in pagination range we shall not render the component
    if (currentPage === 0 || paginationRange.length < 2) {
      return null;
    }

    let lastPage = paginationRange[paginationRange.length - 1];

    
    return (
    <div className='pagination'>
        <Button outline className='mr-1' disabled={currentPage == 1} onClick={() => onPageChange(currentPage - 1)}>{'Previous'}</Button>
        {paginationRange.map(pageNumber => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === paginationRange['DOTS']) {
            return <li className="pagination-item dots">&#8230;</li>;
        }
        // Render our Page Pills
        return (<Button outline className={currentPage == pageNumber ? 'active mr-1' : 'mr-1'} disabled={currentPage == pageNumber} onClick={() => onPageChange(pageNumber)}>{pageNumber}</Button>)
        })}
        <Button outline className='' disabled={currentPage == lastPage} onClick={() => onPageChange(currentPage + 1)}>{'Next'}</Button>
    </div>
    )
}


export default Pagination;
