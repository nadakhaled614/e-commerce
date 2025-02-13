import { createContext, useState } from "react";

export let counter = createContext(0)

export default function CounterContextProvider({ children }) {

    let [count, setCount] = useState(0)

    function increase() {
        setCount(count + 1)
    }

    return <counter.Provider value={{ count, increase }}>
        {children}
    </counter.Provider>
}