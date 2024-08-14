import React, {useState}from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { teamName } from "../Content/TeamList";
import { playerPosition } from "../Content/PlayerPosition";
import {Layout, Menu, theme } from 'antd';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
} from 'antd';


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

const onTeamSearch = (value) => {
  console.log('search:', value);
};

const onPositionSearch = (value) => {
    console.log('search:', value);
  };

const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

// Filter `option.label` match the user type `input`
const filterOption = (input,teamName) =>
teamName.map(option => option.toLowerCase().includes(input.toLowerCase()))


function Tool(){


  const [budget, setBudget] = useState('');
  const [noofplayers, setNoOfPlayers] = useState('');
  //const [team, setTeam] = useState('');
  const [position, setPosition] = useState('');
  const [optionsTeam, setOptionsTeam] = useState(teamName);
  const [optionsPosition, setOptionsPosition] = useState(playerPosition);
  const [result, setResult] = useState('');
  const [current, setCurrent] = useState('tool');


  const navigate = useNavigate()
  const location = useLocation();
  const team = location.state?.team || '';
  const teamArray = location.state?.teamArray || [];
  console.log("team from chart",team)


 /* const filteredOptionsTeam = optionsTeam.filter(option =>
    option.toLowerCase().includes(team.toLowerCase())
  );*/
  const filteredOptionsPosition = optionsPosition.filter(option =>
    option.position.toLowerCase().includes(position.toLowerCase())
  );

  // Event handler for budget input change
  const handleBudgetInputChange = (event) => {
    setBudget(event.target.value);
  };
  // Event handler for no of players input change
  const handleNoOfPlayersInputChange = (event) => {
    setNoOfPlayers(event.target.value);
  };

  // Event handler for position change
  const handlePositionChange = (event) => {
    setPosition(event);
  };
  // Event handler for team change
  /*const handleTeamChange = (event) => {
    setTeam(team1);
  };*/

  

  const menuChange = (e) => {
    //navigate(`/${item}`,{replace: false})
    console.log('click ', e);
    setCurrent(e.key);
    navigate(`/${e.key}`)
    
  };
  // Event handler for form submission
  const handleSubmit = async() => {
    //event.preventDefault();
    // Here, you can use the stored input values as needed, such as sending them to an API
    console.log('Budget:', budget);
    console.log('No of Players:', noofplayers);
    console.log('Team:', team);
    console.log('Position:', position);
    try {
        console.log('Generating click...');
        const response = await fetch('/run', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            team,
            noofplayers,
            position,
            budget,
          }),
        });
        console.log('Click done');
        if (response.ok) {
          console.log('Response is okay');
          const data = await response.json();
          console.log(data.output); // Handle the output as needed
          const resultArray = Array.isArray(data.output) ? data.output : [data.output];
          
          setResult(resultArray);
  
          // Navigate to another page with the result
          navigate(`/result`, { state: { result: resultArray, pos: position, teamArray: teamArray  }});
  
        } else {
          console.log('Response is not okay');
          const error = await response.json();
          console.error(error.error);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }

  };

  

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
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
      <Content
        style={{
          padding: '115px 40px',
          
          
        }}
      
      >
        
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Form
    {...formItemLayout}
    variant="filled"
    style={{
      
      
    }}
    onFinish={handleSubmit}
  >
    <Form.Item
      label="Enter your Budget"
      name="Input"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <Input 
      type="text"
      value={budget}
      onChange={handleBudgetInputChange}
      placeholder="Enter Your Budget"
      
      />
    </Form.Item>

    <Form.Item
      label="No of Players Required"
      name="Input1"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <Input 
      type="text"
      value={noofplayers}
      onChange={handleNoOfPlayersInputChange}
      placeholder="Enter No of Players"
      
      />
    </Form.Item>

    {/*<Form.Item
      label="No of Players Required"
      name="InputNumber"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
     <InputNumber
        style={{
          width: '100%',
        }}
          value={noofplayers}
          onChange={handleNoOfPlayersInputChange}
          placeholder="Enter No of Players"
    />
      
    </Form.Item>*/}



    {/*<Form.Item
      label="Choose your team"
      
      name="Select"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <Select
    showSearch
    placeholder="Choose your team"
    optionFilterProp="children"
    onSearch={onTeamSearch}
    filterOption={filteredOptionsTeam}
    value={team} 
    onChange={handleTeamChange}
    >
        {filteredOptionsTeam.map((teamName, index) => (
              <Select.Option key={index} value={teamName}>{teamName}</Select.Option>
            ))}
    </Select>
        </Form.Item>*/}

    <Form.Item
      label="Choose player position"
      name="Select1"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <Select
    showSearch
    placeholder="Select Player Position"
    optionFilterProp="children"
    onSearch={onPositionSearch}
    filterOption={filteredOptionsPosition}
    value={position} 
    onChange={handlePositionChange}
    >
        {filteredOptionsPosition.map((playerPosition, index) => (
              <Select.Option key={index} value={playerPosition.value}>{playerPosition.position}</Select.Option>
            ))}
    </Select>
    
    </Form.Item>

    


    <Form.Item
      wrapperCol={{
        offset: 6,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit" >
        Submit
      </Button>
    </Form.Item>
  </Form>
          
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
  );
}

export default Tool;