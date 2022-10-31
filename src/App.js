import './App.css';
import Table from "./components/table/table";
import Dates from "./components/dates/dates";
import Client from "./components/detailsClient/client";
import Main from "./components/detailsMain/main";
import Header from "./components/header/header";
import TableForm from "./components/tableForm/TableForm";
import {useState, useRef} from "react";
import ReactToPrint from "react-to-print";
import {setDate} from "./services";


function App() {
    const tableValues = {clientName:"", clientEmail:"", description:"", quantity:1, price:0, amount:"" };
    const [formValues, setFormValues] = useState(tableValues)
    const [showInvoice, setShowInvoice] = useState(false)
    const [currentDate, setCurrentDate] = useState(setDate(new Date(), 0))
    const [dueDate, setDueDate] = useState(setDate(new Date(),7))
    const [amount, setAmount] = useState("")
    const [list, setList] = useState([])
    const [total, setTotal] = useState(0)

    const componentRef = useRef()

    const handlePrint = () => {
        window.print()
    }

    return (
        <div>
            <main className="m-5 p-5 md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white rounded shadow">
                {showInvoice
                    ?
                    <div>
                        <ReactToPrint
                            trigger={() => <button className="ml-5 bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">Print / Download</button>}
                            content={() => componentRef.current}
                        />
                        <div ref={componentRef} className="p-5">
                            <Header handlePrint={handlePrint}/>
                            <Main/>
                            <Client clientName={formValues.clientName} clientEmail={formValues.clientEmail}/>
                            <Dates currentDate={currentDate} dueDate={dueDate}/>
                            <Table list={list} setlist={setList} total={total} setTotal={setTotal}/>
                        </div>
                        <button onClick={() => setShowInvoice(false)}
                                className=" mt-5 bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">Edit information
                        </button>
                    </div>
                    :
                    (
                        <div className="flex flex-col justify-center">
                            <article>
                                <TableForm
                                    // clientData={clientData}
                                    // setClientData={setClientData}
                                    currentDate={currentDate}
                                    setCurrentDate={setCurrentDate}
                                    dueDate={dueDate}
                                    setDueDate={setDueDate}
                                    formValues={formValues}
                                    setFormValues={setFormValues}
                                    amount={amount}
                                    setAmount={setAmount}
                                    list={list}
                                    setList={setList}
                                    total={total}
                                    setTotal={setTotal}
                                    showInvoice={showInvoice}
                                    setShowInvoice={setShowInvoice}
                                />
                            </article>
                        </div>
                    )
                }
            </main>
        </div>
    );
}

export default App;
