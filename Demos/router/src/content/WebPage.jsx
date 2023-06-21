import React, { Component } from 'react';
import { useSearchParams, useParams} from 'react-router-dom';
class WebPage extends Component {
    state = {
        searchParams: this.props.params[0],  // 获取某个参数
        setSearchParams: this.props.params[1]  // 设置链接中的参数，然后重新渲染当前页面
    }
    render() { 
        return (
            <React.Fragment>
                <h1>Web - {this.state.searchParams.get('chapter')}</h1>
            </React.Fragment>
        );
    }
}
 
export default (props) => {
    return(
        <WebPage
            {...props}
            params={useSearchParams()}
        >
        </WebPage>
    )
};

