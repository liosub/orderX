import React, { useState } from 'react';
import { useMutation, useQuery } from "react-query"
import { Button } from "../components";
import Modal from 'react-modal';
import AddItemModal from './AddItemModal';
import { createMenu, getMenu, getMenuInfo, removeBeforeUpdate } from "../services"
import Switch from "react-switch";
import { Container, Grid } from '@material-ui/core'
import { da } from 'date-fns/locale';
import { alertTitleClasses } from '@mui/material';

const customStyles = {
    content: {
        width: '50%', // Adjust the width as needed
        margin: 'auto', // Centers the modal horizontally
        // You can add more styling properties here as needed
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust overlay color and transparency
    },
    borderRadius: '50px'
}

export const Menu = ({ ...props }) => {
    const [menuId, setMenuId] = useState(null);
    const [menuTitle, setMenuTitle] = useState("");
    const [menuDetails, setMenuDetails] = useState("");
    const [oldItemsId, setOldItemsId] = useState([]);
    const [checked, setChecked] = useState(true);
    const [sections, setSections] = useState([
        {
            id: 1,
            sectionTitle: '',
            sectionDescription: '',
            items: []
        }
    ]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedSectionId, setSelectedSectionId] = useState(null);

    const { data, isLoading: isMenuLoading, refetch } = useQuery(["menu"], () => (getMenu()), {
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
        }
        ,
        onSuccess: (data) => data.length && setSections(data),
        keepPreviousData: true,
        cacheTime: 0,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        retry: false
    })

    const { data: menuX } = useQuery(['menuX'], () => getMenuInfo(), {
        select: data => data,
        onSuccess: (data) => {
            setMenuId(data.menu_id);
            setMenuTitle(data.menuTitle);
            setMenuDetails(data.menuDetails)
        }
    })

    const { mutate: addMenu, isLoading } = useMutation((data) => createMenu(data), {
        select: (data) => data,
        onSuccess: async (data) => {
            if (menuId == null) {
                refetch()
                alert('Menu added')
            } else {
                removeOldItems()
            }
            await removeBeforeUpdate(menuId, oldItemsId);
        },
        onError: error => {
            console.log(error)
            alert('Something went wrong')
        }
    })

    const { mutate: removeOldItems, isLoading: isRemoving } = useMutation((data) => removeBeforeUpdate(menuId, oldItemsId), {
        onSuccess: async (data) => {
            refetch()
            alert('Menu updated')
        },
        onError: error => {
            console.log(error)
            alert('Something went wrong')
        }
    })

    const addSection = () => {
        const newSectionId = sections.length + 1;
        setSections(prevState => [...prevState, { id: newSectionId, title: '', details: '', items: [] }]);
    };

    const removeSection = (sectionId) => {
        setSections(prevState => prevState.filter(section => section.id !== sectionId));
    }

    const openModal = (sectionId) => {
        setSelectedSectionId(sectionId);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const addItem = (item) => {
        setSections(prevState => {
            return prevState.map(section => {
                if (section.id === selectedSectionId) {
                    return { ...section, items: [...section.items, item] };
                }
                return section;
            });
        });
        closeModal();
    };


    const removeItem = (sectionId, itemIndex) => {
        setSections(prevState => {
            return prevState.map(section => {
                if (section.id === sectionId) {
                    return {
                        ...section,
                        items: section.items.filter((_, index) => index !== itemIndex)
                    };
                }
                return section;
            });
        });
    };
    const collectItemsId = async () => {
        try {
            const getItems = await getMenu();
            const itemsIds = []
            getItems.map((item) => {
                itemsIds.push(item.item_id);
            });
            setOldItemsId(itemsIds);
        }
        finally {
            return;
        }
    }

    const handleOnSubmit = async () => {
        const fd = new FormData();
        fd.append('menu_id', menuId);
        fd.append('menu_title', menuTitle);
        fd.append('menu_details', menuDetails);
        // Append sections data to FormData
        sections.forEach((section, sectionIndex) => {
            const sectionData = {
                title: section.sectionTitle,
                details: section.sectionDescription,
                items: section.items.map(item => ({
                    title: item.title,
                    description: item.description,
                    price: item.price,
                    allergens: item.allergens,
                    item_image: item.item_image || null,
                    itemState: item.itemState,
                    additionalFields: item.additionalFields
                })),
            };
            var i = 0;
            for (const itemIMG of section.items) {
                if (itemIMG.image) {
                    fd.append(`images`, itemIMG.image);
                }
            }

            fd.append(`sections[${sectionIndex}]`, JSON.stringify(sectionData));

        });
        await collectItemsId();
        addMenu(fd);
    };

    return (
        <div className="min-h-full pt-10 pb-20 md:px-0">
            <div className="mt-10 max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-6 space-y-6 mb-40">
                    <div className="space-y-4 mb-15">
                        <input className="stllr-input" value={menuTitle} placeholder="Menu title" type="text" onChange={(e) => setMenuTitle(e.target.value)} />
                        <div className='flex'>
                            <input className="stllr-input mr-18" value={menuDetails} placeholder="Details" type="text" onChange={(e) => setMenuDetails(e.target.value)} />
                            <Button
                                className="stllr-btn primary btn-md"
                                text="Add Section"
                                onClick={addSection}
                            />
                        </div>
                    </div>
                </div>
                {sections.map((section, index) => (
                    <div key={section.id} className="bg-white rounded-xl shadow-lg p-6 space-y-6 mb-40">
                        <div className='flex items-center mb-20'>
                            <input className="stllr-input mr-18"
                                value={section.sectionTitle}
                                onChange={(event) => handleInputChange(event, section.id, 'sectionTitle')}
                                placeholder="Section title"
                                type="text" />
                            <div onClick={() => removeSection(section.id)} className="font-bold" style={{ cursor: 'pointer' }}>
                                x
                            </div>
                        </div>
                        <div className='flex mb-20'>
                            <input className="stllr-input mr-18"
                                value={section.sectionDescription}
                                onChange={(event) => handleInputChange(event, section.id, 'sectionDescription')}
                                placeholder="Details"
                                type="text" />
                            <Button
                                className="stllr-btn primary btn-md"
                                text="Add Item"
                                onClick={() => openModal(section.id)}
                            />
                        </div>
                        <div className="mt-20">
                            {section.items.length ? (
                                <h2 className="text-lg font-semibold mb-10">Items</h2>
                            ) : null}
                            {section.items?.map((item, index) => (
                                <Grid container direction="row" spacing={3} className='flex items-center'>
                                    <Grid item lg={7}>
                                        <div className='flex items-center'>
                                            <img
                                                alt={item.title}
                                                className="h-16 w-16 rounded mr-10"
                                                height="64"
                                                src={item.image_show ? item.image_show : `${process.env.REACT_APP_STLLR}${item.item_image}`}
                                                style={{
                                                    aspectRatio: "64/64",
                                                    objectFit: "cover",
                                                }}
                                                width="64"
                                            />
                                            <div className="flex-1">
                                                <h3 className="text-md font-semibold">{item.title}</h3>
                                                <p className="text-sm text-gray-600">{item.description}</p>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item lg={2} className='flex justify-center'>
                                        {item.price ?
                                            <div className="text-md font-semibold">€{item.price}</div>
                                            :
                                            item.additionalFields.length == 1 ? (
                                                <div className="text-md font-semibold">€{item.additionalFields[0].price}</div>
                                            ) : (
                                                <div className="text-md font-semibold">Price on selection</div>
                                            )
                                        }
                                    </Grid>
                                    <Grid item lg={1} className='flex justify-center'>
                                        <div className="font-bold" style={{ cursor: 'pointer' }} onClick={() => removeItem(section.id, index)}>
                                            x
                                        </div>
                                    </Grid>
                                    <Grid item lg={2} className='flex justify-center'>
                                        <Switch
                                            onChange={() => {
                                                const updatedItems = section.items.map((item, idx) => {
                                                    if (idx === index) {
                                                        return { ...item, itemState: item.itemState === 1 ? 0 : 1 };
                                                    }
                                                    return item;
                                                });
                                                setSections(prevState => prevState.map(prevSection => {
                                                    if (prevSection.id === section.id) {
                                                        return { ...prevSection, items: updatedItems };
                                                    }
                                                    return prevSection;
                                                }));
                                            }}
                                            checked={item.itemState === 1} uncheckedIcon={false} checkedIcon={false} onColor='#ED42A0' height={25} />
                                    </Grid>
                                </Grid>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-end pt-4">
                <Button
                    className="stllr-btn pink w-3-quarters mb-15 rounded-full"
                    text="Save"
                    onClick={() => handleOnSubmit()}
                />
            </div>

            <Modal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Add item modal"
                ariaHideApp={false}
            >
                <AddItemModal onClose={closeModal} onSubmit={addItem} />
            </Modal>
        </div>
    );

    function handleInputChange(event, sectionId, field) {
        const value = event.target.value;
        setSections(prevState =>
            prevState.map(section => {
                if (section.id === sectionId) {
                    return {
                        ...section,
                        [field]: value
                    };
                }
                return section;
            })
        );
    }
}