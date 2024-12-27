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
   import { useState,useRef,useReducer } from 'react';  

   /* ============================== 
      Importations context 
      ============================== */
    import { historyData } from '../contexts/historyDataContext';

   /* ============================== 
      Styles CSS personnalisés 
      ============================== */
   import '../styles/history.css';  

      /* ============================== 
                Components
      ============================== */
   import CardHistory from './CardHistory';
   import PaginationComp from './PaginationComp';

      /* ============================== 
                Reducers 
      ============================== */
   import { reducerHistory } from '../reducers/reducerHistory';

      /* ============================== 
      Data and variables 
      ============================== */
   const options =['descending sort', 'ascending sort'];
   let dataHistory = [
    {
        date: "01/01/2022",
        symptoms: ["Headache", "Fever", "Cough",'jhjjjjjjj','ffffffffffffffffffffff','jhjfffffffffjjjjjj'],
        disease: "Common Cold",
        description: "Common cold caused by viruses",
        confidence: 60, // percentage
    },
    {
        date: "15/03/2022",
        symptoms: ["Fatigue", "Nausea", "Vomiting"],
        disease: "Food Poisoning",
        description: "Illness caused by contaminated food or water",
        confidence: 85,
    },
    {
        date: "20/07/2022",
        symptoms: ["Chest Pain", "Shortness of Breath"],
        disease: "Heart Disease",
        description: "Symptoms may indicate a cardiovascular issue",
        confidence: 90,
    },
    {
        date: "10/11/2022",
        symptoms: ["Sore Throat", "Sneezing", "Runny Nose"],
        disease: "Flu",
        description: "Seasonal influenza caused by viral infection",
        confidence: 70,
    },
    {
        date: "05/12/2022",
        symptoms: ["Fever", "Chills", "Sweating"],
        disease: "Malaria",
        description: "Parasitic disease spread by infected mosquitoes",
        confidence: 75,
    },
];

export default function HistoryPage(){
   /* ============================== 
        State and reducers 
      ============================== */
    const [data,dispatchHistory] =useReducer(reducerHistory,dataHistory);
    const [btnActive, setActive] = useState('list');
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

       /* ============================== 
      Control de pagination
      ============================== */
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [currentPage, setCurrentPage] = useState(1); // Page active
    const itemsPerPage = 3; // Nombre d'éléments par page
    const [layout,setLayout] = useState('list');
// Calcul des éléments à afficher pour la page active
    const startIndex = (currentPage - 1) * itemsPerPage;
    let currentData = data.length > 0 ? data.slice(startIndex, startIndex + itemsPerPage) : [];

       /* ============================== 
       Handling events
      ============================== */
    const handlePageChange = (event, value) => {
            setCurrentPage(value);
        };
    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
        
      };
    
      const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
        //hna andiro sortings;
        if(options[selectedIndex]==='descending sort'){
            dispatchHistory({
                type:'descending',
                payload:{
                    data:dataHistory
                }
            })
        }
        if(options[selectedIndex]==='ascending sort'){
            dispatchHistory({
                type:'ascending',
                payload:{
                    data:dataHistory
                }
            })
        }
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
        if(layout==='grid') {
            setLayout('list');
        }else {
            setLayout('grid');
        }
        
    }
    return (
        <historyData.Provider value={{
            data:data,
            currentData:currentData,
            
        }}>
            < div className='history' style={{width:"95%",height:"95%"}}>
                <Container  maxWidth="xl">
                    <Grid container spacing={8} className='main-root'>
                            <Grid item xs={12} className='nav-bar' sx={{
                                    display: "flex",
                                    flexDirection: { xs: "column", sm: "row" }, // Colonne pour mobile, ligne pour écrans plus larges
                                    alignItems: "center",
                                    justifyContent: { xs: "space-between", sm: "center" },
                                    gap: 2,
                                }}>
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
                                            <TextField
                                                id="outlined-basic"
                                                label="Search predictions.."
                                                variant="outlined"
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                    borderRadius: "40px",
                                                    },
                                                    "& .MuiInputLabel-root.Mui-focused": {
                                                    color: "hsl(215.4 16.3% 46.9%)",
                                                    },
                                                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: "hsl(215.4 16.3% 46.9%)",
                                                    },
                                                }}
                                                onChange={(event) => {
                                                    dispatchHistory({
                                                        type:'search',
                                                        payload:{
                                                            keyword:event.target.value,
                                                            data:dataHistory
                                                        }
                                                    });
                                                }}
                                            />

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
                                        <CardHistory layout={layout}/>

                                    </div>
                                    

                            </Grid>
                    </Grid>
                </Container>
                <PaginationComp currentPage={currentPage} setCurrentPage={setCurrentPage} handlePageChange ={handlePageChange} itemsPerPage={itemsPerPage}/>
            </div>
        </historyData.Provider>
    )
}

/* ╔═══════════════════════════════════════╗
   ║               𝑏𝑦 𝑅𝑜𝑜𝑚67              ║
   ║   🚪 The room where magic happens 🚪 ║
   ╚═══════════════════════════════════════╝ */
