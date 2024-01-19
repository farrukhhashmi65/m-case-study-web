import React, { useEffect, useContext } from 'react'
import {
    Box,
    Button,
    TextField,
    Link,
    Grid,
    Avatar,
    Typography,
    Container,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    ListItemIcon
} from '@mui/material'
import { createTheme, useTheme } from '@mui/material/styles'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useTranslation } from 'react-i18next'
import { AppThemeContext } from '../../themes/AppTheme'
import { AppThemeOptions } from '../../themes/ThemeOptions'
import { Countries, CountryImages, APIStatus } from '../../config/constants';
import CustomAvatar from '../../components/CustomAvatar';
import AppToolbar from '../../components/AppToolbar';
import { validationsLoginForm } from '../../config/validations';
import useForm from '../../hooks/useForm';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { loginUserRequest } from '../../redux/actions/userAuthenticationActions'
import Loader from '../../components/Loader';

const Login: React.FC<any> = (): JSX.Element => {
    const { t } = useTranslation()
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const theme = useTheme()
    const { setAppTheme } = useContext(AppThemeContext)
    const [country, setCountry] = React.useState('');

    const {
        response,
        loading,
        error
    } = useSelector((state: any) => state.userAuthentication)

    const countrySpecificUsernameValidationHelper: any = {
        [Countries.UAE]: `${t('validations.usernameHelperUAE')}`,
        [Countries.India]: `${t('validations.usernameHelperIndia')}`,
        [Countries.Pakistan]: `${t('validations.usernameHelperPak')}`,
        [Countries.Oman]: `${t('validations.usernameHelperOman')}`
    }

    const initialFormState = {
        username: '',
        password: '',
    }

    const validations = validationsLoginForm({ t, country }) || []
    const { values, isValid, errors, changeHandler, touched } = useForm(initialFormState, validations);

    const handleSetTheme = (country: any) => {
        const theme = AppThemeOptions.find(theme => theme.name === country)
        setAppTheme({
            name: theme.name,
            theme: createTheme({ palette: theme.palette })
        })
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const data = { ...values }
        dispatch(loginUserRequest(data))
    };

    useEffect(() => {
        if (!loading && response) {
            const { status, data } = response;
            if (status === APIStatus.Success) {
                const { country } = data;
                //I am changing the theme on both country select and on login response
                handleSetTheme(country)
                navigate('/dashboard')
            }
        }
    }, [response, loading]);


    //I am changing the theme on both country select and on login response
    const handleChange = (event: SelectChangeEvent) => {
        const country = event.target.value
        setCountry(country as string);
        handleSetTheme(country)
    };


    return (
        <>
            <AppToolbar />
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {t('signIn')}
                    </Typography>
                    <Box sx={{ width: '100%', mt: 3 }}>
                        <Typography variant="body2" mb={2} >
                            {t('countryFormLabel')}
                        </Typography>
                        <FormControl fullWidth>
                            <InputLabel id="country-select-label">{t('chooseCountry')}</InputLabel>
                            <Select
                                labelId="country-select-label"
                                id="country-select"
                                value={country}
                                fullWidth
                                label={t('chooseCountry')}
                                onChange={handleChange}
                                renderValue={(value) => {
                                    return (
                                        <Box sx={{ display: "flex" }}>
                                            <CustomAvatar src={CountryImages[value]} alt={value} />
                                            <Typography>{value}</Typography>
                                        </Box>
                                    );
                                }}
                            >
                                {Object.keys(Countries).map((country, i) => (
                                    <MenuItem value={country} key={i}>
                                        <ListItemIcon>
                                            <CustomAvatar src={CountryImages[country]} alt={country} />
                                        </ListItemIcon>
                                        <Typography>{country}</Typography>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    {country &&
                        <Box>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label={t('username')}
                                name="username"
                                autoFocus
                                error={touched.username && Boolean(errors.username)}
                                helperText={country ? countrySpecificUsernameValidationHelper[country] : ''}
                                onChange={(e: any) => changeHandler(e)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label={t('password')}
                                type="password"
                                id="password"
                                error={touched.password && Boolean(errors.password)}
                                helperText={errors.password}
                                onChange={(e: any) => changeHandler(e)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={!isValid}
                                onClick={handleSubmit}
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {t('signIn')}
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {t('signupLink')}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    }
                    {error && (
                        <Typography variant="body1" mt={4} color={theme.palette.error.main} >
                            {error}
                        </Typography>
                    )}

                </Box>
                <Loader visible={loading} />
            </Container>
        </>
    )
}

export default Login
