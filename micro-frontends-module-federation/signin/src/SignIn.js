import React from "react";
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { StyledEngineProvider } from '@mui/material/styles';

const faketoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

const SignIn = () => {
    let navigate = useNavigate();

    const onSignIn = () => {
        window.sessionStorage.setItem("token", faketoken);
        navigate("shop");
    }

    return (
        <StyledEngineProvider injectFirst>
            <form>
                <div>
                <Typography component="p">
                    Username:
                </Typography>
                <TextField id="username" />
                </div>
                <div>
                <Typography component="p">
                    Password:
                </Typography>
                <TextField id="password"
                            type="password"
                            autoComplete="current-password"/>
                </div>
                <br/>
                <Button variant="contained" onClick={onSignIn}>Sign in</Button>
            </form>
        </StyledEngineProvider>
    );
}

export default SignIn;
                