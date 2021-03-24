import './BaseLayout.css';
import { Layout, Image } from 'antd';
import logo from '../../pokemontext.png'

const { Header, Content, Footer } = Layout;
export default function BaseLayout(props){
    return(
        <div>
            <Layout className="layout">
                <Header className="header">
                    <div className="logo"><Image src={logo} width={250} height={70}></Image></div>
                </Header>
                <Content className="content">
                    <div className="site-layout-content">
                        {props.children}
                    </div>
                </Content>
                <Footer className="footer">Pokemon Website ©2021 Created by Renaldy Kharisma</Footer>
            </Layout>
        </div>
    )
}