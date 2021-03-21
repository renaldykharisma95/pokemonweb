import './BaseLayout.css';
import { Layout, Image } from 'antd';
import logo from '../../pokemontext.png'

const { Header, Content, Footer } = Layout;
export default function BaseLayout(props){
    return(
        <div>
            <Layout className="layout">
                <Header>
                    <div className="logo"><Image src={logo} width={250} height={60}></Image></div>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <div className="site-layout-content">
                        {props.children}
                    </div>
                </Content>
                <Footer className="footer">Pokemon Website ©2021 Created by Renaldy Kharisma</Footer>
            </Layout>
        </div>
    )
}