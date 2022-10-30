import React, {useState, useEffect} from 'react';
import {v4 as uuidv4} from "uuid"
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai"


const TableForm = ({
                       description,
                       setDescription,
                       quantity,
                       setQuantity,
                       amount,
                       setAmount,
                       price,
                       setPrice,
                       list,
                       setList,
                       total,
                       setTotal
                   }) => {
    const [isEditing, setIsEditing] = useState(false)

    //Submit form function
    const handleSubmit = (e) => {
        e.preventDefault()

        if (!description || !quantity || !price) {
            alert("Please fill all inputs")
        } else {
            const newItems = {
                id: uuidv4(),
                description,
                quantity,
                price,
                amount
            }
            setDescription("")
            setQuantity("")
            setPrice("")
            setAmount("")
            setList([...list, newItems])
            setIsEditing(false)
        }
    }
    //Calculate items amount
    useEffect(() => {
        const calculateAmount = (amount) => {
            setAmount(quantity * price)
        }
        calculateAmount(amount)
    }, [amount, price, quantity, setAmount])

    //Calculate total amount of items in table
    useEffect(() => {
        let rows = document.querySelectorAll(".amount")
        let sum = 0

        for (let i = 0; i < rows.length; i++) {
            if (rows[i].className === "amount") {
                sum += isNaN(rows[i].innerHTML) ? 0 : parseInt(rows[i].innerHTML)
                setTotal(sum)
            }
        }
    })

    //Edit button
    const editRow = (id) => {
        const editingRow = list.find((row) => row.id === id)
        setList(list.filter((row) => row.id !== id))
        setIsEditing(true)
        setDescription(editingRow.description)
        setQuantity(editingRow.quantity)
        setPrice(editingRow.price)
    }
    //Delete button
    const deleteRow = (id) => {
        setList(list.filter((row) => row.id !== id))
    }

    function inputLimit () {
        document.querySelectorAll('input[type="number"]').forEach(input => {
            input.oninput = () => {
                if(input.value.length > input.maxLength) input.value = input.value.slice(0, input.maxLength);
            }
        })
    }
    inputLimit()

    return (
        <div>
            <form className="md:mt-20" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label htmlFor="description">Item description</label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        placeholder="Item description"
                        maxLength="32"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <article className="md:grid grid-cols-3 gap-10">
                    <div className="flex flex-col">
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            id="quantity"
                            placeholder="Quantity"
                            min="1"
                            max="99999999"
                            maxLength="8"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            placeholder="Price"
                            min="1"
                            max="99999999"
                            maxLength="8"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="amount">Amount</label>
                        <p>{amount}</p>
                    </div>
                </article>
                <button type="submit"
                        className=" mb-5 bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">{isEditing ? "Accept changes" : "Add item"}
                </button>
            </form>


            <table width="100%" className="mb-10">
                <thead>
                <tr className="bg-gray-100 p-1">
                    <td className="font-bold">Item description</td>
                    <td className="font-bold">Quantity</td>
                    <td className="font-bold">Price</td>
                    <td className="font-bold">Amount</td>
                    <td className="font-bold">Delete</td>
                    <td className="font-bold">Edit</td>
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
                                <button onClick={() => deleteRow(id)}><AiOutlineDelete
                                    className="text-red-500 font-bold text-xl"/></button>
                            </td>
                            <td>
                                <button onClick={() => editRow(id)}><AiOutlineEdit
                                    className="text-green-500 font-bold text-xl"/></button>
                            </td>
                        </tr>
                        </tbody>
                    </React.Fragment>
                ))}

            </table>

            <div>
                <h2 className="flex items-end justify-end text-gray-800 text-4xl font-bold">
                    Total: {total.toLocaleString()}
                </h2>
            </div>
        </div>
    );
};

export default TableForm;