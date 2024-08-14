import React, {useState}from "react";
import {useNavigate} from "react-router-dom"
import { PlayerProfileContext } from "../Content/PlayerProfileData";
import { useLocation } from 'react-router-dom';
import {Layout, Menu, theme } from 'antd';
import { Table } from 'antd';

import './photo.jpeg'
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
      label:'Log Out',
      key: 'login',
    },
  ];

  const { Header, Content, Footer } = Layout;

function PlayerProfile(){
    
    const [current, setCurrent] = useState('');
    const navigate =useNavigate()
    const location = useLocation();
    const playerData = location.state?.result || [];
    const position = location.state?.pos || '';
    const playerName = location.state?.playerName || '';
    console.log("Player Data nd Position",playerData,position)
    const p = JSON.parse(playerData[0])
    //const p1 = p.slice(0,-1);
    console.log("pppp",p)
    //console.log('ne ppp',p1)
    console.log("player image",p[5])
    let data1 ={
        
      };
    let tableData = []
    let columns =[]
    

    if(position == 'att'){
        data1 =  {
            labels: ['Goals', 'Assists', 'Xg','Xa', 'Shots Percentage'],
            datasets: [
              {
                label: `Stats for ${playerName} `,
                data: p,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                
              },
              
            ],
          };
          columns = [
            {
              title: 'Attribute',
              dataIndex: 'attribute',
             
              width: 150,
            },
            {
              title: 'Value',
              dataIndex: 'value',
              
              width: 180,
            },
            
          ];
          tableData = [
            {
                
                attribute: 'Player Name',
                value: playerName,
                
              },
              {
                attribute: 'Goals',
                value: p[0],
                
              },
              {
                attribute: 'Assists',
                value: p[1],
                
              },
              {
                attribute: 'Xg',
                value: p[2],
                
              },
              {
                attribute: 'Xa',
                value: p[3],
                
              },
              {
                attribute: 'Shots Percentage',
                value: p[4],
                
              },
        ]  
    

    }
    else if (position == 'mid'){
        data1 =  {
            labels: ['Goals', 'Assists', 'Xa','Take On Percentage', 'Pass Completion Percentage'],
            datasets: [
              {
                label: `Stats for ${playerName} `,
                data: p,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                
              },
              
            ],
          };
          columns = [
            {
              title: 'Attribute',
              dataIndex: 'attribute',
             
              width: 200,
            },
            {
              title: 'Value',
              dataIndex: 'value',
              
              width: 180,
            },
            
          ];
          tableData = [
            {
                
                attribute: 'Player Name',
                value: playerName,
                
              },
              {
                attribute: 'Goals',
                value: p[0],
                
              },
              {
                attribute: 'Assists',
                value: p[1],
                
              },
              {
                attribute: 'Xa',
                value: p[2],
                
              },
              {
                attribute: 'Take On Percentage',
                value: p[3],
                
              },
              {
                attribute: 'Pass Completion Percentage',
                value: p[4],
                
              },
        ]  

    }
    else if (position == 'def'){
        data1 =  {
            labels: ['Tackles Percent', 'Aerial Duels Percent', 'Interceptions','Take On Percent', 'Clearances'],
            datasets: [
              {
                label: `Stats for ${playerName} `,
                data: p,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                
              },
              
            ],
          };
          columns = [
            {
              title: 'Attribute',
              dataIndex: 'attribute',
             
              width: 200,
            },
            {
              title: 'Value',
              dataIndex: 'value',
              
              width: 180,
            },
            
          ];
          tableData = [
            {
                
                attribute: 'Player Name',
                value: playerName,
                
              },
              {
                attribute: 'Tackle Percentage',
                value: p[0],
                
              },
              {
                attribute: 'Aerial Duel Percentage',
                value: p[1],
                
              },
              {
                attribute: 'Interceptions',
                value: p[2],
                
              },
              {
                attribute: 'Take On Percentage',
                value: p[3],
                
              },
              {
                attribute: 'Clearances',
                value: p[4],
                
              },
        ]  

    }
    else if (position == 'gk'){
        data1 =  {
            labels: ['Save Percent', 'Pens Save Percent', 'Pass Percent','Clean Sheet Percent'],
            datasets: [
              {
                label: `Stats for ${playerName} `,
                data: p,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                
              },
              
            ],
          };
          columns = [
            {
              title: 'Attribute',
              dataIndex: 'attribute',
             
              width: 150,
            },
            {
              title: 'Value',
              dataIndex: 'value',
              
              width: 80,
            },
            
          ];
          tableData = [
            {
                
                attribute: 'Player Name',
                value: playerName,
                
              },
              {
                attribute: 'Save Percent',
                value: p[0],
                
              },
              {
                attribute: 'Pen Save Percent',
                value: p[1],
                
              },
              {
                attribute: 'Pass Percent',
                value: p[2],
                
              },
              {
                attribute: 'Clean Sheet Percent',
                value: p[3],
                
              },
              
        ]    

    }

    

    

   

    
    

    const menuChange = (e) => {
      //navigate(`/${item}`,{replace: false})
      console.log('click ', e);
      setCurrent(e.key);
      navigate(`/${e.key}`)
      
    };
    const imageUrl = './photo.jpeg'
    
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
      <Content style={{display:'flex',padding: '0px 60px'}}>
      <div
          style={{
            maxHeight: 475,
            padding: 24,
            minWidth: 400,
            //display:'flex',
            justifyContent: 'flex-start',
            alignItems:'flex-start',
            
            margin:0
          }}
        >
          <Radar  data={data1} />
        </div>
        <div style={
            {
                justifyContent:'center',
                alignItems:'center',
                padding:'80px '
            }
        }>
           <img src={require('./kevin.png')}/>
           

        </div>
        <div>
        <Table 
        style={{
          padding: '88px 40px',
          justifyContent: 'flex-end',
            alignItems:'flex-end',
            maxHeight:475
          
        }}
        columns={columns} dataSource={tableData} 
        
        
         />
         </div>

      </Content>
      
      
        
        
      
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

export default PlayerProfile;