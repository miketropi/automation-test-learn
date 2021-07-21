
const puppeteer = require( 'puppeteer' );
const prompt = require( 'prompt-sync' )();

const conf = {
  headless: false
};

const shopee = {
  home: `https://shopee.vn`,
  login: `https://shopee.vn/buyer/login?next=https%3A%2F%2Fshopee.vn%2F`,
  profile: `https://shopee.vn/user/account/profile`,
};

const getLoginInfo = async () => {
  let userPhone = ''
  let userPass = ''

  const phone = await prompt('Enter your Phone:');
  const pass = await prompt('Enter your Password:', { echo: '*' });

  return { phone, pass }
}

( async () => {
  const browser = await puppeteer.launch( conf )
  const page = await browser.newPage()
  await page.goto( shopee.login )

  let loginInfo = await getLoginInfo()
  console.log( `Get login info successful!` )

  await page.type('input[name=loginKey]', loginInfo.phone );
  await page.type('input[name=password]', loginInfo.pass ); // Types slower, like a user
  
  await page.waitForTimeout( 2000 )
  await page.click( `button._1ruZ5a._3Nrkgj._3kANJY._1IRuK_.hh2rFL._3_offS` )

  await page.waitForSelector( '.navbar__username', { visible: true, timeout: 0 } )
  console.log( `Login successful!` )

  await page.goto( shopee.profile )

  await page.screenshot( { path: 'screenshot.png' } )
  await browser.close();
} )()