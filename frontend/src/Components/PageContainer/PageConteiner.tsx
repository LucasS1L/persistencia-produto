import { Layout} from 'antd';
import MenuList from '../MenuList/MenuList.tsx';
import  {LogoContainer,MainContainer} from '../../Pages/Home/HomeStyle.ts'; 
import Logo from '../../../public/logo.jpeg';


const { Sider } = Layout;

// @ts-ignore
const PageContainer = ({children}) => {
    
    return (
        <Layout style={{height: "100vh"}}>
            <Sider width={"15%"} style={{ background: "#2A4747", height: "68vh" }}>
                <div style={{  display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <LogoContainer src={Logo} alt="Logo" />
                </div>
                <MenuList />
            </Sider>

            <MainContainer style={{justifyContent: "start", paddingTop: "10px"}}>
                {children}
            </MainContainer>
        </Layout>
    );
};

export default PageContainer;
