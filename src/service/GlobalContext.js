import { useContext, createContext, useState, useEffect } from "react";

export const DataContext = createContext(null);

export const GlobalContext = ({children}) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        // fetch('https://jsonplaceholder.typicode.com/todos/1')
        //     .then(response => response.json())
        //     .then(res => {
        //         console.log(res);
        //         setTimeout(() => setData(res), 3000)
        //     })
        ///console.log('перезагрузка контекста');
    }, [data])

    const valueContext = { dataContext: data, changeData: setData };

    return (
            <DataContext.Provider value={valueContext}>
                {children}
            </DataContext.Provider>
            )
};

export const useGlobalContext = () => useContext(DataContext);
