const
    STATE_NONE = 0,
    STATE_PENDING = 1,
    STATE_SUCCESS = 2,
    STATE_ERROR = 3;

const fieldState = {
  state: STATE_NONE,
  value: '',
  message: '',
};

const handler = {
  get(obj, prop) {
    switch (prop) {
      case 'pending': return obj.state === STATE_PENDING;
      case 'success': return obj.state === STATE_SUCCESS;
      case 'error': return obj.state === STATE_ERROR;
      case 'complete': return obj.state === STATE_ERROR || obj.state === STATE_SUCCESS;
      default: return obj[prop];
    }
  }
};



module.exports = {
  STATE_SUCCESS,
  STATE_NONE,
  STATE_ERROR,
  STATE_PENDING,
  getModel() {
    return new Proxy({...fieldState}, handler);
  }
};
