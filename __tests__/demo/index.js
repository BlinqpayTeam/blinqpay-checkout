/* eslint-disable prettier/prettier */
function init() {
  blinqpaySDK.init({
    publicKey: 'BLTSECK-6555efdda2de3899db1d37ba24761d5f',
    //reference: 'iefiern893443n', // most be unique each time
    amount: 2000.0,
    customer: {
      email: 'daylay92@yahoo.com',
      phoneNumber: '08063805598',
      name: 'Ayodele Akinbohun',
    },
    currency: 'NGN',
    onClose: () => console.log('closed'),
    onSuccess: (data) => console.log(data),
    onFailure: (data) => console.log(data),
    onPending: (data) => console.log(data),
  });
}

const el = document.getElementById('tnmt');

el.onclick = init;