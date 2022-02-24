function init() {
  checkout.init({
    publicKey: 'BLTPUBK-f3157519b8e065fb93db098baef61ccf',
    //reference: 'iefiern893443n', // most be unique each time
    amount: 5000.0,
    customer: {
      email: 'daylay92@yahoo.com',
      phoneNumber: '08063805598',
      name: 'Ayodele Akinbohun',
    },
    currency: 'NGN',
    onClose: () => console.log('closed'),
    onSuccess: (data) => console.log(data),
    onFailure: (data) => console.log(data),
  });
}
