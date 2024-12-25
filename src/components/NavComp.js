import * as React from 'react';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { extendTheme} from '@mui/material/styles';
import HistoryIcon from '@mui/icons-material/History';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import '../styles/NavCompStyle.css'
import Predict from './Predict';

function renderPageContent(pathname) {
    if (pathname === '/Predict') {
        return <Predict/>; 
    }
    if (pathname === '/History') {
        return <div>hy from history</div>;
    }
    return <div>Page non trouvée.</div>;
}
const demoTheme = extendTheme({
    colorSchemes: { light: true},
    colorSchemeSelector: 'class',
    breakpoints: {
        values: {
        xs: 0,
        sm: 600,
        md: 600,
        lg: 1200,
        xl: 1536,
        },
    },
});

function useDemoRouter(initialPath) {
    const [pathname, setPathname] = React.useState(initialPath);

    const router = React.useMemo(() => {
        return {
        pathname,
        searchParams: new URLSearchParams(),
        navigate: (path) => setPathname(String(path)),
        };
    }, [pathname]);

    return router;
}

export default function NavComp(props){
    const { window } = props;
    const router = useDemoRouter('/Predict');
    // gestion responsive
    const theme = useTheme(); 
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.up('sm') && theme.breakpoints.down('md'));
    const isMd = useMediaQuery(theme.breakpoints.up('md') && theme.breakpoints.down('lg'));
    const isLg = useMediaQuery(theme.breakpoints.up('lg'));

    const sidebarWidth = React.useMemo(() => {
        if (isXs) return 300; 
        if (isSm) return 66; 
        if (isMd) return 66; 
        if (isLg) return 66; 
        return 20; 
    }, [isXs, isSm, isMd, isLg]);    

    
    const NAVIGATION = [
        {
            segment: 'Predict',
            title: isXs ? 'Predict': '',
            icon: <MonitorHeartIcon />,
        },
        {
            segment: 'History',
            title: isXs ? 'History':'',
            icon: <HistoryIcon/>,
        },
        {
            segment: 'logout',
            title: isXs ?'Logout':'',
            icon: <LogoutIcon />,
        },
    ];
    const demoWindow = window ? window() : undefined;
    return(
        <AppProvider
            navigation={NAVIGATION}
            router={router}
            theme={demoTheme}
            window={demoWindow}
        >
            <DashboardLayout 
                sidebarExpandedWidth = {sidebarWidth}
                defaultSidebarCollapsed={true}
                disableCollapsibleSidebar={true}
            >
                
                <PageContainer>
                    {renderPageContent(router.pathname)}
                </PageContainer>
            </DashboardLayout>
        </AppProvider>
    );
}