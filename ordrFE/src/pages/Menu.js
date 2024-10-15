import React, { useState, useEffect } from "react"
import { useQuery } from "react-query"
import { Formik } from "formik"
import * as Yup from "yup"
import { getGuestMenu, login, getGuestProfile } from "../services"
import { v4 as uuidv4 } from 'uuid'
import Cookies from "js-cookie"
import { Link, useHistory, useLocation } from "react-router-dom"
import { useAuth } from "../utils/Auth"
import { Container, Grid } from "@material-ui/core"
import { Button } from "../components/button"
import qs from 'qs'
import { useTranslation } from 'react-i18next';
import { useParams } from "react-router-dom"
import Modal from 'react-modal';
import OrderItemModal from "../components/OrderItemModal"
import CheckoutModal from "../components/CheckoutModal"

const customStyles = {
    content: {
        margin: 'auto', // Centers the modal horizontally
        // You can add more styling properties here as needed
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust overlay color and transparency
    },
    borderRadius: '50px'
}

const customStyles2 = {
    content: {
        margin: 'auto', // Centers the modal horizontally
        background: '#EEEEEE',
        padding: 0
        // You can add more styling properties here as needed
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust overlay color and transparency
    },
    borderRadius: '50px'
}

function Menu(props) {
    const { profileId } = useParams();
    const [bussinessName, setBussinessName] = useState("");
    const [profileUrl, setProfileUrl] = useState("");
    const [profilemail,setProfileMail]= useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
    const [cart, setCart] = useState(null);
    const [item, setItem] = useState(null);
    const [menuId, setMenuId] = useState();

    const { data: menu, isLoading } = useQuery(['menuX'], () => getGuestMenu(profileId), {
        select: (data) => {
            let idCounter = 1;
            const formattedMenu = data.reduce((acc, curr) => {
                const sectionIndex = acc.findIndex(section =>
                    section.sectionTitle === curr.sectionTitle &&
                    section.sectionDescription === curr.sectionDescription
                );
                if (sectionIndex === -1) {
                    acc.push({
                        id: idCounter++,
                        menuId: curr.menu_id,
                        sectionTitle: curr.sectionTitle,
                        sectionDescription: curr.sectionDescription,
                        items: [{
                            item_id: curr.item_id,
                            title: curr.title,
                            description: curr.description,
                            price: curr.price,
                            allergens: curr.allergens,
                            item_image: curr.image,
                            itemState: curr.itemState,
                            additionalFields: JSON.parse(curr.additionalFields)
                        }]
                    });
                } else {
                    acc[sectionIndex].items.push({
                        item_id: curr.item_id, title: curr.title, description: curr.description, price: curr.price, allergens: curr.allergens, item_image: curr.image, itemState: curr.itemState, additionalFields: JSON.parse(curr.additionalFields)
                    });
                }

                return acc;
            }, []);
            return formattedMenu;
        },
        onSuccess: (data) => {
            setMenuId(data[0].menuId)
        }
    })
    const { data: profile } = useQuery(['profile'], () => getGuestProfile(profileId), {
        select: data => data,
        onSuccess: (data) => {
            setBussinessName(data.businessName);
            setProfileUrl(data.logo);
            setProfileMail(data.email);
        }
    })
    const openModal = (item) => {
        setItem(item)
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const addItem = (item) => {
        console.log(item)
        // setSections(prevState => {
        //     return prevState.map(section => {
        //         if (section.id === selectedSectionId) {
        //             return { ...section, items: [...section.items, item] };
        //         }
        //         return section;
        //     });
        // });
        closeModal();
    };

    const handleOpenCheckout = () => {
        const order = JSON.parse(sessionStorage.getItem('order'))
        if (order?.length) {
            setCart(order)
            setCheckoutModalOpen(true)
        } else {
            alert('Your cart is empty')
        }
    };

    if (isLoading) {
        return (<div style={{ backgroundColor: '#EEEEEE' }}>Loading...</div>)
    }

    return (
        <div className="flex flex-col menu-container">
            <div className="menu-heading">
                <div className="flex items-center justify-center my-4">
                    <img
                        alt="the g Hotel & Spa Galway logo"
                        className="rounded-full"
                        height="100"
                        src={`${process.env.REACT_APP_STLLR}${profileUrl}`}
                        style={{
                            aspectRatio: "100/100",
                            height: "100px",
                            objectFit: "cover",
                            width: "100px",
                        }}
                        width="100"
                    />
                </div>
                <h1 className="px-4 text-2xl font-bold text-center">{bussinessName}</h1>
            </div>
            <div className="flex flex-col">
                {menu.map(section => (
                    <>
                        {
                            section.items.map(item => (
                                <div className="menu-card" onClick={() => openModal(item)}>
                                    <div className="flex items-center justify-between">
                                        <div style={{ maxWidth: '50%' }}>
                                            <h2 className="text-2xl font-semibold">{item.title}</h2>
                                            <p className="my-2">{item.description}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xl font-bold">{item.price ? `€${item.price}` : 'Price on selection'}</span>
                                                {/* <div className="flex items-center">
                                                    <BugIcon className="mx-1" />
                                                    <NutIcon className="mx-1" />
                                                    <MilkIcon className="mx-1" />
                                                    <SproutIcon className="mx-1" />
                                                </div> */}
                                            </div>
                                        </div>

                                        <img
                                            alt="the g Hotel & Spa Galway logo"
                                            // className="rounded-full"
                                            height="100"
                                            src={`${process.env.REACT_APP_STLLR}${item.item_image}`}
                                            style={{
                                                aspectRatio: "100/100",
                                                height: "100px",
                                                objectFit: "cover",
                                                width: "100px",
                                            }}
                                            width="100"
                                        />
                                    </div>
                                </div>
                            ))
                        }
                    </>
                ))}

                <Button
                    className="stllr-btn btn-lg pink w-3-quarters mb-15 rounded-full flex asc"
                    text={`Checkout`}
                    onClick={handleOpenCheckout}
                />
            </div>
            <Modal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Add item to cart modal"
                ariaHideApp={false}
            >
                <OrderItemModal onClose={closeModal} item={item} onSubmit={addItem} />
            </Modal>

            <Modal
                isOpen={checkoutModalOpen}
                onRequestClose={() => setCheckoutModalOpen(false)}
                style={customStyles2}
                contentLabel="Checkout"
                ariaHideApp={false}
            >
                <CheckoutModal menuId={menuId} profileId={profileId} profilemail={profilemail} businessName={bussinessName} businessImg={profileUrl} cart={cart} onClose={() => setCheckoutModalOpen(false)} onSubmit={() => console.log('hahahah')} />
            </Modal>
        </div>
    )
}

function BugIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m8 2 1.88 1.88" />
            <path d="M14.12 3.88 16 2" />
            <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" />
            <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6" />
            <path d="M12 20v-9" />
            <path d="M6.53 9C4.6 8.8 3 7.1 3 5" />
            <path d="M6 13H2" />
            <path d="M3 21c0-2.1 1.7-3.9 3.8-4" />
            <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4" />
            <path d="M22 13h-4" />
            <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4" />
        </svg>
    )
}


function ChevronDownIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m6 9 6 6 6-6" />
        </svg>
    )
}


function MenuIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    )
}


function MicroscopeIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M6 18h8" />
            <path d="M3 22h18" />
            <path d="M14 22a7 7 0 1 0 0-14h-1" />
            <path d="M9 14h2" />
            <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
            <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
        </svg>
    )
}


function MilkIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M8 2h8" />
            <path d="M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2" />
            <path d="M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0" />
        </svg>
    )
}


function NutIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 4V2" />
            <path d="M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592A7.003 7.003 0 0 0 19 14v-4" />
            <path d="M12 4C8 4 4.5 6 4 8c-.243.97-.919 1.952-2 3 1.31-.082 1.972-.29 3-1 .54.92.982 1.356 2 2 1.452-.647 1.954-1.098 2.5-2 .595.995 1.151 1.427 2.5 2 1.31-.621 1.862-1.058 2.5-2 .629.977 1.162 1.423 2.5 2 1.209-.548 1.68-.967 2-2 1.032.916 1.683 1.157 3 1-1.297-1.036-1.758-2.03-2-3-.5-2-4-4-8-4Z" />
        </svg>
    )
}


function ShoppingCartIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
    )
}


function SproutIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M7 20h10" />
            <path d="M10 20c5.5-2.5.8-6.4 3-10" />
            <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
            <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
        </svg>
    )
}

export default Menu
