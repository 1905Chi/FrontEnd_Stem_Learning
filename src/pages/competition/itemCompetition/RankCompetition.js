import React from 'react';
import './RankCompetition.css';
export default function RankCompetition() {
  return (
    <div className="rank-competition">
      <section className="section search">
        <div className="container">
          <div className="search-wrapper">
            <form method="GET">
              <div className="row">
                <div className="form-group col-md-4">
                  <label>Tỉnh / TP</label>
                  <div className="input">
                    <select className="form-control select-box" id="dataProvince" name="dataProvince">
                      <option value="">Chọn Tỉnh / TP</option>
                      <option value="1">Thành phố Hà Nội</option>
                      <option value="2">Tỉnh Hà Giang</option>
                      <option value="4">Tỉnh Cao Bằng</option>
                      <option value="6">Tỉnh Bắc Kạn</option>
                      <option value="8">Tỉnh Tuyên Quang</option>
                      <option value="10">Tỉnh Lào Cai</option>
                      <option value="11">Tỉnh Điện Biên</option>
                      <option value="12">Tỉnh Lai Châu</option>
                      <option value="14">Tỉnh Sơn La</option>
                      <option value="15">Tỉnh Yên Bái</option>
                      <option value="17">Tỉnh Hoà Bình</option>
                      <option value="19">Tỉnh Thái Nguyên</option>
                      <option value="20">Tỉnh Lạng Sơn</option>
                      <option value="22">Tỉnh Quảng Ninh</option>
                      <option value="24">Tỉnh Bắc Giang</option>
                      <option value="25">Tỉnh Phú Thọ</option>
                      <option value="26">Tỉnh Vĩnh Phúc</option>
                      <option value="27">Tỉnh Bắc Ninh</option>
                      <option value="30">Tỉnh Hải Dương</option>
                      <option value="31">Thành phố Hải Phòng</option>
                      <option value="33">Tỉnh Hưng Yên</option>
                      <option value="34">Tỉnh Thái Bình</option>
                      <option value="35">Tỉnh Hà Nam</option>
                      <option value="36">Tỉnh Nam Định</option>
                      <option value="37">Tỉnh Ninh Bình</option>
                      <option value="38">Tỉnh Thanh Hóa</option>
                      <option value="40">Tỉnh Nghệ An</option>
                      <option value="42">Tỉnh Hà Tĩnh</option>
                      <option value="44">Tỉnh Quảng Bình</option>
                      <option value="45">Tỉnh Quảng Trị</option>
                      <option value="46">Tỉnh Thừa Thiên Huế</option>
                      <option value="48">Thành phố Đà Nẵng</option>
                      <option value="49">Tỉnh Quảng Nam</option>
                      <option value="51">Tỉnh Quảng Ngãi</option>
                      <option value="52">Tỉnh Bình Định</option>
                      <option value="54">Tỉnh Phú Yên</option>
                      <option value="56">Tỉnh Khánh Hòa</option>
                      <option value="58">Tỉnh Ninh Thuận</option>
                      <option value="60">Tỉnh Bình Thuận</option>
                      <option value="62">Tỉnh Kon Tum</option>
                      <option value="64">Tỉnh Gia Lai</option>
                      <option value="66">Tỉnh Đắk Lắk</option>
                      <option value="67">Tỉnh Đắk Nông</option>
                      <option value="68">Tỉnh Lâm Đồng</option>
                      <option value="70">Tỉnh Bình Phước</option>
                      <option value="72">Tỉnh Tây Ninh</option>
                      <option value="74">Tỉnh Bình Dương</option>
                      <option value="75">Tỉnh Đồng Nai</option>
                      <option value="77">Tỉnh Bà Rịa - Vũng Tàu</option>
                      <option value="79">Thành phố Hồ Chí Minh</option>
                      <option value="80">Tỉnh Long An</option>
                      <option value="82">Tỉnh Tiền Giang</option>
                      <option value="83">Tỉnh Bến Tre</option>
                      <option value="84">Tỉnh Trà Vinh</option>
                      <option value="86">Tỉnh Vĩnh Long</option>
                      <option value="87">Tỉnh Đồng Tháp</option>
                      <option value="89">Tỉnh An Giang</option>
                      <option value="91">Tỉnh Kiên Giang</option>
                      <option value="92">Thành phố Cần Thơ</option>
                      <option value="93">Tỉnh Hậu Giang</option>
                      <option value="94">Tỉnh Sóc Trăng</option>
                      <option value="95">Tỉnh Bạc Liêu</option>
                      <option value="96">Tỉnh Cà Mau</option>
                      <option value="900">QUÂN ĐỘI</option>
                      <option value="901">CÔNG AN</option>
                      <option value="902">ĐOÀN KHỐI CÁC CƠ QUAN TRUNG ƯƠNG</option>
                      <option value="903">Sinh viên Việt Nam ở nước ngoài</option>
                      <option value="904">ĐOÀN KHỐI DOANH NGHIỆP TRUNG ƯƠNG</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: 'none' }} className="form-group col-md-4">
                  <label>Huyện</label>
                  <div className="input">
                    <select className="form-control select-box" id="dataDistrict" name="dataDistrict">
                      <option value="">Chọn huyện / thị xã</option>
                    </select>
                  </div>
                </div>
                <div className="form-group col-md-4">
                  <label id="lbl_school">Trường</label>
                  <div className="input">
                  <select className="form-control select-box" id="dataDistrict" name="dataDistrict">
                      <option value="">Chọn huyện / thị xã</option>
                    </select>
                  </div>
                </div>
                <div className="form-group col-md-4">
                  <label>Tuần thi</label>
                  <div className="input">
                    <select className="form-control select-box" id="dataWeek" name="dataWeek">
                      <option value="">Tất cả</option>
                      <option value="2">Thi thử tuần 1</option>
                      <option value="3">Thi thử tuần 2</option>
                      <option value="4">Thi tuần 1</option>
                      <option value="5">Thi tuần 2</option>
                      <option value="6">Thi tuần 3</option>
                      <option value="7">Thi tuần 4</option>
                      <option value="8">Thi tuần 5</option>
                      <option value="9">Thi tuần 6</option>
                    </select>
                  </div>
                </div>
                <div className="form-group col-md-4">
                  <label> Họ tên </label>
                  <div className="input">
                    <input
                      type="text"
                      id="dataName"
                      name="dataName"
                      className="form-control"
                      placeholder="Nhập họ tên"
                      value=""
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12" style={{ marginTop: '10px' }}>
                  <center>
                    <button className="btn btn-primary" id="search" type="submit">
                      Tìm kiếm
                    </button>
                  </center>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <section className="section search-results">
        <div className="container">
          <div className="table-responsive detail"></div>
          <div className="divPaginate" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <ul className="pagination">
              <li className="page-item">
                <input
                  style={{ width: '50px', padding: '10px', textAlign: 'center' }}
                  className="page-link"
                  type="text"
                  name="page_next"
                  id="page_next"
                  value="1"
                />
              </li>
              <span style={{ fontSize: '1rem', padding: '8px 10px 8px 3px' }}>/ 19986</span>
              <li className="page-item" style={{ marginLeft: '10px' }}>
                <a className="page-link btnGoPage">Chuyển</a>
              </li>
            </ul>
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="/ket-qua?dataProvince=&dataDistrict=&dataSchool=&dataWeek=&dataName=&page=1">Đầu</a>
              </li>
              <li className="page-item disabled">
                <a className="page-link" href="#">Trước</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="/ket-qua?dataProvince=&dataDistrict=&dataSchool=&dataWeek=&dataName=&page=2">Sau</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="/ket-qua?dataProvince=&dataDistrict=&dataSchool=&dataWeek=&dataName=&page=19986">Cuối</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
