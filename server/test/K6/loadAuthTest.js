import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 10, // Virtual Users
  duration: '30s', // Duration of the test
};
export default function () {
  const users = [
    { email: 'anis@anis.anis', password: 'anis' },
    { email: 'louise@louise.louise', password: 'anis' },
    { email: 'lauren@gmail.com', password: 'anis' },
    { email: 'anis.dhaoui.ad@gmail.compp', password: 'anis' },
    { email: 'anis.dhaoui.ad@gmail.comn', password: 'anis' },
    { email: 'anis.dhaoui.ad@gmail.cojn', password: 'anis' },
    { email: 'anis.dhaoui.ad@gmail.coj', password: 'anis' },
    { email: 'anis.dhaoui.ad@gmail.cov', password: 'anis' },
    { email: 'david@gmail.comd', password: 'anis' },
    { email: 'david@gmail.com', password: 'anis' },
    { email: 'sunshinepretty@yahoo.frs', password: 'anis' },
    { email: 'anis.dhaoui.ad@gmail.com', password: 'anis' },
    { email: 'joe.juana@gmail.com', password: 'anis' },
    { email: 'mohamed@mohamed.mohamed', password: 'anis' },
    { email: 'ooooo@oo.ppp', password: 'anis' },
    { email: 'sdsds@ddd.ss', password: 'anis' }
  ];
// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ //
  // Simultaneously during 30s every virtual user in "VUS: 10" will try to authenticate with every account in users array,
  // FOR EXAMPLE:
  // Assuming we have 3 VU and only 2 accounts, so the first VU will post with anis@anis.anis then the second VU will post with the same account then the 3rd VU
  // After the 3 VUs finish posting with the first account, with the same scenario, the same order all the 3 VUs will try to authenticate with second account louise@louise.louise
  // And so on....................
// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ //


  const url = 'http://localhost:5000/auth/login';

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Iterate through the users array and make POST requests for each user
  users.forEach(user => {
    const payload = JSON.stringify({
      email: user.email,
      password: user.password,
    });

    let res = http.post(url, payload, params);
    check(res, {
      'status is 201': (r) => r.status === 201,
    });
    // check(res, {
    //   'status is 201': (r) => {console.log(r)},
    // });
    sleep(1);
  });
}