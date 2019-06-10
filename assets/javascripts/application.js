$( "span.hours-dec" ).html(function() {
    var dec = this.innerHTML;
    var result = (dec*0.6);
    var str = String(result);
    this.innerHTML = ":"+(str.replace("0.","")).slice(0, 2);
})
$( "div.total-hours" ).html(function() {
    this.innerText = this.innerText.replace("hours", "");
})

$( "td.hours" ).html(function() {
    var time = this.innerHTML;
    var result = (time%1);
    var min = String(result*0.6).slice(2, 4);
    var hours = String(time).slice(0, 1);
    if(parseInt(min) > 0) {
	      this.innerHTML = hours+":"+min.replace(".","");
      } else {
        this.innerHTML = hours+":00";
      }
})
