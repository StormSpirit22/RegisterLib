const Register = require('./register');
const CompileDeploy = require('./compile_deploy')
const fs = require('fs')

async function run() {


  const register = new Register();

  let contractAddress = "";
  const path = './build/RegisterContractAddress.txt';
  if(fs.existsSync(path))
    contractAddress = fs.readFileSync('./build/RegisterContractAddress.txt').toString();
  //判断合约是否已被部署，如果没被部署则先部署
  if (contractAddress === "") {
    console.log("Deploy contract now...");
    await CompileDeploy('Register');
    contractAddress = fs.readFileSync('./build/RegisterContractAddress.txt').toString();
  }
  else console.log("Contract has been deployed");
  console.log("Contract Address: " + contractAddress);

  await register.initialize(contractAddress);

  console.log("ImageIdentification AI's address: " + register.getAIAddr('ImageIdentification'));

  console.log("ImageIdentification is registered? " + register.isRegistered('ImageIdentification'));

  //判断AI是否已经注册
  if (!register.isRegistered('ImageIdentification')){

    console.log("Register ImageIdentification...");
    await register.registerAI('ImageIdentification', '0x12345678901234567890123456789');
    //由于链上更新需要时间，所以设置30s延迟输出结果
    setTimeout(() => {
      console.log("After register, ImageIdentification AI's address: " + register.getAIAddr('ImageIdentification'));
    }, 30000)

  }
  else {

    // console.log("Alter ImageIdentification AI's address...");
    // await register.setAIAddr('ImageIdentification', '0x987654321987654321987654321');
    // setTimeout(() => {
    //   console.log("After alter, ImageIdentification AI's address: " + register.getAIAddr('ImageIdentification'));
    // }, 30000)

    console.log("Delete ImageIdentification...");
    await register.deleteAIByName('ImageIdentification');
    setTimeout(() => {
      console.log("After delete, ImageIdentification AI's address: " + register.getAIAddr('ImageIdentification'));
    }, 30000)

  }
}

run()