import * as React from "react";
// elements
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../AnimationHeart.json";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

//size
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// icons
import { Activity, Brain, Heart, Thermometer, Plus, Stethoscope,Pill,Syringe,Ambulance,HeartPulse } from "lucide-react";
// style
import "../styles/Predict.css"; 
//component
import CardDisease from "./CardDisease";
//data
import symptoms from '../data/Symtoms.json';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function Predict() {
    const navigate = useNavigate();

    // gestion responsive
    const theme = useTheme(); 
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.up('sm') && theme.breakpoints.down('md'));
    const isMd = useMediaQuery(theme.breakpoints.up('md') && theme.breakpoints.down('lg'));
    const isLg = useMediaQuery(theme.breakpoints.up('lg'));    

    const cardWidth = React.useMemo(() => {
        if (isXs | isSm) return '90%'; 
        if (isMd) return '67%';
        if (isLg) return '40%'; 
        return '50%'; 
    }, [isXs, isSm, isMd, isLg]);     
    const CardDiseaseWidth = React.useMemo(() => {
        if (isXs | isSm) return '90%'; 
        if (isMd) return '70%';
        if (isLg) return '50%'; 
        return '50%'; 
    }, [isXs, isSm, isMd, isLg]);  
    // states
    const [loading, setLoading] = React.useState(false);
    const [Showcard , setShowCard] = React.useState(false);
    const [selectedOptions, setSelectedOptions] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [userName, setUserName] = React.useState('Unknown');
    const [userId, setUserId]=React.useState();
    const [cardContent, setCardContent] = React.useState({});
    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token") || localStorage.getItem("token");
        const userId = urlParams.get("userId") || localStorage.getItem("userId");
        const userName = urlParams.get("userName") || localStorage.getItem("userName");
            
    
        if (token) {
            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);
            localStorage.setItem("userName", userName);
        } else {
            navigate("/login"); // Si le token n'existe pas, rediriger vers la page de connexion
        }
    }, [navigate]);
    
    React.useEffect(()=>{
        setUserId(localStorage.getItem("userId"));
        setUserName(localStorage.getItem("userName"))
    })
    // handlers
    const handleClick = async () => {
        setLoading(true);
        try{
            const symptomes = selectedOptions.map(item => item.title);

            const response = await axios.post('http://localhost:8080/api/predict', {symptomes: symptomes,userId:userId});
            console.log(response.data);
            setCardContent(response.data);
            setShowCard(true);
        }catch(e){
            console.error(e);
        }
        finally{
            setLoading(false);
        }
        // setTimeout(() => {
        //     setLoading(false);
        //     setShowCard(true);
        // }, 8000); 
    };    
    const handleAroundClick = ()=>{
        if(Showcard){
            setShowCard(false);
        }
    };
    const handleChange= (event, value, reason)=>{
        if(value.length == 6){
            console.log('Triggering Snackbar');
            setOpen(true);
        }
        setSelectedOptions(value);
        
    }
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    
        setOpen(false);
    };
    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    return (
        <>             
            {/* CardDisease */}
            <CardDisease
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,
                    visibility: Showcard ? "visible" : "hidden",
                    width:CardDiseaseWidth
                }}
                cardContent={cardContent}
            />        
            {/* Loading */}
            <div
                style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1000,
                visibility: loading ? "visible" : "hidden",
                }}
            >
                <Player
                autoplay
                loop
                src={animationData}
                style={{ height: "170px", width: "600px"}}
                />
            </div>   
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: isXs ?'5%':'10%',
                    position: "relative", 
                    opacity: loading|Showcard ? 0.1 : 1
                }}
                onClick={handleAroundClick}
            >      
            {/* Snackbar */}
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Do not exceed 6 symptoms!"
                action={action}
            /> 
            {/* accueil */}
            <div style={{ paddingLeft: "20px" }}>
                <Typography variant="h5" sx={{ textAlign: "start", margin: "0", fontWeight: "700",color:'#1565c0',zIndex:'2',position: 'relative'}}>
                Good day, {userName}!
                </Typography>
                <Typography sx={{ textAlign: "start", margin: "0", fontSize: "14px", color: "gray",zIndex:'2',position: 'relative' }}>
                Ready to take control of your health today?
                </Typography>
            </div>

            <div  style={{ display: "flex", position: "relative" ,gap:"10%",justifyContent:'center',zIndex:'2',alignItems:'center'}}>
                {/* image */}
                <img
                src="/doctor.png"
                alt="Medical Animation"
                className="animated-image" 
                style={{width:'34%',display:isXs|isSm|isMd?'none':'flex'}}
                />

                {/* input */}
                <div className="CenterDiv" style={{width: cardWidth}}>
                    <Typography sx={{textAlign:'start',fontWeight:"600"}}>Select the symptoms you’re experiencing <br/>Feel free to choose as many as needed to help us understand you better!</Typography>
                    <Autocomplete
                        multiple
                        id="checkboxes-tags-demo"
                        options={symptoms}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option.title}
                        value={selectedOptions}
                        onChange={handleChange}
                        renderOption={(props, option, { selected }) => {
                            const { key, ...optionProps } = props;
                            const isDisabled = selectedOptions.length >= 6 && !selected;
                            return (
                            <li key={key} {...optionProps} 
                            style={{
                                opacity: isDisabled ? 0.5 : 1,
                                pointerEvents: isDisabled ? 'none' : 'auto',
                            }}>
                                <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                disabled={isDisabled}
                                checked={selected}
                                />
                                {option.title}
                            </li>
                            );
                        }}
                        style={{ width: '90%' }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Symptoms"
                                sx={{
                                    zIndex: 2,
                                    borderRadius: '12px',
                                    borderColor:'black !important',
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px', 
                                        '&:hover fieldset': {
                                            borderRadius: '12px',
                                            borderColor:'#3949ab' 
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderRadius: '12px', 
                                        },
                                    },
                                }}
                            />
                        )}
                    />
                    <Button 
                    disabled={selectedOptions.length <=2}
                    onClick={handleClick}
                    variant="contained"    
                    sx={{
                        width: {
                            xs: '90%',  
                            sm: '90%',  
                            md: '60%',  
                            lg: '50%',  
                            xl: '30%'   
                        },
                        background: 'linear-gradient(to right, #2196f3, #9c27b0)',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                        '&:hover': {
                            boxShadow: '0 0 15px rgba(156, 39, 176, 0.6)',
                            transform: 'scale(1.05)'
                        }
                    }}>Let's Predict</Button>
                </div>
            </div>

            {/* icons background */}
            <div className="iconns-container">
                <Activity className="iconn heart" />
                <Brain className="iconn brain" />
                <Heart className="iconn pulse" />
                <Thermometer className="iconn thermometer" />
                <Plus className="iconn plus" />
                <Stethoscope className="iconn stethoscope" />
                <Pill className="iconn pill" />
                <Syringe className="iconn syringe" />
                <Ambulance className="iconn ambulance"/>
                <HeartPulse className="iconn heartPulse"/>
            </div>
            </div>
        </>
    );
}


