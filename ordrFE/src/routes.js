import React from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom"
import { useAuth } from "./utils/Auth"
import ProtectedAndVerifiedRoute from "./components/ProtectedAndVerifiedRoute"
import Login from "./pages/Login"
import OAuth from "./pages/OAuth"
import Signup from "./pages/Signup"
import { getToken } from "./utils"
import LoginTest from "./pages/LoginTest"
import SignupTest from "./pages/SignupTest"
import Dashboard from "./pages/Dashboard"
import Menu from "./pages/Menu"
import PaymentSuccess from "./pages/PaymenSuccess"
import PaymentFailed from "./pages/PaymentFailed"


const ProtectedRoute = ({ component: Component, ...rest }) => {
    const isAuth = getToken()

    return (<>
        {/* <WelcomMessage /> */}
        <Route
            {...rest}
            render={(props) => (
                isAuth ? <Component {...props} /> : <Redirect to={`/logintest`} />
            )}
        />
    </>)
}

const UnprotectedRoute = ({ component: Component, ...rest }) => {
    const isAuth = getToken()
    const { user } = useAuth()

    return (
        <Route
            {...rest}
            render={(props) => (
                // !isAuth ? <Component {...props} /> : <Redirect to={`/${user.home_page ? user.home_page : 'experts'}`} />
                !isAuth ? <Component {...props} /> : <Redirect to={`/dashboard`} />
            )}
        />
    )
}

const PublicRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => <Component {...props} />}
        />
    )
}

export const Routes = () => {
    const { user } = useAuth()

    const commonRoutes = [
        <UnprotectedRoute path="/login" component={Login} />,
        <UnprotectedRoute path="/logintest" component={LoginTest} />,
        <UnprotectedRoute path="/signuptest" component={SignupTest} />,
        <ProtectedRoute path="/dashboard" component={Dashboard} />,
        <UnprotectedRoute path="/oauth" component={OAuth} />,
        <UnprotectedRoute path="/signup" component={Signup} />,
        <UnprotectedRoute path="/menu/:profileId" component={Menu} />,
        <UnprotectedRoute path="/success/:profileId" component={PaymentSuccess} />,
        <UnprotectedRoute path="/cancel/:profileId" component={PaymentFailed} />,
        // <PublicRoute path="/privacy-policy" component={Privacy} />,
    ]

    return (
        <Router>
            <Switch>
                {commonRoutes}
                <ProtectedAndVerifiedRoute exact path="/" component={() => <Redirect to={`/dashboard`} />} />
            </Switch>
        </Router>
    )
}

export const MobileRoutes = () => {
    return (
        <Router>
            <Switch>
                <UnprotectedRoute path="/signup" component={Signup} />
                <UnprotectedRoute path="/login" component={Login} />
                <ProtectedRoute path="/" component={Dashboard} />
            </Switch>
        </Router>
    )
}