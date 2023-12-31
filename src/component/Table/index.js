import { useState, useEffect, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLoaderData } from "react-router-dom";
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Table,
  UncontrolledDropdown,
} from "reactstrap";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpLong, faDownLong } from "@fortawesome/free-solid-svg-icons";
import useSortableData from "../../hooks/useSortableData";
import Pagination from "../Pagination";
import SkeletonElements from "../Skeleton";
import Shimmer from "../Skeleton/shimmer";
import IMAGE from '../../img';
import uuid from 'react-uuid';
import SearchTable from "../SearchTable";
// import { setDatasets } from "react-chartjs-2/dist/utils";


const TableSkeletonElements = ({renderHeaderComponent, row=5, col=5, theme}) => {
    const themeStyle = theme || 'light'
    return (
        <div className="skeleton-wrapper"> 
            <div className="skeleton-table">
                <Table responsive borderless striped> 
                    <thead>
                        <tr>
                            {renderHeaderComponent}
                        </tr>
                    </thead>
                    <tbody>
                        {Array(row).fill(0).map(x => <tr>{Array(col).fill(0).map(y => <td><SkeletonElements type="text" /></td>)}</tr>)}
                    </tbody>
                </Table>
            </div>
            <div className="asd"><Shimmer /></div>
        </div>
    )
}

const renderData2 = (
  data,
  page,
  range,
  header,
  onClickList,
  playeImage=false,
  // backgroundColor="#000",
) => {
  const item_list = data.slice((page - 1) * range, page * range);
  if(playeImage) {
    return item_list.map((x) => (
      
      <tr key={uuid()} style={{cursor: 'pointer'}}>
        <td><img style={{border: `2px solid #041e42`, borderRadius: "50%", width: "45px", height: "45px", objectFit: "cover"}} src={x['image'] || IMAGE.PROFILE}/></td>
        {Object.keys(header).slice(1).map((val, index) => (
          <td onClick={() => onClickList[index + 1](x)} style={{cursor: 'pointer', userSelect: 'none'}}>{x[val]}</td>
        ))}
      </tr>
    ));
  }
  return item_list.map((x) => (
    <tr key={uuid()} style={onClickList.length > 0 ? {cursor: 'pointer'} : {}}>
      {Object.keys(header).map((val, index) => (
        <td style={{userSelect: 'none'}} onClick={() => (onClickList[index] ? onClickList[index](x) : {})}>{x[val]}</td>
      ))}
    </tr>
  ));
};

const renderData = (
  data,
  page,
  range,
  header,
  onClick,
  playeImage=false,
  // backgroundColor="#000",
) => {
  const item_list = data.slice((page - 1) * range, page * range);
  if(playeImage) {
    return item_list.map((x) => (
      
      <tr key={uuid()} style={{cursor: 'pointer'}} onClick={() => onClick(x)}>
        <td><img style={{border: `2px solid #041e42`, borderRadius: "50%", width: "45px", height: "45px", objectFit: "cover"}} src={x['image'] || IMAGE.PROFILE}/></td>
        {Object.keys(header).slice(1).map((val) => (
          <td style={{cursor: 'pointer', userSelect: 'none'}}>{x[val]}</td>
        ))}
      </tr>
    ));
  }
  return item_list.map((x) => (
    <tr key={uuid()} style={onClick ? {cursor: 'pointer'} : {}} onClick={() => onClick(x)}>
      {Object.keys(header).map((val) => (
        <td style={{userSelect: 'none'}}>{x[val]}</td>
      ))}
    </tr>
  ));
};

function CustomTable(props) {
  const {
    data = [],
    header = {},
    pagination = false,
    noRange = false,
    range = 5,
    row=5,
    theme='light',
    loading = false,
    onClick = () => {},
    onClickList = [],
    color="#fff",
    playeImage=false,
    backgroundColor="#000",
    search=false,
    search_placeholder,
    search_keys=[]
  } = props;


  const [data_cp, setData] = useState([])
  // let data_cp = [...data]

  data.map((obj, index) =>
    Object.keys(obj).map((key) =>
      {
        if( obj[key] == undefined || obj[key] == "" || obj[key] == null) {
            // data_cp[index][key] = 0
        } 
      }
    )
  );


  useEffect(() => {
    setData(data)
  }, [data])
  
  const { items, requestSort, sortConfig } = useSortableData(data_cp);
  const [itemRange, setItemRange] = useState(range);
  const [page, setPage] = useState(1);

  const isActive = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name
      ? `${sortConfig.direction} active`
      : undefined;
  };

  const renderHeader = ({ key, value, backgroundColor, color }) => (
        <th style={{backgroundColor: backgroundColor}}>
        <Button
            color="link"
            onClick={() => requestSort(key)}
            className={isActive(key)}
        > 
            <div style={{color: color}} className="d-flex justify-content-between align-items-center">
            {value}
            <div className="d-flex">
                <div className="up">
                  <FontAwesomeIcon icon={faUpLong} />
                </div>
                <div className="down">
                  <FontAwesomeIcon icon={faDownLong} />
                </div>
            </div>
            </div>
        </Button>
        </th>
    );

  if (window.innerWidth < 720) {
  }

  const renderTable = () => {
    const renderHeaderComponent = Object.entries(header).map(([x, y]) => renderHeader({key: x, value: y, backgroundColor: backgroundColor, color: color}))
    if (loading) {
        return TableSkeletonElements({renderHeaderComponent, row, col: Object.keys(header).length, theme})
      }
      return (
        <Table responsive borderless striped>
            <thead>
              <tr>
               {renderHeaderComponent}
              </tr>
            </thead>
            <tbody>
              {onClickList.length > 0 ?
              renderData2 (
                items,
                page,
                itemRange,
                header,
                onClickList,
                playeImage
              )
              : renderData(
                items,
                page,
                itemRange,
                header,
                onClick,
                playeImage
              )}
            </tbody>
        </Table>
      )
  }

  return (
    <div id="custom_table">
      <div className="d-flex align-items-center justify-content-between mb-2">
      {!noRange ? <div className="d-flex mb-2">
          <p>Show</p>
          <UncontrolledDropdown>
            <DropdownToggle
              nav
              caret
              className="mr-2 ml-2"
              style={{ width: "60px !important" }}
            >
              {itemRange}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                onClick={() => {
                  setItemRange(5);
                  setPage(1);
                }}
              >
                5
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  setItemRange(10);
                  setPage(1);
                }}
              >
                10
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  setItemRange(25);
                  setPage(1);
                }}
              >
                25
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  setItemRange(50);
                  setPage(1);
                }}
              >
                50
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <p>Entries</p>
        </div>
      : null}
      {search ? 
        <div className="w-100 d-flex justify-content-end align-items-end">
          <SearchTable placeholder={search_placeholder} list={data} onChange={(e) => setData(e)} search_keys={search_keys} />
        </div>
      : null}
      </div>
      {renderTable()}
      {pagination ? 
      <div className="d-flex flex-column flex-lg-row justify-content-center justify-content-lg-between pb-4 pt-4">
        {/* <div> */}
        <p className="text-center text-lg-left">
          Showing {(page - 1) * itemRange + 1} to{" "}
          {items.length > itemRange ? page * itemRange : items.length} of{" "}
          {items.length} entries
        </p>
        {/* </div> */}
        
          <Pagination
            className="pagination-bar"
            currentPage={page}
            totalCount={items.length}
            pageSize={itemRange}
            onPageChange={(page) => setPage(page)}
            siblingCount={1}
          />
      </div>
      : null}
    </div>
  );
}

export default CustomTable;
