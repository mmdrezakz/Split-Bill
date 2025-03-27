
import { useState } from 'react';
import './App.css';
const Profiles = [
  {id:1234,name1:"هانیه حسابی",image:"https://www.soorban.com/images/news/2022/09/1663110472_W6sK9.jpg",balance:-7},
  {id:123478,name1:"سعیده جعفری ",image:"https://www.soorban.com/images/news/2022/09/1663110489_M6oV9.jpg",balance:20},
  {id:123456,name1:"سارا رضایی",image:"https://www.soorban.com/images/news/2022/09/1663110509_G6tX0.jpg",balance:0}

]
function App() {
  const [friend,setFriend] = useState(Profiles)
  const [openFriend,setOpenFriend] = useState(false);
  
  const [selectFriend,setSelectFriend] = useState(null)

  function openHandler(){
    setOpenFriend(!openFriend)
  }
  function onSetFriend(newFriend){
    setFriend(friends => [...friends,newFriend])
    setOpenFriend(false)
  }
  function selectedHandler(friend){
    setSelectFriend((cur) => friend?.id === cur?.id ? null : friend)
    setOpenFriend(false)
  }

  function onBillHandler(value){
    console.log(value)

    setFriend(friend.map(f => f.id === selectFriend.id ? {...f,balance: f.balance + value}: f))
  }
  return (
    <div className='flex items-baseline justify-between gap-4 relative'>
    <div className='w-1/2'>
   <FriendItems friend={friend} selectedHandler={selectedHandler} selectFriend={selectFriend}/>
   {openFriend && <AddFriend onSetFriend={onSetFriend}/> }
    <div className='mx-3 my-2'>
    <Button openHandler={openHandler}>{openFriend ? "بستن پنجره" : "دوست جدید" }</Button>
    </div>
    </div>
    <div className='w-1/2 float-end'>
    {selectFriend && <SplitMamad selectFriend={selectFriend} onBillHandler={onBillHandler} key={selectFriend.id}/>}
    </div>
    </div>
  );
}
function FriendItems({friend,selectedHandler,selectFriend}){
  // const friend = Profiles;
  return(
    <div className='containers'>
      <div id='1' >
      {friend.map(f => <Friend f={f} key={f.id} selectedHandler={selectedHandler} selectFriend={selectFriend} />)}
      {/* <button className='button'>اضافه کردن</button> */}
      </div>
    </div>
  )
}
function Friend({f,selectedHandler,selectFriend}){
  const isSelect = selectFriend?.id === f?.id
  return(
    <div className={`friend-container px-1 rounded-lg hover:bg-emerald-50 hover:ease-in-out  ${isSelect ? "bg-emerald-200" : ""}`}>
      <img className='img-f' src={f.image} alt={f.name1}/>
      <div id='block'>
        <div>{f.name1}</div>
        <div>
          {f.balance < 0 && <p className='text-[12px] text-red-600 text-balance'>شما{Math.abs(f.balance)}هزارتومان به {f.name1 } بدهکارید </p>}

          {f.balance > 0 && <p className='text-[12px] text-balance text-orange-400'>{f.name1 }{Math.abs(f.balance)}هزارتومان به شما بدهکار است</p>}

          {f.balance === 0 && <p className='text-[12px] text-balance'>{f.name1 } با شما بی حساب هست </p>}
          
        </div>
      </div>
      <button onClick={() =>selectedHandler(f)} className='button p-1 hover:outline outline-2 outline-orange-600 hover:ease-in-out' >{isSelect ? "بستن" : "انتخاب"}</button>
    </div>
  )
}
function Button({children,openHandler}){
  return(
    <button onClick={openHandler} className='button p-1 hover:outline outline-2 outline-orange-600 hover:ease-in-out ' >{children}</button>
  )
}
function AddFriend({onSetFriend}){
  const [name1,setName] = useState("");
  const[image,setImage] = useState("");

  function SubmitHandler(e){
    e.preventDefault();

    const newFriend = {
      name1, 
      image,
      id:image,
      balance:0
    }
    // console.log(newFriend)
    onSetFriend(newFriend)
  }
  return(
    <form className='bg-emerald-100 rounded-md grid grid-cols-2 items-center p-2 gap-2' onSubmit={SubmitHandler}>
      <label>دوست جدید</label>
      <input type='text' className='border rounded-md outline-orange-400 bg-orange-200' value={name1} onChange={e => setName(e.target.value)}></input>
      <label>آدرس عکس</label>
      <input type='text' className='border rounded-md outline-orange-400 bg-orange-200' value={image} onChange={e => setImage(e.target.value)}></input>
      <Button>اضافه کردن</Button>
    </form>
  )
}
function SplitMamad({selectFriend,onBillHandler}){
  const [bill,setBill] = useState("");
  const [myExpence,setMyExpence] = useState("");
  const userExpence = bill ? bill - myExpence : ""
  const [howPay,setHowPay] = useState("me")

  function submithandler(e){
    e.preventDefault();
    
    if(!bill || !myExpence) return;

    onBillHandler(howPay === "me" ? userExpence : -userExpence)
  }
  return(
    <form onSubmit={submithandler} className='bg-emerald-100 rounded-md grid grid-cols-2 items-center p-2 gap-2'>
      <div className='col-span-2 text-center text-lg'>فاکتور  دوستانه با {selectFriend.name1}</div>
      <label>قیمت کل</label>
      <input type='text' className='border rounded-md outline-orange-400 bg-orange-200' value={bill} onChange={e =>setBill(+e.target.value)}></input>
      <label>پرداختی شما</label>
      <input type='text' className='border rounded-md outline-orange-400 bg-orange-200' value={myExpence} onChange={e => setMyExpence(+e.target.value > bill ? myExpence : +e.target.value)}></input>
      <label>پرداختی {selectFriend.name1}</label>
      <input type='text' className='border rounded-md outline-orange-400 bg-orange-200 disabled:bg-orange-100' disabled value={userExpence}></input>
      <label>کی فاکتور را حساب کرده ؟</label>
      <select  className='border rounded-md outline-orange-400 bg-orange-200' value={howPay} onChange={e => setHowPay(e.target.value)}>
        <option value={"me"}>شما</option>
        <option value={"user"}>{selectFriend.name1}</option>

      </select>
      <Button>اضافه کردن</Button>
    </form>
  )
}
export default App;
