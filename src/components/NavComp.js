import * as React from 'react';
import { extendTheme} from '@mui/material/styles';
import HistoryIcon from '@mui/icons-material/History';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import '../styles/NavCompStyle.css'
import Predict from './Predict';

const NAVIGATION = [
    {
        segment: 'Predict',
        title: '',
        icon: <MonitorHeartIcon />,
    },
    {
        segment: 'History',
        title: '',
        icon: <HistoryIcon/>,
    },
    {
        segment: 'logout',
        title: '',
        icon: <LogoutIcon />,
    },
];
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

    const demoWindow = window ? window() : undefined;
    return(
        <AppProvider
            navigation={NAVIGATION}
            router={router}
            theme={demoTheme}
            window={demoWindow}
        >
            <DashboardLayout 
                sidebarExpandedWidth = {66}
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