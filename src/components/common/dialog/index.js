const dialogOut = function (that, Msg) {
  that.emitter.emit('DialogLayOut', Msg);
};

export default dialogOut;
