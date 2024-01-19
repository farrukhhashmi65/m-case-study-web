import React from 'react'
import { useTranslation } from 'react-i18next'
import {
    Box,
    Button,
    Toolbar,
    Typography,
    MenuItem,
    Tooltip,
    Menu,
    AppBar
} from '@mui/material'
import { Languages } from '../../config/constants';
import LanguageIcon from '@mui/icons-material/Language';
import { setLanguage } from '../../config/utils'

const AppToolbar: React.FC<any> = (): JSX.Element => {
    const { t, i18n } = useTranslation()
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const onLanguageChange = (language: string) => {
        setLanguage(language)
        handleCloseUserMenu()
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {t('title')}
                </Typography>
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Change language" onClick={handleOpenUserMenu}>
                        <Button color="inherit" startIcon={<LanguageIcon />}>{i18n.language.toUpperCase()}</Button>
                    </Tooltip>
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
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {Languages.map((language) => (
                            <MenuItem key={language} onClick={() => onLanguageChange(language)}>
                                <Typography textAlign="center">{t(`languages.${language}`)}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default AppToolbar
