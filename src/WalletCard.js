import { useEffect, useState } from "react";
import Web3 from "web3";
import { CONTACT_ADDRESS, CONTACT_ABI } from './config';


const WalletCard = () => {

    const [account, setAccount] = useState();
    const [balance, setBalance] = useState();
    const [contactList, setContactList] = useState();
    const [contacts, setContacts] = useState([]);

    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');

    const handleOnClick = async () => {
        const acc = await web3.eth.getAccounts();
        if (!acc) acc = await web3.eth.requestAccounts();
        const bal = await web3.eth.getBalance(acc[0]);
        setAccount(acc);
        setBalance(bal);

        const contactList = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);
        setContactList(contactList);
        // const abi = new web3.eth.abi.encodeFunctionSignature();
        const counter = await contactList.methods.count().call();
        // console.log('counter', contactList);
        for (let i = 1; i <= counter; i++) {
            const contact = await contactList.methods.contacts(i).call();
            console.log(contact);
            setContacts((contacts) => [...contacts, contact]);
        }
    }

    const handleOnClickCreate = async () => {
        const contactList = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);
        console.log('123',document.getElementsByClassName('contact')[0].value + " + " +  
        document.getElementsByClassName('contact')[1].value)
        const newContact = await contactList.methods.createContact('kha', '123456').call();
        console.log('456',newContact)
        setContacts((contacts) => [...contacts, newContact]);
    }
    console.log('cin',contacts);
    return (
        <>
            <div style={{ justifyContent: 'center' }}>
                <button onClick={handleOnClick}>Connect wallet</button>
                <h4>Connect to wallet</h4>
                <div>
                    <div>
                        <h4>Account: </h4>{account}
                    </div>
                    <div>
                        <h4>Balance: </h4>{balance}
                    </div>
                    <input type='text' className='contact' />
                    <input type='text' className='contact' />
                    <button onClick={handleOnClickCreate}>Create Contact</button>
                </div>

                <ul>
                    {contacts.map((item, index) => {
                        { console.log('123', item.name) }
                        return <li key={index}>
                            <p>Name: {item.name}</p>
                            <p>Phone: {item.phone}</p>
                        </li>
                    })}
                </ul>
            </div>
        </>
    );
}

export default WalletCard