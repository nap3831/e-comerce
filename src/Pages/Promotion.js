import React, { Component } from 'react';
import Banner from '../Components/Banner';
class Promotion extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="container-fluid">
                        <Banner text={"Promotion"}/>
                        </div>
                <div className="container-fluid MarginTopClass">
                    <div className="row">
                        <div className="col-12">
                            Promotion
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Promotion