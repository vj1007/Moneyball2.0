import React ,{useContext,useState} from "react";
import { ProductContext } from "../Content/PlayerData";
import {useNavigate} from "react-router-dom"
import {Layout, Menu, theme } from 'antd';
import { Table } from 'antd';
import { useLocation } from 'react-router-dom';
import {
    Button,
    Form,
    Input,
    InputNumber,
    Select,
  } from 'antd';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);




const item = [
    {
        label: <img width='200' height='30' src={require('./Moneyball .png')}/>,
        key: 'home',
        
      },
    {
      label: 'Home',
      key: 'home',
      
    },
    {
      label: 'Tool',
      key: 'firsttool',
      
    },
    {
      label: 'Contact Us',
      key: 'contactus',
      
    },
    {
      label:'Log In',
      key: 'login',
    },
  ];
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 14,
      },
    },
  };
  const { Header, Content, Footer } = Layout;
/*import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
} from 'antd';
import ContactUs from './new';*/

function ResultChart(){
   

    const navigate =useNavigate()

    const [current, setCurrent] = useState('');

   

    
    

    const menuChange = (e) => {
      //navigate(`/${item}`,{replace: false})
      console.log('click ', e);
      setCurrent(e.key);
      navigate(`/${e.key}`)
      
    };

    

    const location = useLocation();
    const result = location.state?.teamArray || [];
    const updatedTeamArray = location.state?.updatedTeamArray || [];
    //const team = location.state?.team || '';
    //const result = JSON.parse(resultlist);
    //console.log("posiion",team)
    console.log("result",result)

    const data1 =  {
        labels: ['Goals', 'Assists', 'Pass Completion %','Tackle %', 'Aerial Duel %'],
        datasets: [
          {
            label: 'Stats for the best possible',
            data: [92, 69, 87.3, 52.8, 56.4],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            
          },
          {
            label: `Stats before buying `,
            data: result,
            backgroundColor: 'rgba(54, 199, 232, 0.2)',
            borderColor: 'rgba(54, 199, 232, 1)',
            borderWidth: 1,
          },
          {
            label: `Stats after buying `,
            data: updatedTeamArray,
            backgroundColor: 'rgba(0, 255, 0, 0.2)',
            borderColor: 'rgba(0, 255, 0, 1)',
            borderWidth: 1,
          },
        ],
      };

    
     
      

    return(
        <div>
            <Layout>
      <Header
        
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[current]}
          items={item}
          
          onClick={menuChange}
          style={{
            gap:'9.5%'
          }}
        />
      </Header>
      
      <div
          style={{
            maxHeight: 475,
            padding: 24,
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            margin:0
          }}
        >
          <Radar data={data1} />
        </div>
        
        
      
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        MoneyBall 2.0 ©{new Date().getFullYear()} Created by Team 14
      </Footer>
    </Layout>
        </div>
    )
}

export default ResultChart;