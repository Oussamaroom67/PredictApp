/* ============================== 
    Importations de Material-UI 
   ============================== */
    import Container from '@mui/material/Container';   
    import Paper from '@mui/material/Paper';  
    import Grid from '@mui/material/Grid';  
    import ToggleButton from '@mui/material/ToggleButton';  
    import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';  
    import TextField from '@mui/material/TextField';
    import Button from '@mui/material/Button';
    import ButtonGroup from '@mui/material/ButtonGroup';
    import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
    import ClickAwayListener from '@mui/material/ClickAwayListener';
    import Grow from '@mui/material/Grow';
    import Popper from '@mui/material/Popper';
    import MenuItem from '@mui/material/MenuItem';
    import MenuList from '@mui/material/MenuList';

   /* ============================== 
      Importations d'icônes 
      ============================== */
   import { LayoutList, LayoutGrid, Stethoscope,Search,Filter} from 'lucide-react';  
   /* ============================== 
      Importations React 
      ============================== */
   import { useState,useRef } from 'react';  
   /* ============================== 
      Styles CSS personnalisés 
      ============================== */
   import '../styles/history.css';  
   import CardHistory from './CardHistory';
   
   const options =['descending sort', 'ascending sort'];

export default function HistoryPage(){
    const [btnActive, setActive] = useState('list');
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
      };
    
      const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
        //hna andiro sortings;
      };
    
      const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
      };
    
      const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
          return;
        }
    
        setOpen(false);
      };
    
    const handleChangeButton = (event, newAlignment) => {
        console.log(newAlignment);
        if (newAlignment !== null) {
            setActive(newAlignment);
        }
    }
    return (
        
        < div className='history' style={{width:"90%"}}>
            <Container  maxWidth="xl">
                <Grid container spacing={8}>
                        <Grid item xs={12} className='nav-bar'>
                            <div className="head">
                                <Stethoscope   className='icon' />
                                <div className="title">
                                    <h3>Prediction History</h3>
                                    <p>View and manage your previous health predictions</p>
                                </div>
                            </div>
                            <ToggleButtonGroup
                                value={btnActive}
                                exclusive
                                onChange={handleChangeButton}
                                aria-label="text alignment"
                                className='control'
                                >
                                <ToggleButton value="list" aria-label="left aligned" style={{borderRadius:"12px"}} >
                                    <LayoutList style={{height:"19px",width:"19px",fontWeight:"300"}}/>
                                </ToggleButton>
                                <ToggleButton value="grid" aria-label="centered" style={{borderRadius:"12px"}}>
                                    <LayoutGrid style={{height:"22px",width:"22px",fontWeight:"300"}}/>
                                </ToggleButton>
                            </ToggleButtonGroup>

                        </Grid>
                        <Grid item xs={12} >
                            <div className="content">
                                <div className="menu">
                                    <div className="search">
                                        <Search style={{height:"20px",width:"20px",color:"hsl(215.4 16.3% 46.9%)"}}/>
                                        <TextField id="outlined-basic" label="Search predictions.." variant="outlined" sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                    borderRadius: "20px", 
                                                    },
                                                    "& .MuiInputLabel-root.Mui-focused": {
                                                        color: "hsl(215.4 16.3% 46.9%)", 
                                                        borderColor: "hsl(215.4 16.3% 46.9%)", 
                                                      },
                                        }} />
                                    </div>
                                          <ButtonGroup
                                                variant="contained"
                                                ref={anchorRef}
                                                aria-label="Button group with a nested menu"
                                                sx={{backgroundColor:"transparent"}}
                                            >
                                                <Button onClick={handleClick}><Filter style={{marginRight:"4px"}}/>{options[selectedIndex]}</Button>
                                                <Button
                                                size="small"
                                                aria-controls={open ? 'split-button-menu' : undefined}
                                                aria-expanded={open ? 'true' : undefined}
                                                aria-label="descending sort"
                                                aria-haspopup="menu"
                                                onClick={handleToggle}
                                                >
                                                <ArrowDropDownIcon />
                                                </Button>
                                            </ButtonGroup>
                                            <Popper
                                                sx={{ zIndex: 1 }}
                                                open={open}
                                                anchorEl={anchorRef.current}
                                                role={undefined}
                                                transition
                                                disablePortal
                                            >
                                                {({ TransitionProps, placement }) => (
                                                <Grow
                                                    {...TransitionProps}
                                                    style={{
                                                    transformOrigin:
                                                        placement === 'bottom' ? 'center top' : 'center bottom',
                                                    }}
                                                >
                                                    <Paper>
                                                    <ClickAwayListener onClickAway={handleClose}>
                                                        <MenuList id="split-button-menu" autoFocusItem>
                                                        {options.map((option, index) => (
                                                            <MenuItem
                                                            key={option}
                                                            disabled={index === 2}
                                                            selected={index === selectedIndex}
                                                            onClick={(event) => handleMenuItemClick(event, index)}
                                                            >
                                                            {option}
                                                            </MenuItem>
                                                        ))}
                                                        </MenuList>
                                                    </ClickAwayListener>
                                                    </Paper>
                                                </Grow>
                                                )}
                                            </Popper>
                                </div>
                                    {/* table here */}
                                    <CardHistory/>

                                </div>
                                

                        </Grid>
                </Grid>
            </Container>
        </div>
    )
}