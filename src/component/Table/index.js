import { useState, useEffect, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLoaderData } from "react-router-dom";
import {
  Button,
  Container,
  Dropdown,
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

const renderTablaData = (x, val, action) => {
  if (val === "full_name") {
    return <td style={{ verticalAlign: "center", cursor: "pointer" }} onClick={() => action(x[val], x['mysportfeeds_abbreviation'])} >{x[val]}</td>;
  }
  return <td style={{ verticalAlign: "center" }} >{x[val]}</td>;
};

const renderData = (
  data,
  page,
  range,
  header,
  action
) => {
  const item_list = data.slice((page - 1) * range, page * range);
  return item_list.map((x) => (
    <tr>
      {Object.keys(header).map((val) => (
        renderTablaData(x, val, action)
      ))}
    </tr>
  ));
};

function CustomTable(props) {
  const {
    data = [],
    header = {},
    action = undefined,
    pagination = false,
    range = 5,
  } = props;

  data.map((obj, index) =>
    Object.keys(obj).map((key) =>
      {
        if( obj[key] == undefined || obj[key] == "" || obj[key] == null) {
          data[index][key] = "N/A"
        } 
      }
    )
  );

  const { items, requestSort, sortConfig } = useSortableData(data);
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

  const renderHeader = ({ key, value }) => (
        <th>
        <Button
            color="link"
            onClick={() => requestSort(key)}
            className={isActive(key)}
        >
            <div className="d-flex justify-content-between align-items-center">
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

  return (
    <div id="custom_table">
      <div className="d-flex mb-2">
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
      <Table responsive borderless striped>
        <thead>
          <tr>
            {Object.entries(header).map(([x, y]) => renderHeader({key: x, value: y}))}
          </tr>
        </thead>
        <tbody>
          {renderData(
            items,
            page,
            itemRange,
            header,
            action
          )}
        </tbody>
      </Table>
      <div className="d-flex flex-column flex-lg-row justify-content-center justify-content-lg-between pb-4 pt-4">
        {/* <div> */}
        <p className="text-center text-lg-left">
          Showing {(page - 1) * itemRange + 1} to{" "}
          {items.length > itemRange ? page * itemRange : items.length} of{" "}
          {items.length} entries
        </p>
        {/* </div> */}
        {pagination ? (
          <Pagination
            className="pagination-bar"
            currentPage={page}
            totalCount={items.length}
            pageSize={itemRange}
            onPageChange={(page) => setPage(page)}
            siblingCount={1}
          />
        ) : null}
      </div>
    </div>
  );
}

export default CustomTable;
