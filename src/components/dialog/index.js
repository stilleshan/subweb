const showDialog = function (
  status,
  title,
  message,
  callbackFunction = null,
  buttonText = { confirmText: '确认', cancelText: '取消' }
) {

  const buttonStyle = {
    default: { icon: 'IconSuccess', button: 'ButtonDefault' },
    success: { icon: 'IconSuccess', button: 'ButtonSuccess' },
    warning: { icon: 'IconWarning', button: 'ButtonWarning' },
    error: { icon: 'IconError', button: 'ButtonError' },
    confirmDefault: { icon: 'IconSuccess', button: 'ButtonConfirmDefault' },
    confirmSuccess: { icon: 'IconSuccess', button: 'ButtonConfirmSuccess' },
    confirmWarning: { icon: 'IconWarning', button: 'ButtonConfirmWarning' },
    confirmError: { icon: 'IconError', button: 'ButtonConfirmError' },
  };
  const payload = {
    active: true,
    icon: buttonStyle[status].icon || buttonStyle.default.icon,
    title,
    message,
    button: buttonStyle[status].button || buttonStyle.default.button,
    callbackFunction,
    buttonText,
  };

  this.$store.commit('SET_DIALOG_ACTIVE', payload);
};

const closeDialog = function () {
  this.$store.commit('SET_DIALOG_CLOSE');
};

export { showDialog, closeDialog };
