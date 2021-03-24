import './BaseLayout.css';
import { Layout, Image, Card } from 'antd'
import {
    GithubOutlined
  } from '@ant-design/icons';
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
                <a style={{textAlign: 'center'}} href={"https://github.com/renaldykharisma/pokemonweb"}><h2><GithubOutlined /> Source Code</h2></a>
                <Footer className="footer">Pokemon Website ©2021 Created by Renaldy Kharisma</Footer>
            </Layout>
        </div>
    )
}