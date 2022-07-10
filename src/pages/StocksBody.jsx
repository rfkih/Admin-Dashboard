import React,{useState, useRef, useEffect} from 'react'

import { Typography,Container, Grid, TextField, ListItem, List, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Card, Avatar, CardContent,InputBase, Input, IconButton,  OutlinedInput, InputAdornment,  FormControl, InputLabel, MenuItem, Select, CardActions, Button, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, CardHeader } from '@material-ui/core'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {Link, useParams} from 'react-router-dom'
import axios from '../utils/axios';
import { Category } from '@mui/icons-material';
import { setTime } from '@syncfusion/ej2-react-schedule';

function StocksBody() {
  return (
    <>
        <TableRow>
            Test
        </TableRow>
    </>
  )
}

export default StocksBody