import React, { useEffect, useState } from "react";
import "./Total_value.css";
import Tab from "../Tab/Tab";
import { Staking, Staking_Abi } from "../../utilies/constant";
import Web3 from "web3";
import { useSelector } from "react-redux";
function Total_value({setShoww}) {
  let { provider, acc, providerType, web3 } = useSelector(
    (state) => state.connectWallet
);
  
  const [totalUserAmount, settotalUserAmount] = useState(0)
  const [WithdrawReward, setWithdrawReward] = useState(0)

  const TotalAmount =async()=>{
    try{
      const webSupply = new Web3(
        "https://data-seed-prebsc-1-s1.binance.org:8545"
    );


    let stakingContractOf = new webSupply.eth.Contract(Staking_Abi, Staking);

    if (acc != null) {


        let UserInformation = await stakingContractOf.methods
            .Users(acc)
            .call();
            console.log("Users",UserInformation.DepositeToken);

           let UserInformationdata=web3.utils.fromWei(UserInformation.DepositeToken)
           let WithdrawRewardAmount=web3.utils.fromWei(UserInformation.WithdrawReward)

           setWithdrawReward(parseFloat(WithdrawRewardAmount).toFixed(3))
            settotalUserAmount(UserInformationdata)
    }


    }catch(e){

    }
  }

  useEffect(() => {
    TotalAmount()
  })


  return (
    <div className="">
      <div
        class="chakra-stat css-16fwhjm"
        style={{
          padding: "1rem 2rem 0.5rem",
          width: "max-content",
          minWidth: "265px",
          margin: "1rem auto",
          boxShadow: "rgb(116, 54, 128) 0px 0px 50px 0px",
         height:"8rem"
        }}
      >
        <dl>
          <dt class="chakra-stat__label css-1mqe0od">Total Value Locked</dt>
          <dd class="chakra-stat__number css-1snxiwx">
            <p class="chakra-text css-0 text-white">${totalUserAmount}</p>
          </dd>
          <div class="css-je7iwd  text-white" style={{marginTop:"-1rem"}}>
            <p class="chakra-text css-1veligu">$ {WithdrawReward} WithdrawReward</p>
          </div>
        </dl>
      </div>

      <div className="container">
        <div className="row  text-white">
          <div className="text-center m-auto">
            <Tab setShoww={setShoww} totalUserAmount={totalUserAmount}  />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Total_value;
