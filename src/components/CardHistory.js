import React, { useState,useContext} from "react";
import { Calendar } from "lucide-react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { historyData } from "../contexts/historyDataContext";


export default function CardHistory({layout}) {
const {currentData}=useContext(historyData);
    const diseaseList = currentData.map((element, index) => (
        <tr key={index}>
            <td>
                <Calendar style={{ marginRight: "3px", height: "16px", width: "16px" }} />
                {element.date}
            </td>
            <td style={{width:"40%",display:"flex",gap:"4px",flexWrap:"wrap",alignItems:"center",justifyContent:"start",padding:"0"}}>
                {element.symptoms.map((s, i) => (
                    <div
                        key={i}
                        style={{
                            width: "fit-content",
                            padding: "5px 8px",
                            backgroundColor: "hsl(189 100% 42% / 0.1)",
                            borderRadius: "20px",
                            color:"hsl(189 100% 42%)",
                            fontSize:"14px",
                        }}
                    >
                        {s}
                    </div>
                ))}
            </td>
            <td>{element.disease}</td>
            {/* <td>{element.description}</td> */}
            <td
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent:"center",
                    gap:"7px",
                    
                }}
            >
                <div
                    style={{
                        position: "relative",
                        width: "90px",
                        height: "8px",
                        borderRadius: "60px",
                        backgroundColor: "#e0f7fa",
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            width: `${element.confidence}%`,
                            height: "100%",
                            borderRadius: "60px",
                            backgroundColor: "#00bcd4",
                        }}
                    ></div>
                </div>
                <h5 style={{ margin: "0 0 0 5px", fontSize: "14px" }}>{element.confidence}%</h5>
            </td>
        </tr>
    ));

    // Custom MUI Theme
    const theme = createTheme({
        components: {
            MuiPaginationItem: {
                styleOverrides: {
                    root: {
                        "&.Mui-selected": {
                            backgroundColor: "hsl(189, 100%, 42%, 0.1)",
                            color: "hsl(189, 100%, 42%)",
                        },
                    },
                },
            },
        },
    });
    const diseaseListCard=currentData.map((element, index) => (
        
        <div className="grid-card" style={{display:"flex",width:"30%",flexDirection:"column",padding:"20px 18px",borderRadius:"16px",gap:"10px",backgroundColor:"white",boxShadow:"1px 1px gray"}}>
            <div className="date" style={{justifyContent:"end",display:"flex",alignItems:"center"}}><Calendar style={{height:"16px"}}/> {element.date}</div>
            <div className="disease" style={{fontSize:"20px",fontWeight:"600"}}>{element.disease }</div>
            <h5 style={{marginTop:"12px",fontWeight:"400",fontSize:"16px"}}>Symptoms</h5>
            <div className="symptoms" style={{display:"flex",gap:"20px",flexWrap:"wrap"}}> {element.symptoms.map((s, i) => (
                    <div
                        key={i}
                        style={{
                            fontWeight:"700",
                            width: "fit-content",
                            padding: "5px 8px",
                            backgroundColor: "hsl(189 100% 42% / 0.1)",
                            borderRadius: "20px",
                            color:"hsl(189 100% 42%)",
                            fontSize:"12px",
                        }}
                    >
                        {s}
                    </div>
                    ))}
                </div>
            <div className="confidence" style={{display:"flex",gap:"20px",alignItems:"center",justifyContent:"start"}}><div
                    style={{
                        position: "relative",
                        width: "60%",
                        height: "8px",
                        borderRadius: "60px",
                        backgroundColor: "#e0f7fa",
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            width: `${element.confidence}%`,
                            height: "100%",
                            borderRadius: "60px",
                            backgroundColor: "#00bcd4",
                        }}
                    ></div>
                </div>
                <h5 style={{ margin: "0 0 0 5px", fontSize: "14px" }}>{element.confidence}%</h5></div>
        </div>
      ));
      return (
        layout === 'list' ? (
            <ThemeProvider theme={theme}>
                <table className="table" style={{}}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th style={{ width: "20%" }}>Symptoms</th>
                            <th>Disease</th>
                            <th style={{}}>Confidence</th>
                        </tr>
                    </thead>
                    <tbody>{diseaseList}</tbody>
                </table>
            </ThemeProvider>
        ) : (
            <div
                className="all-grid-card"
                style={{
                    gap: "20px",
                    justifyContent: "center",
                    display: "flex",
                    flexWrap: "wrap"
                }}
            >
                {diseaseListCard}
            </div>
        )
    );
}