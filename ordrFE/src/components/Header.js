import React, { useEffect, useState, MouseEvent } from "react"
import { fetchUser, fetchMessageNotifications, fetchBriefBlocks, getProjectsCount, getPackagesCount, recordPageVisit, getChats, fetchGeoLocation } from "../services"
import { useQuery, useMutation } from "react-query"
import { Link, useHistory } from "react-router-dom"
import Typography from '@mui/material/Typography';
import { Container, Divider, Grid } from "@material-ui/core"
import { ExitToApp } from '@material-ui/icons';
import { CircularProgress } from '@material-ui/core';
import { signout } from "../utils"
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { BrowserView, MobileView } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

export const Header = ({ activeTab }) => {
    const history = useHistory();
    const { t, i18n } = useTranslation();
    const [firstProject, setFirstProject] = useState()
    const [notification, setNotification] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const { data: user, isLoading: userLoading } = useQuery("user", fetchUser, {
        select: (data) => data.data
    })

    const mutation = useMutation((page_id) => recordPageVisit({ page_id: page_id }))

    const { data: chats, isLoading: isChatsLoading, isError: chatsError, refetch: refetchChats } = useQuery(["chats"], () => getChats(), {
        select: data => data.list,
        keepPreviousData: true,
        retry: false,
        cacheTime: 0,
    })

    const { data: notifications, isLoading } = useQuery("notifications", () => fetchMessageNotifications(), {
        // refetchOnWindowFocus: false,
        select: data => data.notifications?.projects,
    })

    const { data: zeroBriefsFilled } = useQuery(['brief-blocks'], () => fetchBriefBlocks(), {
        select: res => res.briefs.every(b => !b.is_filled),
    })


    const { data: projectsCount, countLoading } = useQuery("projectsCount", getProjectsCount, {
        select: (data) => data.count[0].projects_count
    })

    const { data: packagesCount, packagesCountLoading } = useQuery("packagesCount", getPackagesCount, {
        select: (data) => data.count[0].packages_count,
        onSuccess: (data) => localStorage.setItem(`packages_count`, data)
    })

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleHelp = () => {
        window.open('https://stllr.tawk.help', '_blank');
    }

    const handleTicket = () => {
        window.open('https://tawk.to/chat/60d1d01165b7290ac6374547/1f8pp9hk6', '_blank');
    }

    const getFaviconEl = () => {
        return document.getElementById("favicon");
    }

    const changeFavicon = () => {
        const favicon = getFaviconEl(); // Accessing favicon element
        favicon.href = `${process.env.PUBLIC_URL}/ordr_logo.png}`
    };

    const handleRecieve = (state) => {
        setNotification(state)
    }

    // const handleCurrencyChange = (currency) => {
    //     localStorage.setItem("user_currency", JSON.stringify(currency))
    //     update(currency.code)
    // }

    const handleChangeLanguage = () => {
        if (i18n.language === 'en') {
            i18n.changeLanguage('ar')
            localStorage.setItem(`current_language`, 'ar')

        } else {
            i18n.changeLanguage('en')
            localStorage.setItem(`current_language`, 'en')
        }
        window.location.reload(true)
    }

    useEffect(() => {
        changeFavicon()
    }, [notification, notifications])

    if (isLoading || userLoading || countLoading || packagesCountLoading) {
        return (
            <div className='is-flex aic jcc mt-45'>
            </div>
        );
    }

    let is_packs_seen

    if (localStorage.getItem('packages_count') - localStorage.getItem('seen_packages_count') > 0) {
        is_packs_seen = true
    } else if (localStorage.getItem('packages_count') == localStorage.getItem('seen_packages_count')) {
        is_packs_seen = false
    } else {
        localStorage.setItem(`seen_packages_count`, packagesCount)
    }

    return (
        <>
            <BrowserView>
                <div className="header is-flex aic">
                    <Container maxWidth="lg">
                        <Grid container direction="row" spacing={3}>
                            <div className="is-flex fdr aic jcsb has-full-width">
                                <div className="is-flex fdr aic">
                                    <a className="no-hover" href="/">
                                        {i18n.language === 'ar' ?
                                            <img src={`${process.env.REACT_APP_STLLR_STATIC_URL}stllr-network-arabic-logo.svg`} height='80' width='80' alt="Stllr.network" />
                                            :
                                            <img src={`${process.env.REACT_APP_STLLR_STATIC_URL}stllr-beta-icon.svg`} height='80' width='80' alt="Stllr.network" />
                                        }
                                    </a>
                                    <a className={`${activeTab == 1 ? `active` : ``}`} onClick={() => mutation.mutate(322)} href="/home">{t('Home')}</a>
                                    {/* <a className={`${activeTab == 1 ? `active` : ``}`} onClick={() => mutation.mutate(322)} href="/feed">Feed</a> */}
                                    <a className={`${activeTab == 2 ? `active` : ``}`} onClick={() => mutation.mutate(323)} href="/experts">{t('Independents')}</a>
                                    {/* <div className="is-flex fdc" style={{padding: "40px 0px 25px"}}> */}
                                    <a className={`${activeTab == 3 ? `active` : ``}`} onClick={() => mutation.mutate(324)} href="/packages">{is_packs_seen && <div className=" mr-5 red-dot" />}{t('Packages')}</a>

                                    {/* </div> */}
                                    {projectsCount > 0 && <a className={`${activeTab == 4 ? `active` : ``}`} onClick={() => mutation.mutate(325)} href="/projects">{t('Projects')}</a>}
                                    {chats?.length > 0 && <a className={`${activeTab == 5 ? `active` : ``}`} onClick={() => mutation.mutate(326)} href="/chat">{chats?.length > 0 && (notifications || notification) && <div className=" mr-5 red-dot" />} {t('Chat')}</a>}
                                    {/* <a href="#">Billing</a> */}
                                    {/* <a href="#">Integrations</a> */}
                                    {<a className={`${activeTab == 6 ? `active` : ``}`} onClick={() => mutation.mutate(327)} href="/brief">{zeroBriefsFilled && <div className=" mr-5 red-dot" />} {t('Brief')}</a>}
                                </div>

                                {/* <button
                            className="dimmed borderless transparent bold is-flex aic"
                            onClick={() => signout()}
                        >
                            <ExitToApp size={15} style={{marginRight: 5}} />
                            Logout
                        </button> */}
                                <div className="is-flex fdr">
                                    {/* <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={() => window.location.href = '/settings/invite'}
                                        color="inherit"
                                    >
                                        <img src={`${process.env.REACT_APP_STLLR_STATIC_URL}invite-member.svg`} />
                                    </IconButton> */}

                                    {/* <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleHelp}
                                color="inherit"
                            >
                                <HelpOutlineIcon
                                    style={{ color: "#2235E4" }}
                                ></HelpOutlineIcon>
                            </IconButton> */}

                                    {/* <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleMenu}
                                        color="inherit"
                                    >
                                        <SettingsIcon style={{ color: "#2235E4" }} />
                                    </IconButton> */}

                                    <div className="is-flex fdr aic">
                                        <div className="stllr-btn bordered-primary btn-md mr-20" onClick={() => {
                                            window.location.href = `/settings/refer`
                                        }}>REFER AND EARN</div>
                                        <h4 className="mr-20" style={{ color: '#FFF', cursor: 'pointer' }} onClick={handleChangeLanguage}>{i18n.language === 'en' ? 'عربي' : 'English'}</h4>

                                        <h4 className="mr-5" style={{ color: '#FFF' }}>{t('Hello')}, {user.name.split(" ")[0]}</h4>

                                        <div>
                                            {/* <Tooltip title="Open settings"> */}
                                            <Avatar
                                                alt={user.name.split(" ")[0]}
                                                src={user.avatar?.toLowerCase() != "https://icon.horse/icon/stllr.io" ? user.avatar : null}
                                                style={{ width: 30, height: 30, marginRight: 5 }}
                                            />
                                            {/* </Tooltip> */}

                                            <Menu
                                                sx={{ mt: '45px' }}
                                                id="menu-appbar"
                                                anchorEl={anchorElUser}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                keepMounted
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                            // open={Boolean(anchorElUser)}
                                            // onClose={handleCloseUserMenu}
                                            >
                                                {/* {settings.map((setting) => ( */}
                                                {/* <MenuItem key={"invite"} onClick={`window.location.href = "/settings/invite"`}>
                                                        <Typography textAlign="center">Invite</Typography>
                                                    </MenuItem>

                                                    <MenuItem key={"settings"} onClick={`window.location.href = "/settings/profile"`}>
                                                        <Typography textAlign="center">Settings</Typography>
                                                    </MenuItem>

                                                    <MenuItem key={"logout"} onClick={() => signout()}>
                                                        <Typography textAlign="center">Logout</Typography>
                                                    </MenuItem> */}
                                                {/* ))} */}
                                            </Menu>
                                        </div>

                                        <IconButton
                                            size="large"
                                            aria-label="account of current user"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                            onClick={handleMenu}
                                            color="inherit"
                                        >
                                            <SettingsIcon style={{ color: "#ADB5BD" }} />
                                        </IconButton>
                                    </div>
                                </div>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    {/* <MenuItem onClick={() => history.push('/settings/profile')}>Settings</MenuItem> */}
                                    <MenuItem onClick={() => window.location.href = '/settings/profile'}>{t('Settings')}</MenuItem>
                                    <MenuItem onClick={() => window.location.href = '/integrations'}>{t('Integrations')}</MenuItem>
                                    <MenuItem onClick={() => window.location.href = '/settings/invite'}>{t('Invite Team Members')}</MenuItem>
                                    <Divider />
                                    {/* <MenuItem onClick={handleHelp}>Help</MenuItem> */}
                                    {/* <MenuItem onClick={handleTicket}>Submit Ticket</MenuItem> */}
                                    <MenuItem onClick={() => signout()}>{t('Sign out')}</MenuItem>
                                </Menu>
                            </div>
                        </Grid>
                    </Container>
                </div>
            </BrowserView>

            <MobileView>
                <div className="header is-flex aic">
                    <Container maxWidth="lg">
                        <Grid container direction="row" spacing={3}>
                            {/* <Grid item xs={3} sm={3} md={3} lg={3}> */}
                            <div className="is-flex fdr aic jcsb">
                                <div className="is-flex fdr aic">
                                    {/* <a className="no-hover" href="/">
                                        <img src={`${process.env.REACT_APP_STLLR_STATIC_URL}stllr-network-logo.svg`} alt="Stllr.network" />
                                    </a> */}
                                    <a className={`${activeTab == 3 ? `active` : ``} has-new-tag`} href="/packages">{t('Packages')}</a>
                                    {projectsCount > 0 && (notifications || notification) && <div className=" mr-5 red-dot" />} {projectsCount > 0 && <a className={`${activeTab == 5 ? `active` : ``}`} href="/chat">{t('Chats')}</a>}
                                    <a className={`${activeTab == 8 ? `active` : ``}`} href="/settings/invite">{t('Invite')}</a>
                                </div>

                                <div>
                                    {/* <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleMenu}
                                        color="inherit"
                                    >
                                        <SettingsIcon style={{ color: "#2235E4" }} />
                                    </IconButton> */}
                                    <div className="is-flex fdr aic">
                                        {/* <Typography>Hello, {user.name.split(" ")[0]}</Typography> */}

                                        <div>
                                            {/* <Tooltip title="Open settings"> */}
                                            {/* <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, width: 50,  flexShrink: 0 }}> */}
                                            <Avatar
                                                alt={user.name.split(" ")[0]}
                                                src={user.avatar?.toLowerCase() != "https://icon.horse/icon/stllr.io" ? user.avatar : null}
                                                style={{ width: 30, height: 30, marginRight: 5 }}
                                            />
                                            {/* </IconButton> */}
                                            {/* </Tooltip> */}

                                            <Menu
                                                sx={{ mt: '45px' }}
                                                id="menu-appbar"
                                                anchorEl={anchorElUser}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                keepMounted
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                            // open={Boolean(anchorElUser)}
                                            // onClose={handleCloseUserMenu}
                                            >
                                                {/* {settings.map((setting) => ( */}
                                                {/* <MenuItem key={"invite"} onClick={`window.location.href = "/settings/invite"`}>
                                                        <Typography textAlign="center">Invite</Typography>
                                                    </MenuItem>

                                                    <MenuItem key={"settings"} onClick={`window.location.href = "/settings/profile"`}>
                                                        <Typography textAlign="center">Settings</Typography>
                                                    </MenuItem>

                                                    <MenuItem key={"logout"} onClick={() => signout()}>
                                                        <Typography textAlign="center">Logout</Typography>
                                                    </MenuItem> */}
                                                {/* ))} */}
                                            </Menu>
                                        </div>

                                        {/* <IconButton
                                            size="large"
                                            aria-label="account of current user"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                            onClick={handleMenu}
                                            color="inherit"
                                        >
                                            <SettingsIcon style={{ color: "#2235E4" }} />
                                        </IconButton> */}
                                    </div>
                                </div>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={() => signout()}>{t('Sign out')}</MenuItem>
                                </Menu>
                            </div>
                        </Grid>
                        {/* </Grid> */}
                    </Container>
                </div>
            </MobileView>
        </>
    )
}

export default Header