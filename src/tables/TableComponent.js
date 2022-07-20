import React from 'react'

// import EnigmaSettlementBlotter from "../Tables/SettlementBlotter";
// import TradeBlotterTable from "../Tables/TradeBlotter";
// import EnigmaTable from "../Tables/ProductsTable";
// import RequestsTable from "../Tables/RequestsTable";
// import SettlementSummryTable from "../Tables/SettlementSummryTable";
import MarketDataTable from '../components/Tables/MarketDataTable'
import PnlMonitor from '../components/Tables/PnlTable'
import IntradayMonitor from '../components/Tables/IntraDay'
// import PrefundingTable from "../Tables/PrefundingBlotter";

function TableComponent({ tableType, columns }) {
	switch (tableType) {
		case 'market_data':
			break
		case 'pnl_monitor':
			console.log('hereeee')
			return <PnlMonitor type={tableType} columns={columns} />
		case 'intraday_monitor':
			return <IntradayMonitor type={tableType} columns={columns} />
		default:
			break
	}
	//   if (tableType === "settlementBlotter") {
	//     return (
	//       <EnigmaSettlementBlotter
	//         type={tableProps.type}
	//         subType={tableProps.subType}
	//         horizontalType={tableProps.horizontalType}
	//         columns={tableProps.columns}
	//         data={tableProps.rows}
	//         lastItemRef={tableProps.lastItemRef}
	//         iconAction={tableProps.iconAction}
	//         sortTable={tableProps.handleChangeSort}
	//         sort={tableProps.sort}
	//         fullscreen={tableProps.fullscreen}
	//         openModal={tableProps.openModal}
	//       />
	//     );
	//   } else if (tableProps.subType === "requests") {
	//     return (
	//       <RequestsTable
	//         type={tableProps.type}
	//         subType={tableProps.subType}
	//         horizontalType={tableProps.horizontalType}
	//         columns={tableProps.columns}
	//         data={tableProps.rows}
	//         handleRequestResponse={tableProps.handleRequestResponse}
	//       />
	//     );
	//   } else if (tableType === "prefunding") {
	//     return (
	//       <PrefundingTable
	//         type={tableProps.type}
	//         subType={tableProps.subType}
	//         horizontalType={tableProps.horizontalType}
	//         columns={tableProps.columns}
	//         data={tableProps.rows}
	//         lastItemRef={tableProps.lastItemRef}
	//         iconAction={tableProps.iconAction}
	//         sortTable={tableProps.handleChangeSort}
	//         sort={tableProps.sort}
	//         fullscreen={tableProps.fullscreen}
	//         openModal={tableProps.openModal}
	//       />
	//     );
	//   } else if (tableType === "settlementSummary") {
	//     return (
	//       <SettlementSummryTable
	//         type={tableProps.type}
	//         subType={tableProps.subType}
	//         columns={tableProps.columns}
	//         data={tableProps.rows}
	//       />
	//     );
	//   } else {
	//     return (
	//       <EnigmaTable
	//         type={tableProps.type}
	//         subType={tableProps.subType}
	//         horizontalType={tableProps.horizontalType}
	//         columns={tableProps.columns}
	//         data={tableProps.rows}
	//         actionEnums={tableProps.actionEnums}
	//       />
	//     );
	//   }
	// <Table
	//   className={clsx(classes.styledTable, {
	//     // [classes.companyUsersTable]: tableProps.type === 'company_users'
	//   })}
	//   stickyHeader={!tableProps.horizontalType}
	// >
	//   <TableHead>
	//     <TableRow
	//       className={clsx(classes.styledHeaderRow, {
	//         [classes.companyUsersHeaderRow]: tableProps.type === 'company_users'
	//       })}
	//     >
	//       {columns &&
	//         columns.content &&
	//         columns.content.map(
	//           (item, i) =>
	//           shouldRender(item) && (
	//               <React.Fragment key={item.name}>
	//                 <TableCell
	//                   style={{ padding: tableProps.type === 'company_users' && item.name === '' && 0 }}
	//                   className={clsx(classes.styledHeaderCell, {
	//                     [classes.viewTradesHeaderCell]: tableProps.subType === 'ViewTrades',
	//                     [classes.productsHeaderCell]: tableProps.subType === 'productRequests',
	//                     [classes.defaultHeaderCell]: tableProps.type === 'default' || tableProps.subType === 'profiles_admin',
	//                     [classes.sortableDefaultTableCell]:
	//                       tableProps.type === 'default' &&
	//                       (item.name === 'created_at' ||
	//                         item.name === 'crypto' ||
	//                         item.name === 'country' ||
	//                         item.name === 'status' ||
	//                         item.name === 'full_name' ||
	//                         item.name === 'is_active'),
	//                     // [classes.defaultProfilesCell]: tableProps.type === 'profiles',
	//                     [classes.widgetHeaderCell]: tableProps.type === 'widget' && tableProps.subType !== 'ViewTrades',
	//                     [classes.transactionsHeaderCell]: tableProps.type === 'settlement_modal',
	//                     [classes.companyUsersHeaderCell]: tableProps.type === 'company_users' || tableProps.subType === 'profiles_client',
	//                     [classes.checkboxesTableCell]: item?.name === 'all' || item?.name === 'none',
	//                     [classes.fixedCell]: tableProps.horizontalType && item.name === 'counterparty'
	//                   })}
	//                   align={'center'}
	//                   id={item.name}
	//                   key={item.name}
	//                   aria-label={i}
	//                   onDrag={handleOnDrag}
	//                   draggable={isDraggingDisabled ? null : drag}
	//                   onDragStart={isDraggingDisabled ? null : handleDragStart}
	//                   onDragOver={isDraggingDisabled ? null : handleDragOver}
	//                   onDragEnd={isDraggingDisabled ? null : handleDragEnd}
	//                   onDragEnter={isDraggingDisabled ? null : handleDragEnter}
	//                   onDragLeave={handleDragLeave}
	//                   onDrop={(e) => {
	//                     handleOnDrop(e)
	//                   }}
	//                 >
	//                   <ColumnRenderer
	//                     key={item.name}
	//                     columnName={item.name}
	//                     sorted={item.sorted}
	//                     sortable={item.sortable}
	//                     sortHandler={tableProps.handleChangeSort}
	//                     type={tableProps.type}
	//                     subType={tableProps.subType}
	//                     sortType={tableProps.sortType}
	//                   />
	//                 </TableCell>
	//                 {i < columns.content.length - 1 || tableProps.actionColumn ? (
	//                   <ColumnResizer
	//                     disabled={(tableProps.columns.id === 'profiles' || tableProps.subType === 'productRequests') && true}
	//                     className={
	//                       tableProps.type === 'settlement_modal' || tableProps.type === 'widget' || tableProps.type === 'company_users'
	//                         ? 'widgetResizer'
	//                         : 'ResizerDivider'
	//                     }
	//                     minWidth={0}
	//                     setDrag={setDrag}
	//                     resizerBackgroundColor={tableProps.type === 'settlement_modal' ? theme.palette.primary.main : theme.palette.background.container}
	//                   />
	//                 ) : null}
	//               </React.Fragment>
	//             )
	//         )}

	//       {columns?.content && tableProps?.actionColumn && (
	//         <TableCell
	//           align='center'
	//           className={clsx(classes.styledHeaderCell, {
	//             [classes.widgetHeaderNonSortable]: tableProps.type === 'widget',
	//             [classes.defaultHeaderCell]: tableProps.type === 'default' || tableProps.subType === 'profiles_admin',
	//             [classes.companyUsersHeaderCell]: tableProps.type === 'company_users' || tableProps.subType === 'profiles_client',
	//             [classes.twoActionEnums]: tableProps.actionEnums?.length === 2,
	//             [classes.threeActionEnums]: tableProps.actionEnums?.length === 3,
	//           })}
	//         >
	//           {tableProps.actionColumn === 'download' ? '' : tableProps.actionColumn}
	//         </TableCell>
	//       )}
	//     </TableRow>
	//   </TableHead>
	// {<TableBodyComponent {...TableBodyProps} shouldRender={shouldRender} />}
	// </Table>
}

export default TableComponent
