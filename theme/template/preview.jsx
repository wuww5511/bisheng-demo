import React from 'react'

export default function (props) {
    if (props.pageData) {
        return <div style={{padding: 15}} className="markdown">{props.utils.toReactComponent(props.pageData.content)}</div>    
    } else {
        return <div>文档不存在</div>
    }
    
}