
const Dashboard = () => {
  return (
    <div>
      <div id="dashboard_section" class="dashboard_section main_section">

            <div class="row">

                <div class="col-12 col-md-6 col-lg-3 dashboard_card_parent">
                    <div class="card text-dark bg-info mb-3 dashboard_card" >
                        <div class="card-body row">
                          <div class="col-9">
                            <h4>7</h4>
                            <h6 class="card-title text_truncate">سبد خرید امروز</h6>
                            <small class="card-title text_truncate">سبد های خرید مانده امروز</small>
                          </div>
                          <div class="col-3 d-flex justify-content-center align-items-center">
                            <i class="fas fa-shopping-basket card_icon"></i>
                          </div>
                        </div>
                    </div>
                    <div class="card text-dark bg-info mb-3 dashboard_card d-flex flex-row" >
                        <div class="card-body py-1 row">
                            <small class="m-0 d-block text_truncate">  <b>13</b> در هفته گذشته</small>
                            <small class="m-0 d-block text_truncate">  <b>18</b> در ماه گذشته</small>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-md-6 col-lg-3 dashboard_card_parent">
                    <div class="card text-dark bg-info mb-3 dashboard_card" >
                        <div class="card-body row">
                          <div class="col-9">
                            <h4>5</h4>
                            <h6 class="card-title text_truncate">سفارشات مانده امروز</h6>
                            <small class="card-title text_truncate">سفارشات معلق و فاقد پرداختی </small>
                          </div>
                          <div class="col-3 d-flex justify-content-center align-items-center">
                            <i class="fas fa-dolly card_icon"></i>
                          </div>
                        </div>
                    </div>
                    <div class="card text-dark bg-info mb-3 dashboard_card d-flex flex-row" >
                        <div class="card-body py-1 row">
                            <small class="m-0 d-block text_truncate">  <b>9</b> در هفته گذشته</small>
                            <small class="m-0 d-block text_truncate">  <b>16</b> در ماه گذشته</small>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-md-6 col-lg-3 dashboard_card_parent">
                    <div class="card text-dark bg-info mb-3 dashboard_card" >
                        <div class="card-body row">
                          <div class="col-9">
                            <h4>45</h4>
                            <h6 class="card-title text_truncate">سفارشات امروز</h6>
                            <small class="card-title text_truncate">سفارشات کامل و دارای پرداختی</small>
                          </div>
                          <div class="col-3 d-flex justify-content-center align-items-center">
                            <i class="fas fa-luggage-cart card_icon"></i>
                          </div>
                        </div>
                    </div>
                    <div class="card text-dark bg-info mb-3 dashboard_card d-flex flex-row" >
                        <div class="card-body py-1 row">
                            <small class="m-0 d-block text_truncate">  <b>263</b> در هفته گذشته</small>
                            <small class="m-0 d-block text_truncate">  <b>1038</b> در ماه گذشته</small>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-md-6 col-lg-3 dashboard_card_parent">
                    <div class="card text-dark bg-info mb-3 dashboard_card" >
                        <div class="card-body row">
                          <div class="col-9">
                            <h4>1,500,000</h4>
                            <h6 class="card-title text_truncate">درآمد امروز</h6>
                            <small class="card-title text_truncate">جمع مبالغ پرداختی (تومان)</small>
                          </div>
                          <div class="col-3 d-flex justify-content-center align-items-center">
                            <i class="fas fa-money-check-alt card_icon"></i>
                          </div>
                        </div>
                    </div>
                    <div class="card text-dark bg-info mb-3 dashboard_card d-flex flex-row" >
                        <div class="card-body py-1 row">
                            <small class="m-0 d-block text_truncate"> <b>6,380,000</b> در هفته گذشته </small>
                            <small class="m-0 d-block text_truncate"> <b>22,480,000</b> در ماه گذشته </small>
                        </div>
                    </div>
                </div>  

            </div>







            <div class="row">

                <div class="col-12 col-lg-6">

                    <p class="text-center mt-3 text-dark">محصولات رو به اتمام</p>

                    <table class="table table-responsive text-center table-hover table-bordered no_shadow_back_table font_08">
                        <thead class="table-secondary">
                            <tr>
                                <th>#</th>
                                <th>دسته</th>
                                <th>عنوان</th>
                                <th>وضعیت</th>
                                <th>عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>دسته شماره فلان</td>
                                <td>محصول فلان</td>
                                <td>پایان یافته</td>
                                <td>
                                    <i class="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip" title="نادیده گرفتن" data-bs-toggle="tooltip" data-bs-placement="top"></i>
                                </td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>دسته شماره فلان</td>
                                <td>محصول فلان</td>
                                <td>رو به اتمام - 4</td>
                                <td>
                                    <i class="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip" title="نادیده گرفتن" data-bs-toggle="tooltip" data-bs-placement="top"></i>
                                </td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>دسته شماره فلان</td>
                                <td>محصول فلان</td>
                                <td>پایان یافته</td>
                                <td>
                                    <i class="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip" title="نادیده گرفتن" data-bs-toggle="tooltip" data-bs-placement="top"></i>
                                </td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>دسته شماره فلان</td>
                                <td>محصول فلان</td>
                                <td>پایان یافته</td>
                                <td>
                                    <i class="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip" title="نادیده گرفتن" data-bs-toggle="tooltip" data-bs-placement="top"></i>
                                </td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>دسته شماره فلان</td>
                                <td>محصول فلان</td>
                                <td>رو به اتمام - 2</td>
                                <td>
                                    <i class="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip" title="نادیده گرفتن" data-bs-toggle="tooltip" data-bs-placement="top"></i>
                                </td>
                            </tr>

                        </tbody>
                    </table>

                </div>

                
                <div class="col-12 col-lg-6">
                    <canvas id="myChart" height="195"></canvas>
                </div>

            </div>










        </div>
    </div>
  )
}

export default Dashboard
