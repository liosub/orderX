import React, { useState } from 'react';
import { Button, Profile } from "../components"
import { Link } from "react-router-dom"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Menu } from '../components/Menu';
import { signout } from "../utils"
import { useAuth } from '../utils/Auth';
import { Analysis } from '../components/Analysis';
import { Settings } from '../components/Settings';

export default function Dashboard() {
    const [tab, setTab] = useState(1)
    const { user } = useAuth()

    return (
        <div className="flex min-h-screen w-full flex-col p-8">
            {/* bg-gradient-to-br from-[#ace0f9] to-[#e3f9d9] */}
            {/* <img
                className="h-16 w-16 rounded mr-10"
                height="64"
                src={`${process.env.REACT_APP_STLLR}${user.QRCode}`}
                style={{
                    aspectRatio: "64/64",
                    objectFit: "cover",
                }}
                width="64"
            /> */}
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">ORDR</h1>
                <nav>
                    <Link className="text-lg font-medium mr-10" href="#">
                        Contact
                    </Link>
                    <Link className="text-lg font-medium" onClick={() => signout()} href="#">
                        Logout
                    </Link>
                </nav>
            </header>
            <main className="flex flex-1 items-center justify-center">
                <Card className="w-[600px] bg-white p-8 shadow-xl">
                    <div>
                        <div className="flex justify-between">
                            <div className="flex flex-col items-center" style={{ cursor: 'pointer' }} onClick={() => setTab(1)}>
                                <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.5 2.25C10.3984 2.25 7.875 4.77338 7.875 7.875C7.875 10.9766 10.3984 13.5 13.5 13.5C16.6016 13.5 19.125 10.9766 19.125 7.875C19.125 4.77338 16.6016 2.25 13.5 2.25ZM13.5 11.25C11.6392 11.25 10.125 9.73575 10.125 7.875C10.125 6.01425 11.6392 4.5 13.5 4.5C15.3608 4.5 16.875 6.01425 16.875 7.875C16.875 9.73575 15.3608 11.25 13.5 11.25ZM23.625 23.625V22.5C23.625 18.1586 20.0914 14.625 15.75 14.625H11.25C6.9075 14.625 3.375 18.1586 3.375 22.5V23.625H5.625V22.5C5.625 19.3984 8.14838 16.875 11.25 16.875H15.75C18.8516 16.875 21.375 19.3984 21.375 22.5V23.625H23.625Z" fill={tab == 1 ? "#FF4BB5" : "black"} />
                                </svg>
                                <span className='text-sm' style={{ color: tab == 1 ? '#FF4BB5' : 'black' }}>
                                    Profile
                                </span>
                            </div>
                            <div className="flex flex-col items-center" style={{ cursor: 'pointer' }} onClick={() => setTab(2)}>
                                <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.375 2.25H5.625V24.75H3.375V2.25ZM11.25 6.75H19.125V9H11.25V6.75ZM11.25 11.25H19.125V13.5H11.25V11.25Z" fill={tab == 2 ? "#FF4BB5" : "black"} />
                                    <path d="M21.375 2.25H15.75H15.6791H6.75V24.75H15.6803H15.75H21.375C22.6159 24.75 23.625 23.7409 23.625 22.5V4.5C23.625 3.25912 22.6159 2.25 21.375 2.25ZM21.375 22.5H15.75H15.6791H9V4.5H15.6803H15.75H21.375V22.5Z" fill={tab == 2 ? "#FF4BB5" : "black"} />
                                </svg>
                                <span className='text-sm' style={{ color: tab == 2 ? '#FF4BB5' : 'black' }}>
                                    Menu
                                </span>
                            </div>
                            <div className="flex flex-col items-center" style={{ cursor: 'pointer' }} onClick={() => setTab(3)}>
                                <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.5 18C15.9818 18 18 15.9818 18 13.5C18 11.0182 15.9818 9 13.5 9C11.0182 9 9 11.0182 9 13.5C9 15.9818 11.0182 18 13.5 18ZM13.5 11.25C14.7195 11.25 15.75 12.2805 15.75 13.5C15.75 14.7195 14.7195 15.75 13.5 15.75C12.2805 15.75 11.25 14.7195 11.25 13.5C11.25 12.2805 12.2805 11.25 13.5 11.25Z" fill={tab == 3 ? "#FF4BB5" : "black"} />
                                    <path d="M3.20051 18.153L4.32551 20.0992C4.92289 21.1309 6.36064 21.5179 7.39676 20.9205L7.99189 20.5763C8.64664 21.0904 9.36551 21.5123 10.1249 21.8273V22.5C10.1249 23.7409 11.134 24.75 12.3749 24.75H14.6249C15.8658 24.75 16.8749 23.7409 16.8749 22.5V21.8273C17.6343 21.5123 18.3531 21.0904 19.0079 20.5774L19.603 20.9216C20.6414 21.5179 22.0758 21.1331 22.6754 20.0992L23.7993 18.1541C24.4203 17.0797 24.0513 15.7005 22.9769 15.0806L22.4088 14.7521C22.4695 14.3348 22.4999 13.9174 22.4999 13.5C22.4999 13.0826 22.4695 12.6641 22.4088 12.2501L22.9769 11.9216C24.0513 11.3006 24.4203 9.9225 23.7993 8.84812L22.6754 6.903C22.078 5.868 20.6414 5.47987 19.603 6.0795L19.0079 6.42375C18.3531 5.90963 17.6343 5.48775 16.8749 5.17275V4.5C16.8749 3.25912 15.8658 2.25 14.6249 2.25H12.3749C11.134 2.25 10.1249 3.25912 10.1249 4.5V5.17275C9.36551 5.48775 8.64664 5.90963 7.99189 6.42263L7.39676 6.07837C6.35726 5.481 4.92176 5.868 4.32439 6.90188L3.20051 8.847C2.57951 9.92137 2.94851 11.3006 4.02289 11.9205L4.59101 12.249C4.53026 12.6641 4.49989 13.0826 4.49989 13.5C4.49989 13.9174 4.53026 14.3348 4.59101 14.7499L4.02289 15.0784C2.94851 15.6994 2.57951 17.0786 3.20051 18.153ZM6.94226 15.0503C6.81514 14.5406 6.74989 14.0186 6.74989 13.5C6.74989 12.9803 6.81514 12.4583 6.94114 11.9497C7.06264 11.4626 6.84776 10.9541 6.41239 10.7032L5.14901 9.972L6.27176 8.02688L7.55989 8.77163C7.99189 9.02025 8.53526 8.95725 8.89639 8.61188C9.66476 7.884 10.5918 7.3395 11.5784 7.038C12.052 6.894 12.3749 6.45638 12.3749 5.9625V4.5H14.6249V5.9625C14.6249 6.45638 14.9478 6.894 15.4214 7.038C16.408 7.34062 17.335 7.884 18.1034 8.61188C18.4645 8.95725 19.0101 9.01912 19.4399 8.77163L20.7269 8.028L21.8519 9.97312L20.5874 10.7032C20.152 10.9552 19.9371 11.4637 20.0586 11.9497C20.1846 12.4583 20.2499 12.9803 20.2499 13.5C20.2499 14.0186 20.1846 14.5406 20.0575 15.0503C19.9371 15.5374 20.152 16.0459 20.5874 16.2968L21.8508 17.0269L20.728 18.972L19.4399 18.2284C19.009 17.9797 18.4645 18.0416 18.1034 18.3881C17.335 19.116 16.408 19.6605 15.4214 19.962C14.9478 20.106 14.6249 20.5436 14.6249 21.0375L14.6271 22.5H12.3749V21.0375C12.3749 20.5436 12.052 20.106 11.5784 19.962C10.5918 19.6594 9.66476 19.116 8.89639 18.3881C8.68264 18.1834 8.40364 18.0787 8.12239 18.0787C7.92889 18.0787 7.73539 18.1283 7.55989 18.2295L6.27289 18.9742L5.14789 17.0291L6.41239 16.2968C6.84776 16.0459 7.06264 15.5374 6.94226 15.0503Z" fill={tab == 3 ? "#FF4BB5" : "black"} />
                                </svg>
                                <span className='text-sm' style={{ color: tab == 3 ? '#FF4BB5' : 'black' }}>
                                    Settings
                                </span>
                            </div>
                            <div className="flex flex-col items-center" style={{ cursor: 'pointer' }} onClick={() => setTab(4)}>
                                <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.375 5.625V21.375C3.375 22.6159 4.38412 23.625 5.625 23.625H21.375C22.6159 23.625 23.625 22.6159 23.625 21.375V5.625C23.625 4.38412 22.6159 3.375 21.375 3.375H5.625C4.38412 3.375 3.375 4.38412 3.375 5.625ZM21.3761 21.375H5.625V5.625H21.375L21.3761 21.375Z" fill={tab == 4 ? "#FF4BB5" : "black"} />
                                    <path d="M12.375 7.875H14.625V19.125H12.375V7.875ZM16.875 11.25H19.125V19.125H16.875V11.25ZM7.875 13.5H10.125V19.125H7.875V13.5Z" fill={tab == 4 ? "#FF4BB5" : "black"} />
                                </svg>
                                <span className='text-sm' style={{ color: tab == 4 ? '#FF4BB5' : 'black' }}>
                                    Dashboard
                                </span>
                            </div>
                        </div>
                    </div>
                    <CardContent>
                        {tab == 1 ? <Profile /> : (tab == 2 ? <Menu /> : (tab == 3 ? <Settings /> : <Analysis />))}
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}

