import React, {Component} from 'react';
import "@assets/js/flexible.js"
import "@assets/scss/base"
import { renderRoutes } from 'react-router-config';
import FooterNav from "@components/public/FooterNav"

class App extends Component {
    render() {
        const { route } = this.props;
        return (
            <div>
                {renderRoutes(route.routes)}
                <FooterNav/>
            </div>     
        );
    }
}


export default App;