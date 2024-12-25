import React, { useState } from "react";
import { Calendar } from "lucide-react";
import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const data = [
    {
        date: "01/01/2022",
        symptoms: ["Headache", "Fever", "Cough"],
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

export default function CardHistory() {
    const [currentPage, setCurrentPage] = useState(2); // Page active
    const itemsPerPage = 3; // Nombre d'éléments par page

    // Calcul des éléments à afficher pour la page active
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = data.slice(startIndex, startIndex + itemsPerPage);

    // Gestion du changement de page
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const diseaseList = currentData.map((element, index) => (
        <tr key={index}>
            <td>
                <Calendar style={{ marginRight: "3px", height: "16px", width: "16px" }} />
                {element.date}
            </td>
            <td style={{width:"20%",display:"flex",gap:"4px",flexWrap:"wrap",alignItems:"center",justifyContent:"start",padding:"0"}}>
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
            <td>{element.description}</td>
            <td
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent:"center",
                    gap:"7px",
                    width: "10%",
                }}
            >
                <div
                    style={{
                        position: "relative",
                        width: "70px",
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
                            <th>Description</th>
                            <th style={{ width: "10%" }}>Confidence</th>
                        </tr>
                    </thead>
                    <tbody>{diseaseList}</tbody>
                </table>
                <Pagination
                    count={Math.ceil(data.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rectangular"
                    style={{ marginTop: "16px", justifyContent: "center", display: "flex" }}
                />
        </ThemeProvider>
    );
}
