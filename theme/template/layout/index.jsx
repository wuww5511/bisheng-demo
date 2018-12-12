import React, { Component } from 'react'
import { Layout, Menu, message } from 'antd'
const { Header, Footer, Sider, Content } = Layout
const { SubMenu } = Menu
import './index.scss'
import 'antd/dist/antd.css'

export default class MyLayout extends Component {
    render () {
        let activeCategory = ''
        let categories = this._getCategories(this.props)
        for (let category in categories) {
            let files = categories[category]
            let isActive = files.findIndex(file => file.key === this.props.params.key) >= 0
            if (isActive) {
                activeCategory = category
                break
            }
        }

        return (
            <Layout className="layout-index">
                <Header>
                    <div onClick={() => this.props.router.push(`/`)} className="layout-index__logo">组件在线演示平台</div>
                </Header>
                <Layout>
                    <Sider>
                        <Menu
                            onClick={event => this._to(event.key)}
                            defaultOpenKeys={[activeCategory]}
                            defaultSelectedKeys={[this.props.params.key]}
                            style={{height: '100%', borderRight: 0, overflow: 'auto'}} 
                            mode="inline">
                            {this._getMenus(this.props)}
                        </Menu>
                    </Sider>
                    <Layout>
                        <Content>
                            <div className="layout-index__body">
                                {this.props.params.key ? this.props.children : this._getEmpty()}
                            </div>
                        </Content>    
                    </Layout>
                </Layout>
                
            </Layout>
        )
    }

    _getEmpty () {
        return <div className="markdown">{this.props.utils.toReactComponent(this.props.data.index.content)}</div>
    }

    _to (key) {
        this.props.router.push(`/docs/${key}`)
    }
    
    _getCategories (props) {
        let menus = {}
        for (let key in props.data) {
            let category = props.data[key].meta.category
            if (!category) {
                continue
            }
            if (!menus[category]) {
                menus[category] = []
            }
            menus[category].push({
                ...props.data[key].meta,
                key
            })
        }

        return menus
    }

    _getMenus (props) {
        let menus = this._getCategories(props)
        return Object.keys(menus).map(category => {
            let items = menus[category].map(item => {
                return <Menu.Item key={item.key}>{item.name || item.key}</Menu.Item>
            })
            return (
                <SubMenu
                    key={category} 
                    title={category}>
                    {items}
                </SubMenu>
            )
        })

    }

    _getCurrentMeta (props) {
        let key = props.params.key
        if (!key) {
            return {}
        } else {
            return props.data[key].meta
        }
    }
}