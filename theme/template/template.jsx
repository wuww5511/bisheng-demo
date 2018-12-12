import React, { Component } from 'react'
import Layout from './layout'
import './template.scss'
import { Popover } from 'antd'
import Qrcode from 'qrcode.react'

export default class Doc extends Component {
    constructor (props) {
        super(props)
        console.log(props.pageData)
    }
    render () {
        return (
            <Layout {...this.props}>
                {this._getChild(this.props)}
            </Layout>
        )
    }

    _getChild (props) {
        if (props.pageData) {
            let fsrc = location.href.replace('docs', 'preview')
            return (
                <div className="tpl-wrapper">
                    <div className="tpl-doc markdown">{props.utils.toReactComponent(props.pageData.source)}</div>
                    <div className="tpl-preview">
                        <div>
                            <Popover
                                content={<Qrcode style={{marginLeft: 'auto', marginRight: 'auto', display: 'block'}} value={fsrc}></Qrcode>}
                                title="扫码预览"
                                trigger="hover"
                                >
                                <a style={{float: 'right'}}>在手机预览</a>
                            </Popover>
                            
                            <h2>预览</h2>
                        </div>
                        <iframe src={fsrc} frameBorder="0"></iframe>
                    </div>
                </div>
            )
        } else {
            return <div>文档不存在</div>
        }
    }
}