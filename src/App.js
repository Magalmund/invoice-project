import './App.css';
import Notes from "./components/notes/notes";
import Footer from "./components/footer/footer";
import Table from "./components/table/table";
import Dates from "./components/dates/dates";
import Client from "./components/detailsClient/client";
import Main from "./components/detailsMain/main";
import Header from "./components/header/header";
import TableForm from "./components/tableForm/TableForm";
import {useState} from "react";


function App() {
    const [showInvoice, setShowInvoice] = useState(false)
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [bankName, setBankName] = useState("")
    const [bankAccount, setBankAccount] = useState("")
    const [website, setWebsite] = useState("")
    const [clientName, setClientName] = useState("")
    const [clientAddress, setClientAddress] = useState("")
    const [invoiceNumber, setInvoiceNumber] = useState("")
    const [invoiceDate, setInvoiceDate] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [notes, setNotes] = useState("")
    const [description, setDescription] = useState("")
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("")
    const [amount, setAmount] = useState("")
    const [list, setList] = useState([])
    const [total, setTotal] = useState(0)
    const handlePrint = () => {
        window.print()
    }
    return (
        <div>
            <main className="m-5 p-5 md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white rounded shadow">
                {showInvoice
                    ?
                    <div>
                        <Header handlePrint={handlePrint}/>
                        <Main name={name} address={address}/>
                        <Client clientName={clientName} clientAddress={clientAddress}/>
                        <Dates invoiceNumber={invoiceNumber} invoiceDate={invoiceDate} dueDate={dueDate}/>
                        <Table description={description} quantity={quantity} price={price} amount={amount} list={list} setlist={setList} total={total} setTotal={setTotal}/>
                        <Notes notes={notes}/>
                        <Footer name={name} address={address} website={website} email={email} phone={phone}
                                bankAccount={bankAccount} bankName={bankName}/>
                        <button onClick={() => setShowInvoice(false)}
                                className=" mt-5 bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">Edit
                            information
                        </button>
                    </div>
                    :
                    (
                        <div className="flex flex-col justify-center">
                            <article className="md:grid grid-cols-2 gap-10">
                                <div className="flex flex-col">
                                    <label htmlFor="name">Enter your full name</label>
                                    <input
                                        type="text"
                                        name="text"
                                        id="name"
                                        placeholder="Enter your name"
                                        autoComplete="off"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}/>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="address">Enter your address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        id="address"
                                        placeholder="Enter your address"
                                        autoComplete="off" value={address}
                                        onChange={(e) => setAddress(e.target.value)}/>
                                </div>
                            </article>

                            <article className="md:grid grid-cols-3 gap-10">
                                <div className="flex flex-col">
                                    <label htmlFor="email">Enter your email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Enter your email"
                                        autoComplete="off" value={email}
                                        onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="website">Enter your website</label>
                                    <input
                                        type="url"
                                        name="website"
                                        id="website"
                                        placeholder="Enter your website"
                                        autoComplete="off" value={website}
                                        onChange={(e) => setWebsite(e.target.value)}/>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="phone">Enter your phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        placeholder="Enter your phone"
                                        autoComplete="off" value={phone}
                                        onChange={(e) => setPhone(e.target.value)}/>
                                </div>
                            </article>

                            <article className="md:grid grid-cols-2 gap-10">
                                <div className="flex flex-col">
                                    <label htmlFor="bankName">Enter your bank name</label>
                                    <input
                                        type="text"
                                        name="bankName"
                                        id="bankName"
                                        placeholder="Enter your bank name"
                                        autoComplete="off" value={bankName}
                                        onChange={(e) => setBankName(e.target.value)}/>
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="bankAccount">Enter your bank account number</label>
                                    <input
                                        type="text"
                                        name="bankAccount"
                                        id="bankAccount"
                                        placeholder="Enter your bank account number"
                                        autoComplete="off" value={bankAccount}
                                        onChange={(e) => setBankAccount(e.target.value)}/>
                                </div>
                            </article>

                            <article className="md:grid grid-cols-2 gap-10 md:mt-20">
                                <div className="flex flex-col">
                                    <label htmlFor="clientName">Enter your client's name</label>
                                    <input
                                        type="text"
                                        name="client name"
                                        id="client name"
                                        placeholder="Enter your client's name"
                                        autoComplete="off" value={clientName}
                                        onChange={(e) => setClientName(e.target.value)}/>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="clientAddress">Enter your client's address</label>
                                    <input
                                        type="text"
                                        name="clientAddress"
                                        id="clientAddress"
                                        placeholder="Enter your client's address"
                                        autoComplete="off" value={clientAddress}
                                        onChange={(e) => setClientAddress(e.target.value)}/>
                                </div>
                            </article>

                            <article className="md:grid grid-cols-3 gap-10">
                                <div className="flex flex-col">
                                    <label htmlFor="invoiceNumber">Invoice number</label>
                                    <input
                                        type="text"
                                        name="invoiceNumber"
                                        id="invoiceNumber"
                                        placeholder="Invoice number"
                                        autoComplete="off" value={invoiceNumber}
                                        onChange={(e) => setInvoiceNumber(e.target.value)}/>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="invoiceDate">Invoice date</label>
                                    <input
                                        type="date"
                                        name="invoiceDate"
                                        id="invoiceDate"
                                        placeholder="Invoice date"
                                        autoComplete="off" value={invoiceDate}
                                        onChange={(e) => setInvoiceDate(e.target.value)}/>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="dueDate">Due date</label>
                                    <input
                                        type="date"
                                        name="dueDate"
                                        id="dueDate"
                                        placeholder="Due date"
                                        autoComplete="off" value={dueDate}
                                        onChange={(e) => setDueDate(e.target.value)}/>
                                </div>
                            </article>



                            {/*This is our table form*/}
                            <article>
                                <TableForm
                                    description={description}
                                    setDescription={setDescription}
                                    quantity={quantity}
                                    setQuantity={setQuantity}
                                    price={price}
                                    setPrice={setPrice}
                                    amount={amount}
                                    setAmount={setAmount}
                                    list={list}
                                    setList={setList}
                                    total={total} setTotal={setTotal}
                                />
                            </article>



                            <label htmlFor="notes">Additional notes</label>
                            <textarea name="notes" id="notes" cols="30" rows="10"
                                      placeholder="Additional notes to the client" value={notes}
                                      onChange={(e) => setNotes(e.target.value)}></textarea>


                            <button onClick={() => setShowInvoice(true)}
                                    className="bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">Preview
                                invoice
                            </button>
                        </div>
                    )
                }
            </main>
        </div>
    );
}

export default App;
