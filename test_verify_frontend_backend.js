// test_verify_frontend_backend.js
const http = require('http');

function checkUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        resolve({ status: res.statusCode, headers: res.headers, length: data.length });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function run() {
  console.log('Testing DivyaBharat Endpoints...');

  try {
    const backendHealth = await checkUrl('http://127.0.0.1:5000/api/health');
    console.log('Backend /api/health:', backendHealth.status);
  } catch (e) {
    console.log('Backend /api/health error:', e.message);
  }

  try {
    const backendStates = await checkUrl('http://127.0.0.1:5000/api/states');
    console.log('Backend /api/states:', backendStates.status);
  } catch (e) {
    console.log('Backend /api/states error:', e.message);
  }

  try {
    const backendStateGujarat = await checkUrl('http://127.0.0.1:5000/api/states/Gujarat');
    console.log('Backend /api/states/Gujarat:', backendStateGujarat.status);
  } catch (e) {
    console.log('Backend /api/states/Gujarat error:', e.message);
  }

  try {
    const frontendHome = await checkUrl('http://localhost:3000/');
    console.log('Frontend /:', frontendHome.status, '(bytes: ' + frontendHome.length + ')');
  } catch (e) {
    console.log('Frontend / error:', e.message);
  }

  try {
    const frontendTemples = await checkUrl('http://localhost:3000/temples');
    console.log('Frontend /temples:', frontendTemples.status, '(bytes: ' + frontendTemples.length + ')');
  } catch (e) {
    console.log('Frontend /temples error:', e.message);
  }

  try {
    const frontendHeritage = await checkUrl('http://localhost:3000/heritage');
    console.log('Frontend /heritage:', frontendHeritage.status, '(bytes: ' + frontendHeritage.length + ')');
  } catch (e) {
    console.log('Frontend /heritage error:', e.message);
  }

  try {
    const frontendState = await checkUrl('http://localhost:3000/states/Gujarat');
    console.log('Frontend /states/Gujarat:', frontendState.status, '(bytes: ' + frontendState.length + ')');
  } catch (e) {
    console.log('Frontend /states/Gujarat error:', e.message);
  }
}

run();
