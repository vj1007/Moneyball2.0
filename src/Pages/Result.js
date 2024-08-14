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
import { playerPosition } from "../Content/PlayerPosition";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export const data1 =  {
  labels: ['Goals', 'Assists', 'Tackle %', 'Aerial Duel %', 'Pass Completion %'],
  datasets: [
    {
      label: 'Stats for the best possible',
      data: [77, 69, 93, 75, 60],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
      
    },
    {
      label: 'Stats for your team',
      data: [90, 80, 100, 84, 70],
      backgroundColor: 'rgba(54, 199, 232, 0.2)',
      borderColor: 'rgba(54, 199, 232, 1)',
      borderWidth: 1,
    },
  ],
};


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

function Result(){
    /*const {player} = useContext(ProductContext);
    
    console.log(player);
    const navigate = useNavigate();
    const handleClick =(a) =>{
        console.log("item clicked",a)
        navigate(`/playerprofile/${a}`,{replace: false})

    }*/

    const navigate =useNavigate()

    const [current, setCurrent] = useState('');
    const [playerData, setPlayerData] = useState('');

    const location = useLocation();
    const resultlist = location.state?.result || [];
    const teamArray = location.state?.teamArray || [];
    const updatedTeamArray = teamArray.slice();
    const position = location.state?.pos || '';
    const result = JSON.parse(resultlist);
    console.log("posiion",position)
    
    console.log("resullist",resultlist)
    console.log("re",result)
    console.log("team arrau",teamArray)
    console.log("before updaion",updatedTeamArray)
    
    let updatedArray = [];
    if(position == 'att'){
      let updatedArray1 = result.map(obj => {
        return { ...obj, predicted_assists: Math.round(obj.predicted_assists)};
      });
      updatedArray = updatedArray1.map(obj => {
        return { ...obj, predicted_goals: Math.round(obj.predicted_goals)};
      });
      let goals = 0;
      for (let i = 0; i < updatedArray.length; i++) {
        goals += updatedArray[i].predicted_goals;
      }
      let assists = 0;
      for ( let i = 0;  i < updatedArray.length; i++){
        assists += updatedArray[i].predicted_assists
      }
      console.log("goals , assisst",goals,assists)
      updatedTeamArray[0] = updatedTeamArray[0]+goals
      updatedTeamArray[1] = updatedTeamArray[1]+assists

      
 
    }
    else if (position == 'mid'){
      let updatedArray1 = result.map(obj => {
        return { ...obj, predicted_assists: Math.round(obj.predicted_assists)};
      });
      updatedArray = updatedArray1.map(obj => {
        return { ...obj, predicted_pass_pct: Math.round(obj.predicted_pass_pct)};
      });
      let pass_pct = 0;
      for (let i = 0; i < updatedArray.length; i++) {
        pass_pct += updatedArray[i].predicted_pass_pct;
      }
      let assists = 0;
      for ( let i = 0;  i < updatedArray.length; i++){
        assists += updatedArray[i].predicted_assists
      }
      console.log("pass_pct , assisst",pass_pct,assists)
      updatedTeamArray[2] = (updatedTeamArray[2]+pass_pct)/(updatedArray.length+1)
      updatedTeamArray[1] = updatedTeamArray[1]+assists
    }
    else if (position == 'def'){
      let updatedArray1 = result.map(obj => {
        return { ...obj, predicted_tacklepct: Math.round(obj.predicted_tacklepct)};
      });
      updatedArray = updatedArray1.map(obj => {
        return { ...obj, predicted_aerialpct: Math.round(obj.predicted_aerialpct)};
      });
      let tacklepct = 0;
      for (let i = 0; i < updatedArray.length; i++) {
        tacklepct += updatedArray[i].predicted_tacklepct;
      }
      let aerialpct = 0;
      for ( let i = 0;  i < updatedArray.length; i++){
        aerialpct += updatedArray[i].predicted_aerialpct
      }
      console.log("tackle_pct , aerial_pct",tacklepct,aerialpct)
      updatedTeamArray[3] = (updatedTeamArray[3]+tacklepct)/(updatedArray.length+1)
      updatedTeamArray[4] = (updatedTeamArray[4]+aerialpct)/(updatedArray.length+1)
    }
    else{
      updatedArray = result
    }
    
    console.log("Result is: ", updatedArray);
    console.log("lengh of ar",updatedArray.length)

    console.log("after updation",updatedTeamArray)

    
    const resultArray = result
    console.log("inas",resultArray)

    const menuChange = (e) => {
      //navigate(`/${item}`,{replace: false})
      console.log('click ', e);
      setCurrent(e.key);
      navigate(`/${e.key}`)
      
    };

    const handleSelectCLick = async(playerName) => {
      console.log("plaer bu tsin",playerName)
      try {
        console.log('Generating click...');
        const response = await fetch('/player', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            playerName,
            position
          }),
        });
        console.log('Click done');
        if (response.ok) {
          console.log('Response is okay');
          const data = await response.json();
          console.log(data.output); // Handle the output as needed
          const resultArray = Array.isArray(data.output) ? data.output : [data.output];
          
          setPlayerData(resultArray);
          console.log(resultArray)
  
          // Navigate to another page with the result
          navigate(`/playerprofile`, { state: { result: resultArray, pos: position, playerName: playerName  }});
  
        } else {
          console.log('Response is not okay');
          const error = await response.json();
          console.error(error.error);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }

    const columns = [
        {
          title: 'Player',
          dataIndex: 'player',
          //key:'player',
          render: (dataIndex) => <a value= {dataIndex} onClick={ () => handleSelectCLick(dataIndex)}>{dataIndex}</a>
          // specify the condition of filtering result
          // here is that finding the name started with `value`
         
        },
        {
          title: 'Team (Player)',
          dataIndex: 'team_player',
          
        },
        {
          title: 'Team (Team)',
          dataIndex: 'team_team',
          
        },
        {
          title: 'Predicted Goals',
          dataIndex: 'predicted_goals',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.predicted_goals - b.predicted_goals,
        },
        {
          title: 'Predicted Assists',
          dataIndex: 'predicted_assists',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.predicted_assists - b.predicted_assists,
        },
        {
          title: 'Cost',
          dataIndex: 'cost',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.cost - b.cost,
        }
        
      ];
    const columns_def = [
        {
          title: 'Player',
          dataIndex: 'player',
          render: (dataIndex) => <a value= {dataIndex} onClick={ () => handleSelectCLick(dataIndex)}>{dataIndex}</a>
          
          // specify the condition of filtering result
          // here is that finding the name started with `value`
         
        },
        {
          title: 'Team (Player)',
          dataIndex: 'team_player',
          
        },
        {
          title: 'Team (Team)',
          dataIndex: 'team_team',
          
        },
        {
          title: 'Predicted Aerial %',
          dataIndex: 'predicted_aerialpct',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.predicted_aerialpct - b.predicted_aerialpct,
        },
        {
          title: 'Predicted Tackle %',
          dataIndex: 'predicted_tacklepct',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.predicted_tacklepct - b.predicted_tacklepct,
        },
        {
          title: 'Cost',
          dataIndex: 'cost',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.cost - b.cost,
        }
        
      ];  
    const columns_mid = [
        {
          title: 'Player',
          dataIndex: 'player',
          render: (dataIndex) => <a value= {dataIndex} onClick={ () => handleSelectCLick(dataIndex)}>{dataIndex}</a>
          
          
          // specify the condition of filtering result
          // here is that finding the name started with `value`
         
        },
        {
          title: 'Team (Player)',
          dataIndex: 'team_player',
          
        },
        {
          title: 'Team (Team)',
          dataIndex: 'team_team',
          
        },
        {
          title: 'Predicted Assists',
          dataIndex: 'predicted_assists',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.predicted_assists - b.predicted_assists,
        },
        {
          title: 'Predicted Pass %',
          dataIndex: 'predicted_pass_pct',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.predicted_pass_pct - b.predicted_pass_pct,
        },
        {
          title: 'Cost',
          dataIndex: 'cost',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.cost - b.cost,
        }
        
      ]; 
    const columns_gk = [
        {
          title: 'Player',
          dataIndex: 'player',
          render: (dataIndex) => <a value= {dataIndex} onClick={ () => handleSelectCLick(dataIndex)}>{dataIndex}</a>
          
          
          // specify the condition of filtering result
          // here is that finding the name started with `value`
         
        },
        {
          title: 'Team (Player)',
          dataIndex: 'team_player',
          
        },
        {
          title: 'Team (Team)',
          dataIndex: 'team_team',
          
        },
        {
          title: 'Predicted Save Percentage',
          dataIndex: 'predicted_savepct',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.predicted_assists - b.predicted_assists,
        },
        
        {
          title: 'Cost',
          dataIndex: 'cost',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.cost - b.cost,
        }
        
      ];    
      const data = updatedArray

      let tble;
      const handleSubmit = () =>{
        console.log("hiiiiiii", teamArray)
        navigate(`/resultchart`, { state: { teamArray: teamArray, updatedTeamArray: updatedTeamArray  }});

      }

      if(position == 'att'){
        tble =
        <div>
          <Table 
        style={{
          padding: '88px 40px',
          
        }}
        columns={columns} dataSource={data} 
        pagination={{
          pageSize: 3,
        }}
        
         />

<div style={{
          offset: 6,
          span: 16,
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          margin:0
        }}>
          <Button type="primary" htmlType="submit" onClick={handleSubmit}  >
          Visualize Performance Improvement
        </Button>
        </div>
         

        </div> 
        
         
      } else if (position == 'mid') {
        tble = tble = 
        <div>
          <Table 
        style={{
          padding: '88px 40px',
          
        }}
        columns={columns_mid} dataSource={data} 
        pagination={{
          pageSize: 3,
        }}
        
         />
         <div style={{
          offset: 6,
          span: 16,
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          margin:0
        }}>
          <Button type="primary" htmlType="submit" onClick={handleSubmit}  >
          Visualize Performance Improvement
        </Button>
        </div>

        </div>
      } else if (position == 'def') {
        tble = tble = 
        <div>
          <Table 
        style={{
          padding: '88px 40px',
          
        }}
        columns={columns_def} dataSource={data} 
        pagination={{
          pageSize: 3,
        }}
        
         />
         <div style={{
          offset: 6,
          span: 16,
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          margin:0
        }}>
          <Button type="primary" htmlType="submit" onClick={handleSubmit}  >
          See Comparison from before
        </Button>
        </div>

        </div>
        
         
      }else{
        tble = tble = 
        <div>
          <Table 
        style={{
          padding: '88px 40px',
          
        }}
        columns={columns_gk} dataSource={data} 
        pagination={{
          pageSize: 3,
        }}
        
         />
         

        </div>
      }

      

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
      <div>
      {tble}

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

export default Result;