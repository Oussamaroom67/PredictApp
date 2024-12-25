import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
//icons
import {ShieldCheck} from "lucide-react";

const ConfidenceLevel = ({ value }) => {
    return (
        <Box>
            <Box display="flex" alignItems="center">
            <Box flexGrow={1} mr={2}>
                <LinearProgress 
                variant="determinate" 
                value={value} 
                sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: "#f5f5f5",
                    "& .MuiLinearProgress-bar": {
                    backgroundColor: "#00b894", // Couleur verte personnalisée
                    },
                }}
                />
            </Box>
            <Typography variant="subtitle1" color="#00b894">
                {`${value}%`}
            </Typography>
            </Box>
        </Box>
    );
};
export default function CardDisease(props){
    return(
        <div style={props.style}>
            <Card sx={{ minWidth: 600 , padding:'16px',borderRadius:'14px'}} >
                <CardContent sx={{display:'flex',flexDirection:'column',alignItems:'start',justifyContent:'center',gap:'20px'}}>
                    <div style={{display:'flex',justifyContent:'space-between',width:'100%'}}>
                        <Typography gutterBottom sx={{ color: '#424242', fontSize: 30,fontWeight:700 ,marginTop:'3px'}}>
                            Common Cold
                        </Typography>
                        <ShieldCheck style={{width:'50px',height:'50px',padding:'10px',backgroundColor:'#b2dfdb',borderRadius:'50%',color:'#009688'}}/>
                    </div>
                    <div>
                        <Typography sx={{color:'#616161'}}>
                            A viral infection of your nose and throat (upper respiratory tract).
                        </Typography>
                    </div>
                    <div style={{width:'100%',display:'flex',flexDirection:'column',justifyContent:'start',alignItems:'start'}}>
                        <Typography variant="subtitle1" gutterBottom>
                            Confidence Level
                        </Typography>
                        <ConfidenceLevel value={78} />
                    </div>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>  
        </div>      
    )
}