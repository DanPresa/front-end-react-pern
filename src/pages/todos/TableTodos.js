import React from 'react'
import {
    Row,
    Col,
    DropdownToggle,
    UncontrolledDropdown,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
    PaginationProvider,
    PaginationTotalStandalone,
    PaginationListStandalone,
    SizePerPageDropdownStandalone
} from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import classNames from 'classnames';

const TableTodos = ({ data, columns, loading }) => {

    const indication = () => ( <div className="text-center">There isn't data here :(</div> )

    const sizePerPageRenderer = ({ options, currSizePerPage, onSizePerPageChange }) => (
        <>
            <label className="d-inline mr-1">Showing</label>
            <UncontrolledDropdown className="d-inline">
                <DropdownToggle caret tag="button" type="button" className="btn btn-outline-secondary">
                    { currSizePerPage }
                </DropdownToggle>
                <DropdownMenu>
                    {options.map((option, idx) => (
                        <DropdownItem
                            key={ idx }
                            type="button"
                            className={classNames({ active: currSizePerPage === option.page })}
                            onClick={() => onSizePerPageChange(option.page)}
                        >
                            { option.text }
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </UncontrolledDropdown>
            <label className="d-inline ml-1">todos</label>
        </>
    );

    const customTotal = (from, to, size) => (
        <span className="react-bootstrap-table-pagination-total">
            Showing from { from } to { to } of { size } { size > 1 ? 'todos' : 'todo' }
        </span>
    )

    const paginationOptions = {
        page: 1,
        sizePerPage: 5,
        paginationSize: 5,
        pageStartIndex: 1,
        lastPageText: '>>|',
        firstPageText: '|<<',
        nextPageText: '>',
        prePageText: '<',
        firstPageTitle: 'Primera',
        prePageTitle: 'Anterior',
        nextPageTitle: 'Siguiente',
        lastPageTitle: 'Última',
        hideSizePerPage: false,
        custom: true,
        paginationTotalRenderer: customTotal,
        withFirstAndLast: true,
        alwaysShowAllBtns: true,
        showTotal: true,
        sizePerPageList: [
            {
                text: '5',
                value: 5,
            },
            {
                text: '10',
                value: 10,
            },
            {
                text: '25',
                value: 25,
            },
            {
                text: '50',
                value: 50,
            },
            {
                text: '100',
                value: 100,
            },
            {
                text: 'All',
                value: data.length
            }
        ],
        sizePerPageRenderer: sizePerPageRenderer
    };

    const { SearchBar } = Search;

    if ( loading ) return <p>Loading...</p>

    return (
        <>
            <PaginationProvider
                bootstrap4
                pagination={ paginationFactory(paginationOptions) }
                keyField="id"
            >
                {
                    ({ paginationProps, paginationTableProps }) => (
                        <ToolkitProvider
                            keyField="id"
                            data={ data }
                            columns={ columns }
                            search
                        >
                            {
                                (props) => (
                                    <>
                                        <Row className="mb-2">
                                            <Col xs="12 mb-3" md="6 mb-md-0">
                                                <SizePerPageDropdownStandalone { ...paginationProps } />
                                            </Col>
                                            <Col xs="12" md="6" className="text-md-right">
                                                Search: <SearchBar { ...props.searchProps  } />
                                            </Col>
                                        </Row>
                                        <BootstrapTable
                                            {...props.baseProps}
                                            striped
                                            bordered={ false }
                                            noDataIndication={ indication }
                                            wrapperClasses="table-responsive"
                                            { ...paginationTableProps }
                                        />
                                        <Row>
                                            <Col xs="12" md="6" className="mb-2 mb-md-0 mt-1">
                                                <PaginationTotalStandalone { ...paginationProps } dataSize={data.length} />
                                            </Col>
                                            <Col xs="12" md="6">
                                                <PaginationListStandalone { ...paginationProps } />
                                            </Col>
                                        </Row>
                                    </>
                                )
                            }
                        </ToolkitProvider>
                    )
                }
            </PaginationProvider>
        </>
    )
}

export default TableTodos;
