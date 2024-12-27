export function reducerHistory(currentState, action) {
    let type = action.type;
    let data = action.payload.data;

    // Fonction pour convertir la date en un format ISO standard
    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('/'); // Séparer jour, mois, année
        return new Date(`${year}-${month}-${day}`); // Format ISO: YYYY-MM-DD
    };

    switch (type) {
        case 'ascending':
            return [...data].sort((a, b) => parseDate(a.date) - parseDate(b.date));
        case 'descending':
            return [...data].sort((a, b) => parseDate(b.date) - parseDate(a.date));
        case 'search':
            console.log([...data.filter(item => 
                item.disease && item.disease.toLowerCase().includes(action.payload.keyword.toLowerCase())
            )]);
            console.log(action.payload.keyword)
            return [...data.filter(item => 
                item.disease && item.disease.toLowerCase().includes(action.payload.keyword.toLowerCase())
            )];
        default:
            return { data };
    }
}
