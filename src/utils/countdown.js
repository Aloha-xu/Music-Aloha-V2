var CountDown = {};

CountDown.openTimeCountBySeconds = function(params) {
  var that = params.that;
  var CountDownSeconds = 20;
  if (params.CountDownSeconds) {
    CountDownSeconds = params.CountDownSeconds;
  }
  var Ele = document.body;
  if (params.Ele) {
    Ele = params.Ele;
  }
  var EndFunc = function() {};
  if (params.EndFunc) {
    EndFunc = params.EndFunc;
  }
  var Divider = ":";
  if (params.Divider) {
    Divider = params.Divider;
  }
  var startDate = new Date();
  var endDate = new Date();
  endDate.setSeconds(startDate.getSeconds() + CountDownSeconds);

  var tempdate = new Date(endDate.getTime() - startDate.getTime());

  var interval = setInterval(function() {
    if (startDate.getTime() >= endDate.getTime()) {
      clearInterval(interval);
      EndFunc(that);
      return;
    }

    startDate.setSeconds(startDate.getSeconds() + 1);

    tempdate.setTime(endDate.getTime() - startDate.getTime());
    Ele.innerText = CountDown.makeTimeText(tempdate, Divider);
  }, 1000);
};

//拼接
CountDown.makeTimeText = function(tempdate) {
  var seconds = tempdate.getSeconds();
  var timetext = "";
  if (seconds < 10) {
    timetext = timetext + "0";
  }
  timetext = timetext + seconds;
  return timetext;
};

export default CountDown;
