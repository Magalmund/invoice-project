import React, {useState, useEffect} from 'react';
import {v4 as uuidv4} from "uuid"
import {AiOutlineDelete} from "react-icons/ai"
import {setDate} from "../../services";


const TableForm = ({

                       amount,
                       setAmount,
                       list,
                       setList,
                       total,
                       setTotal,
                       currentDate,
                       setCurrentDate,
                       dueDate,
                       setDueDate,
                       formValues,
                       setFormValues,
                       showInvoice,
                       setShowInvoice
                   }) => {
    //Calculate items amount
    useEffect(() => {
        const calculateAmount = (amount) => {
            setAmount(formValues.quantity * formValues.price)
        }
        calculateAmount(amount)
    }, [amount, setAmount, formValues.price, formValues.quantity])

    //Calculate total amount of items in table
    useEffect(() => {
        let total = 0;
        list.forEach(({ price, amount }) => {
            total += amount * Number(price);
        })
        setTotal(total.toFixed(2))
    }, [list, setTotal])

    //Delete button
    const deleteRow = (id) => {
        setList(list.filter((row) => row.id !== id))
    }

    function inputLimit() {
        document.querySelectorAll('input[type="number"]').forEach(input => {
            input.oninput = () => {
                if (input.value.length > input.maxLength) input.value = input.value.slice(0, input.maxLength);
            }
        })
    }

    inputLimit()

    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const [successMessage, setSuccessMessage] = useState(false)

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
    }

    //Submit form function
    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmit(true);
        setShowInvoice(true)
    }

    //Save inputs values
    const tableInput = (e) => {
        e.preventDefault()

        const validationResult = validateTable(formValues);
        if (Object.keys(validationResult).length !== 0) {
            setFormErrors(validationResult)
            setSuccessMessage(false)
        } else {
            setSuccessMessage(true)
            setFormErrors({})
            const newItems = {
                ...formValues,
                amount,
                id: uuidv4()
            }
            setFormValues({...formValues, description: "", quantity: 1, price: 0})
            setAmount("")
            setList([...list, newItems])
        }
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
        }
    }, [formErrors, isSubmit])

    const validateTable = (values) => {
        const errors = {}
        const regex = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!values.clientName) {
            errors.clientName = "Description is required!"
        }
        if (!values.clientEmail) {
            errors.clientEmail = "Email is required!"
        } else if(!regex.test(values.clientEmail)){
            errors.clientEmail = "This isn't valid email format!"
        }
        if (!values.description) {
            errors.description = "Description is required!"
        }
        if (!values.quantity) {
            errors.quantity = "Quantity is required!"
        }
        if (!values.price) {
            errors.price = "Price is required!"
        }
        return errors
    }

    const errorsList = Object.values(formErrors);

    return (
        <div>
            {errorsList.length !== 0 && <div className="flex justify-center text-red-500 font-semibold">
                <ul>{
                    errorsList.map((errorMsg, i) => {
                        return <li key={`${i}-${errorMsg}`}>{errorMsg}</li>
                    })
                }</ul>
            </div>
            }

            {successMessage && <div className="flex justify-center text-green-500 font-semibold">Saved successfully!</div>
            }

            <form className="md:mt-20" onSubmit={handleSubmit}>
                <article className="mb-10 md:grid grid-cols-2 gap-10 md:mt-20">
                    <div className="flex flex-col">
                        <label htmlFor="clientName">Name</label>
                        <input
                            type="text"
                            name="clientName"
                            id="clientName"
                            placeholder="Name"
                            autoComplete="off"
                            maxLength="32"
                            value={formValues.clientName}
                            onChange={handleChange}
                        />
                        <p className="text-red-500">{formErrors.clientName}</p>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="clientEmail">Email</label>
                        <input
                            type="email"
                            name="clientEmail"
                            id="clientEmail"
                            placeholder="Email"
                            autoComplete="off"
                            maxLength="32"
                            value={formValues.clientEmail}
                            onChange={handleChange}
                        />
                        <p className="text-red-500">{formErrors.clientEmail}</p>
                    </div>
                </article>

                <article className="mb-10 md:grid grid-cols-2 gap-10">
                    <div className="flex flex-col">
                        <label htmlFor="invoiceDate">Invoice date</label>
                        <input
                            type="date"
                            name="invoiceDate"
                            id="invoiceDate"
                            placeholder="Invoice date"
                            autoComplete="off"
                            value={currentDate}
                            onChange={(e) => {
                                setCurrentDate(e.target.value)
                                const difference = parseInt((new Date(dueDate) - new Date(e.target.value)) / (1000 * 60 * 60 * 24), 10)
                                if (difference < 7) {
                                    setDueDate(setDate(new Date(e.target.value), 7))
                                }
                            }}/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="dueDate">Due date</label>
                        <input
                            type="date"
                            name="dueDate"
                            id="dueDate"
                            placeholder="Due date"
                            autoComplete="off"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}/>
                    </div>
                </article>

                <div className="mb-10 flex flex-col">

                    <label htmlFor="description">Item description</label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        placeholder="Item description"
                        maxLength="32"
                        value={formValues.description}
                        onChange={handleChange}
                    />
                    <p className="text-red-500">{formErrors.description}</p>
                </div>

                <article className="md:grid grid-cols-3 gap-10">
                    <div className="mb-10 flex flex-col">
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            id="quantity"
                            placeholder="Quantity"
                            min="1"
                            max="99999999"
                            maxLength="8"
                            value={formValues.quantity}
                            onChange={handleChange}
                        />
                        <p className="text-red-500">{formErrors.quantity}</p>
                    </div>
                    <div className="mb-10 flex flex-col">
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            placeholder="Price"
                            min="0"
                            max="99999999"
                            maxLength="8"
                            value={formValues.price}
                            onChange={handleChange}
                        />
                        <p className="text-red-500">{formErrors.price}</p>
                    </div>
                    <div className="mb-10 flex flex-col">
                        <label htmlFor="amount">Amount</label>
                        <p>{amount}</p>
                    </div>
                </article>

                <table width="100%" className="mb-10">
                    <thead>
                    <tr className="bg-gray-100 p-1">
                        <td className="font-bold">Item description</td>
                        <td className="font-bold">Quantity</td>
                        <td className="font-bold">Price</td>
                        <td className="font-bold">Amount</td>
                        <td className="font-bold">Delete</td>
                    </tr>
                    </thead>
                    {list.map(({id, description, quantity, price, amount}) => (
                        <React.Fragment key={id}>
                            <tbody>
                            <tr>
                                <td className="description">{description}</td>
                                <td className="quantity">{quantity}</td>
                                <td className="price">{price}</td>
                                <td className="amount">{amount}</td>
                                <td>
                                    <button
                                        onClick={() => deleteRow(id)}><AiOutlineDelete
                                        className="text-red-500 font-bold text-xl"
                                    />
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </React.Fragment>
                    ))}

                </table>

                <div>
                    <h2 className="mb-5 flex items-end justify-end text-gray-800 text-4xl font-bold">
                        Total: {total.toLocaleString()}
                    </h2>
                </div>
                <article className="md:grid grid-cols-2 gap-10">

                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
                    >
                        Preview invoice
                    </button>

                    <button
                        onClick={tableInput}
                        className="bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">
                        Save information
                    </button>

                </article>
            </form>

        </div>
    );
};

export default TableForm;