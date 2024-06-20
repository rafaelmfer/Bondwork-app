import { createContext } from "react";

const createThemeContext = createContext();
const createThemeContextSecond = createContext();
const createThemeContextThird = createContext();

export {
    createThemeContext,
    createThemeContextSecond,
    createThemeContextThird,
};

{
    /* pass valuee from context 
        const meses = ['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho'];
    <createThemeContext.Provider value={meses}>
        <Chart dates={meses} />
    </createThemeContext.Provider> 
    
    need call useContext
    useContext(createThemeContext) its is going to give the result;    
*/
}
