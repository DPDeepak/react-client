import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  IconButton,
  TableRow,
  TableHead,
  TableCell,
  TablePagination,
  TableBody,
  Table,
  Paper,
  TableSortLabel,
} from '@material-ui/core';
import withLoaderAndMessage from '../../components/HOC';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
    cursor: 'pointer',
  },
});

const SimpleTable = (props) => {
  const createSortHandler = (event, field, order) => {
    event.preventDefault();
    const { onSort } = props;
    onSort(field, order);
  };

  const handleClick = (event, id) => {
    event.preventDefault();
    const { onSelect } = props;
    onSelect(id);
  };

  const handleChangePage = (event, page) => {
    const { onChangePage } = props;
    onChangePage(page);
  };

  const {
    classes, data, column, order, act, page, count, rowsPerPage, actions,
  } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {(column.length) ?
              column.map(col => (
                <TableCell align={col.align}>
                  <TableSortLabel
                    active={act === col.label}
                    direction={order}
                    onClick={event => createSortHandler(event, col.label, order)}
                  >
                    {col.label || col.field}
                  </TableSortLabel>
                </TableCell>
              ))
              : ''
            }
            <TableCell />

          </TableRow>
        </TableHead>
        <TableBody>
          {(data.length) ?
            data.map(row => (
              <TableRow key={row.id} className={classes.row} hover>

                {(column.length) ?
                  column.map((col) => {
                    let value = row[col.field];
                    if (col.hasOwnProperty('format')) {
                      const temp = col.format;
                      value = temp(value);
                    }
                    return (

                      <TableCell align={col.align} onClick={event => handleClick(event, row.id)}>
                        {value}
                      </TableCell>
                    );
                  })
                  : ''
                }

                <TableCell>
                  {(actions.length) ?
                    actions.map(obj => (
                      <IconButton style={{ display: 'flex' }} onClick={event => obj.handler(event, row)}>
                        {obj.icon}
                      </IconButton>
                    ))
                    : ''
                  }
                </TableCell>
              </TableRow>
            ))
            : ''
          }
        </TableBody>
      </Table>
      {
        (
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={handleChangePage}
          />
        )
      }
    </Paper>
  );
};

SimpleTable.propTypes = {
  classes: PropTypes.objectOf.isRequired,
};

export default withStyles(styles)(withLoaderAndMessage(SimpleTable));
