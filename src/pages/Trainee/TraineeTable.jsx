import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableSortLabel from '@material-ui/core/TableSortLabel';


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
    console.log(',,,,', field);
    const { onSort } = props;
    onSort(field, order);

  };

  const handleClick = (event, id) => {
    event.preventDefault();
    const { onSelect } = props;
    console.log(';;;;;;;', id);
    onSelect(id);
  }

  const { classes, data, column, onSelect, onSort, order, act } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {
              column.map(col => (
                <TableCell align={col.align}>
                  <TableSortLabel
                    active={act === col.label}
                    direction={order}
                    onClick={(event) => createSortHandler(event, col.label, order)}
                  >
                    {col.label || col.field}
                  </TableSortLabel>
                </TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow key={row.id} className={classes.row} hover>

              {column.map((col) => {
                let value = row[col.field];
                if (col.hasOwnProperty('format')) {
                  const temp = col.format;
                  value = temp(value);
                }
                return (
                  <TableCell align={col.align} onClick={event => handleClick(event, row.id)}>{value}</TableCell>
                  // <Link to={`/trainee/${trainee.id}`}>{trainee.name}</Link>

                );
              })
                // {/* <TableCell>{row.email}</TableCell>
                // <TableCell align="right">{row.format}</TableCell> */}
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.objectOf.isRequired,
};

export default withStyles(styles)(SimpleTable);
