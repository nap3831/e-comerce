import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductSlide from '../Components/ProductSlide';
import facebook from '../Assets/images/logo/facebook.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faPlus, faMinus } from '@fortawesome/fontawesome-free-solid';
import DetailProduct from '../Components/DetailProduct';
import Suggest from '../Components/Suggest';
import { NavLink } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import axios from 'axios';
class ProductDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentItems: [],
            size: "S",
            color: "สีดำ",
            amount: 1,
            dropdownOpen: false,
            dropdownColorOpen: false,
        }
        this.toggle = this.toggle.bind(this);
        this.toggleDropdownColor = this.toggleDropdownColor.bind(this);
        this.HandlePlusAmount = this.HandlePlusAmount.bind(this);
        this.HandleDeleteAmount = this.HandleDeleteAmount.bind(this);
        this.addItemToCart = this.addItemToCart.bind(this);
        this.handleChangeAmount = this.handleChangeAmount.bind(this);
    }
    componentWillMount() {
        window.scrollTo(0, 0);
    }
    componentWillReceiveProps(newProps) {
        if (newProps.match.params.id !== this.props.match.params.id) {
            window.scrollTo(0, 0);
        }
    }
    toggle() {
        this.setState(prevState => ({ dropdownOpen: !prevState.dropdownOpen }));
    }
    toggleDropdownColor() {
        this.setState(prevState => ({ dropdownColorOpen: !prevState.dropdownColorOpen }));
    }
    handleSize = (e) => {
        this.setState({ size: e.target.value })
    }
    handleColor = (e) => {
        this.setState({ color: e.target.value })
    }
    HandlePlusAmount = () => {
        this.setState({ amount: this.state.amount + 1 })
    }
    HandleDeleteAmount = () => {
        this.setState({ amount: this.state.amount - 1 })
    }
    handleChangeAmount = (e) => {
        let eventAmout = parseInt(e.target.value);
        if (eventAmout <= 0 || isNaN(eventAmout)) {
            this.setState({ amount: 1 })
        } else {
            this.setState({ amount: eventAmout })
        }
    }
    componentDidMount() {
        axios.get('http://www.mocky.io/v2/5db946cd30000040765ee168').then(res => {
            this.setState({
                currentItems: res.data.items
            })
        })
    }
    addItemToCart() {
        for (let idx = 0; idx < this.state.currentItems.length; idx++) {
            if (parseInt(this.props.match.params.id) === this.state.currentItems[idx].id) {
                let dataToDb = {
                    id: this.state.currentItems[idx].id,
                    name: this.state.currentItems[idx].name,
                    img: this.state.currentItems[idx].img[0].source,
                    size: this.state.size,
                    color: this.state.color,
                    amount: this.state.amount,
                    cost: this.state.currentItems[idx].cost * this.state.amount
                }
                this.props.addItems(dataToDb)
                this.props.SumCost(dataToDb.cost);
            }
        }
    }
    render() {
        return (
            <div className="MarginTopClassII container-fluid">
                {this.state.currentItems.map((data, i) => {
                    return (
                        parseInt(this.props.match.params.id) === data.id &&
                        <React.Fragment key={i}>
                            <div className="container-fluid h-50">
                                <div className="row">
                                    <div className="col-lg-6 col-12">
                                        <ProductSlide imgSource={data} />
                                    </div>
                                    <div className="col-lg-6 col-12 ProductDetail">
                                        <div className="conatiner ">
                                            <div className="row">
                                                <div className="col-12 mb-5">
                                                    <h3>{data.name}<br />{data.cost} บาท <s className="text-secondary">1,280 บาท</s></h3>
                                                </div>
                                                <div className="col-12 MarginTopClassIII">
                                                    <div className="lead">
                                                        เเชร์ :&nbsp; &nbsp; <img src={facebook} alt="face แชร์" width="40" height="40" />
                                                    </div>
                                                </div>
                                                {/* Select Size Product */}
                                                <div className="col-12">
                                                    <p className="lead">เลือกไซส์เสื้อ</p>
                                                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                                        <DropdownToggle className="buttonSize text-left">
                                                            <div className="container">
                                                                <div className="row">
                                                                    <div className="mr-auto">{this.state.size}</div>
                                                                    <div className="ml-auto caret"></div>
                                                                </div>
                                                            </div>
                                                        </DropdownToggle>
                                                        <DropdownMenu className="text-center">

                                                            <DropdownItem onClick={this.handleSize} value="S">S</DropdownItem>
                                                            <DropdownItem onClick={this.handleSize} value="M">M</DropdownItem>
                                                            <DropdownItem onClick={this.handleSize} value="L">L</DropdownItem>
                                                            <DropdownItem onClick={this.handleSize} value="XL">XL</DropdownItem>
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                </div>
                                                {/* Select Color Product */}
                                                <div className="col-12 mt-3">
                                                    <p className="lead">เลือกสี</p>
                                                    <Dropdown isOpen={this.state.dropdownColorOpen} toggle={this.toggleDropdownColor}>
                                                        <DropdownToggle className="buttonSize">
                                                            <div className="container">
                                                                <div className="row">
                                                                    <div className="mr-auto">{this.state.color}</div>
                                                                    <div className="ml-auto caret"></div>
                                                                </div>
                                                            </div>
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            <DropdownItem onClick={this.handleColor} value="สีดำ">สีดำ</DropdownItem>
                                                            <DropdownItem onClick={this.handleColor} value="สีขาว">สีขาว</DropdownItem>
                                                            <DropdownItem onClick={this.handleColor} value="สีเขียว">สีเขียว</DropdownItem>
                                                            <DropdownItem onClick={this.handleColor} value="สีแดง">สีแดง</DropdownItem>
                                                            <DropdownItem onClick={this.handleColor} value="สีน้ำเงิน">สีน้ำเงิน</DropdownItem>
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                </div>
                                                <div className="col-12 mt-3">
                                                    <p className="lead">จำนวน</p>
                                                    <ul className="list-amount">
                                                        <li className="d-inline mr-4">
                                                            <button className="btn btn-color-pink" disabled={this.state.amount === 1} onClick={this.HandleDeleteAmount}>
                                                                <FontAwesomeIcon icon={faMinus} className="iconButton" />
                                                            </button>
                                                        </li>
                                                        <li className="d-inline customInputBox">
                                                            {/* {this.state.amount} */}
                                                            <input type="number" className="inputBox" placeholder={this.state.amount} onChange={this.handleChangeAmount} />
                                                        </li>
                                                        <li className="d-inline ml-4">
                                                            <button className="btn btn-plus btn-color-pink" onClick={this.HandlePlusAmount}>
                                                                <FontAwesomeIcon icon={faPlus} className="iconButton" />
                                                            </button>
                                                        </li>
                                                    </ul>
                                                    <ul className="list-amount mt-5">
                                                        <li className="d-inline ">
                                                            <NavLink to="/Mycart" className="btn btn-amount text-white weight-button-addcart" onClick={this.addItemToCart}>
                                                                <div className="py-2">
                                                                    <FontAwesomeIcon icon={faShoppingCart} /> หยิบใส่ตระกร้า
                                                                </div>
                                                            </NavLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    )
                })
                }
                <DetailProduct />
                <Suggest />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        addedItems: state.addedItems,
        allCost: state.allCost
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addItems: (dataToDb) => {
            dispatch({
                type: "ADD_Item",
                payload: dataToDb
            })
        },
        SumCost: (cost) => {
            dispatch({
                type: "Total",
                payload: cost
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
