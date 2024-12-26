import React, { useState,useContext} from "react";
import { Calendar } from "lucide-react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { historyData } from "../contexts/historyDataContext";


export default function CardHistory() {
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

    return (
        <ThemeProvider theme={theme}>
                <table className="table" style={{}}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th style={{ width: "20%" }}>Symptoms</th>
                            <th>Disease</th>
                            {/* <th>Description</th> */}
                            <th style={{  }}>Confidence</th>
                        </tr>
                    </thead>
                    <tbody>{diseaseList}</tbody>
                </table>

        </ThemeProvider>
    );
}
