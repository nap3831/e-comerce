import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import BarStatus from '../Components/BarStatus';
import Cart from '../Components/Cart';
import { connect } from 'react-redux';
class CartConfirm extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="MarginTopClassII">
                    <div className="container-fluid ">
                        <BarStatus status="Confirm" indexStatus={2}/>
                        <div className="container ">
                            <div className="row">
                                <div className="col-12 mt-5">
                                    <h5 className="text-confirm"><b>ตรวจสอบรายการสั่งซื้อ</b></h5>
                                    <h5 className="text-confirm">กรุณาตรวจสอบรายการสินค้าและข้อมูลจัดส่งว่าถูกต้องครบถ้วน จากนั้นกดปุ่ม "ยืนยันการสั่งซื้อ"</h5>
                                    <br />
                                </div>
                                <div className="col-6 text-left">
                                    <h5 className="text-confirm"><b>ที่อยู่ผู้สำหรับผู้จัดส่ง</b></h5>
                                </div>
                                <div className="col-6 text-right">
                                    <NavLink className="text-pink font-weight-bold" to="#"><b>เปลี่ยนที่อยู่</b></NavLink>
                                </div>
                                <div className="col-4">
                                    <h5 className="text-confirm">ชื่อ - นามสกุล ผู้รับ</h5>
                                    <h5 className="text-confirm">ที่อยู่ผู้รับ</h5>
                                    <h5 className="text-confirm">เบอร์โทรผู้รับ</h5>
                                </div>
                                <div className="col-8 ">
                                    <p className="text-confirm">
                                        ธันยพร ปึงทิพย์พิมานชัย
                                    </p>
                                    <p className="text-confirm">
                                        97/9 ถนน บางกรวย - ไทรน้อย ตำบลบางเลน อำเภอบางใหญ่ จังหวัดนนทบุรี 111
                                    </p>
                                    <p className="text-confirm">
                                        0823456789
                                    </p>
                                </div>
                                <div className="col-6 text-left">
                                    <h5 className="text-confirm"><b>รายการสินค้า</b></h5>
                                </div>
                                <div className="col-6 text-right">
                                    <NavLink className="text-pink font-weight-bold" to="#"><b>แก้ไขสินค้า</b></NavLink>
                                </div>
                                <Cart dataProduct={this.props.addedItems} AllPrice={this.props.allCost} />
                                <div className="col-6 text-left mb-5">
                                    <NavLink className="btn btn btn-color-pink-Address  bg-white text-pink w-75" to={`/Address`}><span className="Text-Confirm-Button ">ย้อนกลับ</span></NavLink>
                                </div>
                                <div className="col-6 text-right mb-5">
                                    <NavLink className="btn btn-color-pink-Address w-75" to={`/Booking`}><span className="Text-Confirm-Button ">ยืนยันการสั่งซื้อ</span></NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        addedItems: state.addedItems,
        allCost: state.allCost
    }
}
export default connect(mapStateToProps)(CartConfirm);