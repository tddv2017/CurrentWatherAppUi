"use strict";
/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */

/*** REGION 2 - Vùng gán / thực thi hàm xử lý sự kiện cho các elements */
$(document).ready(function(){
    $("#id-btn-seach-weather").on("click", function(){
        onBtnSeachWeather();
    })
})
/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */ 
function onBtnSeachWeather() {
   //console.log("Đã nhấn seach weather")
   //B1 thu thập dữ liệu và đối tượng lưu
   var vWeatherObj = {
    inputSeach : ""
   };
   getDataSeachWeather(vWeatherObj);
   //B2 Validate Data Seach
    //B3 Call Ajax lấy current weather
    getCurrentWeather(vWeatherObj);
   }
 
/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/
function kiemTraDataSeachWeather(paramObj) {
    if(paramObj.inputSeach == "") {
        alert("Chưa nhập thành phố cần seach weather")
        return false;   
    }
    return true;
}
function getDataSeachWeather(paramObj) {
    paramObj.inputSeach = $("#id-inp-seach-city-weather").val();

}
function getCurrentWeather(paramObj) {
    var vCity = paramObj.inputSeach
    if (vCity != '') {
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather?q=' + vCity + "&units=metric" +
                "&APPID=c10bb3bd22f90d636baa008b1529ee25",
            type: "GET",
            dataType: "json",
            success: function (data) {
                //B4 hiẻn thị font-end
                console.log(
                    $("#id-div-show")
                    .css("display", "block")
                    .html(
                    `<h3 class="text-center">Current Weather for ${data.name}, ${data.sys.country}</h3>
                    <p>Weather: ${data.weather[0].main}</p>
                    <p>Description:<img src='http://openweathermap.org/img/w/${data.weather[0].icon}.png'> ${data.weather[0].description}</p>
                    <p>Temperature: ${data.main.temp}</p>
                    <p>Pressure: ${data.main.pressure}</p>
                    <p>Humidity: ${data.main.humidity}</p>
                    <p>Min Temperature: ${data.main.temp_min}</p>
                    <p>Max Temperature: ${data.main.temp_max}</p>
                    <p>Wind Speed: ${data.wind.speed}</p>
                    <p>Wind Direction: ${data.wind.deg}</p>`
                    )
                )
            }

        });
    } else {
        alert("City not valid");
    }
}