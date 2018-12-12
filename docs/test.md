---
category: 组件
name: 测试组件1
---

## Toast

```jsx
import React, { Component } from 'react'
import toast from 'bisheng-demo/lib/test'

class Demo extends Component {
    render () {
        return (
            <button onClick={() => this._onClick()}>click me</button>  
        )
    }

    _onClick () {
        toast()
    }
}

ReactDOM.render(<Demo></Demo>, mountNode)


```


