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
//size
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// icons
import { Activity, Brain, Heart, Thermometer, Plus, Stethoscope,Pill,Syringe,Ambulance,HeartPulse } from "lucide-react";
// style
import "../styles/Predict.css"; 
//hocks

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function Predict() {
    // gestion responsive
    const theme = useTheme(); 
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.up('sm') && theme.breakpoints.down('md'));
    const isMd = useMediaQuery(theme.breakpoints.up('md') && theme.breakpoints.down('lg'));
    const isLg = useMediaQuery(theme.breakpoints.up('lg'));    

    const cardWidth = React.useMemo(() => {
        if (isXs | isSm) return '90%'; 
        if (isMd) return '70%';
        if (isLg) return '50%'; 
        return '50%'; 
    }, [isXs, isSm, isMd, isLg]);     
    // states
    const [loading, setLoading] = React.useState(false);
    // handlers
    const handleClick = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 8000); 

    };    
    return (
        <>  
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
                    justifyContent: "space-around",
                    position: "relative", 
                    opacity: loading ? 0.1 : 1
                }}
            >        
            {/* accueil */}
            <div style={{ paddingLeft: "20px" }}>
                <Typography variant="h4" sx={{ textAlign: "start", margin: "0", fontWeight: "700",color:'#1565c0',zIndex:'2',position: 'relative'}}>
                Good Morning, Omaima!
                </Typography>
                <Typography sx={{ textAlign: "start", margin: "0", fontSize: "16px", color: "gray",zIndex:'2',position: 'relative' }}>
                Ready to take control of your health today?
                </Typography>
            </div>

            <div  style={{ display: "flex", position: "relative" ,gap:"50px",justifyContent:'center',zIndex:'2',alignItems:'center'}}>
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
                        options={top100Films}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option.title}
                        renderOption={(props, option, { selected }) => {
                            const { key, ...optionProps } = props;
                            return (
                            <li key={key} {...optionProps}>
                                <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
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
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px', // Pour arrondir les coins
                                        '&:hover fieldset': {
                                            borderRadius: '12px',
                                            borderColor:'#bbdefb' // Lors du hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderRadius: '12px', // Lors de la sélection
                                        },
                                    },
                                }}
                            />
                        )}
                    />
                    <Button 
                    onClick={handleClick}
                    variant="contained"    
                    sx={{
                        width: {
                            xs: '90%',  
                            sm: '80%',  
                            md: '50%',  
                            lg: '30%',  
                            xl: '20%'   
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

            {/* icons */}
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

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
        title: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
      title: 'Star Wars: Episode V - The Empire Strikes Back',
      year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
      title: 'The Lord of the Rings: The Two Towers',
      year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
      title: 'Star Wars: Episode IV - A New Hope',
      year: 1977,
    },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
];

